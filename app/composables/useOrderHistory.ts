import type { ActiveOrder } from '~/composables/useActiveOrder'

export type OrderHistoryEntry = ActiveOrder & {
  archivedAt: number
}

const HISTORY_KEY = 'solace-order-history-v1'
const HISTORY_LIMIT = 12

export function useOrderHistory() {
  const entries = useState<OrderHistoryEntry[]>('solace-order-history', () => [])
  const hydrated = useState('solace-order-history-hydrated', () => false)

  function persist() {
    if (!import.meta.client) {
      return
    }
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(entries.value))
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
      const raw = localStorage.getItem(HISTORY_KEY)
      if (!raw) {
        return
      }
      const parsed = JSON.parse(raw) as unknown
      if (!Array.isArray(parsed)) {
        return
      }
      entries.value = parsed.filter(
        (entry): entry is OrderHistoryEntry =>
          !!entry
          && typeof entry === 'object'
          && typeof (entry as OrderHistoryEntry).orderId === 'string'
          && typeof (entry as OrderHistoryEntry).archivedAt === 'number',
      )
    }
    catch {
      entries.value = []
    }
  }

  if (import.meta.client) {
    hydrate()
  }

  function archive(order: ActiveOrder) {
    const next: OrderHistoryEntry = {
      ...order,
      archivedAt: Date.now(),
    }
    entries.value = [
      next,
      ...entries.value.filter(entry => entry.orderId !== order.orderId),
    ].slice(0, HISTORY_LIMIT)
    persist()
  }

  function clearHistory() {
    entries.value = []
    persist()
  }

  return {
    entries,
    archive,
    clearHistory,
  }
}
