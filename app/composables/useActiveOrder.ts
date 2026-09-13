export type ServiceMode = 'table' | 'counter'
export type KitchenStatus = 'received' | 'preparing' | 'ready'

export interface ActiveOrderItem {
  name: string
  qty: number
  note?: string
}

export interface ActiveOrder {
  orderId: string
  mode: ServiceMode
  table?: string
  customerName: string
  etaLabel: string
  etaMaxMinutes: number
  status: KitchenStatus
  placedAt: number
  items: ActiveOrderItem[]
}

const ACTIVE_KEY = 'solace-active-order-v1'

export function useActiveOrder() {
  const { t } = useI18n()
  const toast = useToast()
  const active = useState<ActiveOrder | null>('solace-active-order', () => null)
  const hydrated = useState('solace-active-order-hydrated', () => false)
  const timerId = useState<number | null>('solace-kitchen-timer', () => null)
  const tick = useState('solace-order-tick', () => Date.now())
  const tickTimer = useState<number | null>('solace-order-tick-timer', () => null)

  function persist() {
    if (!import.meta.client) {
      return
    }
    try {
      if (active.value) {
        localStorage.setItem(ACTIVE_KEY, JSON.stringify(active.value))
      }
      else {
        localStorage.removeItem(ACTIVE_KEY)
      }
    }
    catch {
      // ignore
    }
  }

  function hydrate() {
    if (!import.meta.client || hydrated.value) {
      return
    }
    hydrated.value = true
    try {
      const raw = localStorage.getItem(ACTIVE_KEY)
      if (!raw) {
        return
      }
      const parsed = JSON.parse(raw) as ActiveOrder
      if (!parsed?.orderId || !parsed.status) {
        active.value = null
        return
      }
      active.value = {
        ...parsed,
        etaMaxMinutes: parsed.etaMaxMinutes || 14,
      }
    }
    catch {
      active.value = null
    }
  }

  function stopKitchen() {
    if (import.meta.client && timerId.value !== null) {
      window.clearInterval(timerId.value)
      timerId.value = null
    }
  }

  function stopTick() {
    if (import.meta.client && tickTimer.value !== null) {
      window.clearInterval(tickTimer.value)
      tickTimer.value = null
    }
  }

  function startTick() {
    if (!import.meta.client || tickTimer.value !== null) {
      return
    }
    tick.value = Date.now()
    tickTimer.value = window.setInterval(() => {
      tick.value = Date.now()
    }, 1000)
  }

  function statusLabel(status: KitchenStatus) {
    if (status === 'ready') {
      return t('order.statusReady')
    }
    if (status === 'preparing') {
      return t('order.statusPreparing')
    }
    return t('order.statusReceived')
  }

  function advanceStatus() {
    if (!active.value || active.value.status === 'ready') {
      stopKitchen()
      return
    }
    const prev = active.value.status
    if (prev === 'received') {
      active.value = { ...active.value, status: 'preparing' }
      toast.info(t('order.toastPreparing'))
    }
    else if (prev === 'preparing') {
      active.value = { ...active.value, status: 'ready' }
      toast.success(
        active.value.mode === 'table'
          ? t('order.toastReadyTable')
          : t('order.toastReadyCounter'),
      )
      stopKitchen()
    }
    persist()
  }

  function stepIntervalMs() {
    const max = active.value?.etaMaxMinutes ?? 14
    // Two kitchen advances across the ETA window (received → preparing → ready).
    return Math.max(5000, Math.round((max * 60_000) / 2.5))
  }

  function syncFromElapsed() {
    if (!active.value || active.value.status === 'ready') {
      return
    }
    const elapsed = Date.now() - active.value.placedAt
    const step = stepIntervalMs()
    if (elapsed >= step * 2) {
      if (active.value.status !== 'ready') {
        active.value = { ...active.value, status: 'ready' }
        persist()
      }
      stopKitchen()
      return
    }
    if (elapsed >= step && active.value.status === 'received') {
      active.value = { ...active.value, status: 'preparing' }
      persist()
    }
  }

  function watchKitchen() {
    if (!import.meta.client || !active.value) {
      return
    }
    startTick()
    syncFromElapsed()
    if (!active.value || active.value.status === 'ready') {
      stopKitchen()
      return
    }
    stopKitchen()
    timerId.value = window.setInterval(() => {
      advanceStatus()
    }, stepIntervalMs())
  }

  function start(order: ActiveOrder) {
    stopKitchen()
    active.value = order
    persist()
    watchKitchen()
  }

  function clear() {
    stopKitchen()
    stopTick()
    active.value = null
    persist()
  }

  if (import.meta.client) {
    hydrate()
    if (active.value) {
      watchKitchen()
    }
  }

  const elapsedSeconds = computed(() => {
    if (!active.value) {
      return 0
    }
    return Math.max(0, Math.floor((tick.value - active.value.placedAt) / 1000))
  })

  const elapsedLabel = computed(() => {
    const total = elapsedSeconds.value
    const minutes = Math.floor(total / 60)
    const seconds = total % 60
    return t('order.elapsed', {
      time: `${minutes}:${String(seconds).padStart(2, '0')}`,
    })
  })

  const remainingLabel = computed(() => {
    if (!active.value || active.value.status === 'ready') {
      return t('order.remainingReady')
    }
    const maxSec = (active.value.etaMaxMinutes || 14) * 60
    const left = Math.max(0, maxSec - elapsedSeconds.value)
    const minutes = Math.ceil(left / 60)
    return t('order.remainingApprox', { min: Math.max(1, minutes) })
  })

  const shortStatus = computed(() => {
    if (!active.value) {
      return ''
    }
    return statusLabel(active.value.status)
  })

  return {
    active,
    start,
    clear,
    advanceStatus,
    watchKitchen,
    elapsedLabel,
    remainingLabel,
    shortStatus,
    statusLabel,
  }
}
