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
  status: KitchenStatus
  placedAt: number
  items: ActiveOrderItem[]
}

const ACTIVE_KEY = 'solace-active-order-v1'

export function useActiveOrder() {
  const active = useState<ActiveOrder | null>('solace-active-order', () => null)
  const hydrated = useState('solace-active-order-hydrated', () => false)
  const timerId = useState<number | null>('solace-kitchen-timer', () => null)

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
      active.value = JSON.parse(raw) as ActiveOrder
    }
    catch {
      active.value = null
    }
  }

  if (import.meta.client) {
    hydrate()
  }

  function stopKitchen() {
    if (import.meta.client && timerId.value !== null) {
      window.clearInterval(timerId.value)
      timerId.value = null
    }
  }

  function advanceStatus() {
    if (!active.value || active.value.status === 'ready') {
      stopKitchen()
      return
    }
    if (active.value.status === 'received') {
      active.value = { ...active.value, status: 'preparing' }
    }
    else if (active.value.status === 'preparing') {
      active.value = { ...active.value, status: 'ready' }
      stopKitchen()
    }
    persist()
  }

  function watchKitchen() {
    if (!import.meta.client || !active.value || active.value.status === 'ready') {
      return
    }
    stopKitchen()
    timerId.value = window.setInterval(() => {
      advanceStatus()
    }, 8000)
  }

  function start(order: ActiveOrder) {
    stopKitchen()
    active.value = order
    persist()
    watchKitchen()
  }

  function clear() {
    stopKitchen()
    active.value = null
    persist()
  }

  return {
    active,
    start,
    clear,
    advanceStatus,
    watchKitchen,
  }
}
