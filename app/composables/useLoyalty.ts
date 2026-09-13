const LOYALTY_KEY = 'solace-loyalty-v1'
export const STAMPS_NEEDED = 8

export function useLoyalty() {
  const stamps = useState<number>('solace-loyalty-stamps', () => 0)
  const hydrated = useState('solace-loyalty-hydrated', () => false)

  function persist() {
    if (!import.meta.client) {
      return
    }
    try {
      localStorage.setItem(LOYALTY_KEY, JSON.stringify({ stamps: stamps.value }))
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
      const raw = localStorage.getItem(LOYALTY_KEY)
      if (!raw) {
        return
      }
      const parsed = JSON.parse(raw) as { stamps?: number }
      if (typeof parsed.stamps === 'number' && parsed.stamps >= 0) {
        stamps.value = Math.min(STAMPS_NEEDED, Math.floor(parsed.stamps))
      }
    }
    catch {
      // ignore
    }
  }

  if (import.meta.client) {
    hydrate()
  }

  const isFull = computed(() => stamps.value >= STAMPS_NEEDED)

  const slots = computed(() =>
    Array.from({ length: STAMPS_NEEDED }, (_, i) => i < stamps.value),
  )

  function addStamp() {
    if (stamps.value >= STAMPS_NEEDED) {
      return { added: false, full: true as const }
    }
    stamps.value += 1
    persist()
    return {
      added: true as const,
      full: stamps.value >= STAMPS_NEEDED,
    }
  }

  function redeem() {
    if (stamps.value < STAMPS_NEEDED) {
      return false
    }
    stamps.value = 0
    persist()
    return true
  }

  function reset() {
    stamps.value = 0
    persist()
  }

  return {
    stamps,
    slots,
    isFull,
    stampsNeeded: STAMPS_NEEDED,
    addStamp,
    redeem,
    reset,
  }
}
