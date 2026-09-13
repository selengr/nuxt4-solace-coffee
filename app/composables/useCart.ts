import type { MenuItem } from '~/types/cafe'

export interface CartLine {
  id: string
  name: string
  price: string
  qty: number
  note?: string
}

const CART_KEY = 'solace-cart-v1'

function priceToNumber(price: string) {
  return Number(price.replace(/[^0-9.]/g, '')) || 0
}

function isCartLine(value: unknown): value is CartLine {
  if (!value || typeof value !== 'object') {
    return false
  }
  const line = value as CartLine
  return (
    typeof line.id === 'string'
    && typeof line.name === 'string'
    && typeof line.price === 'string'
    && typeof line.qty === 'number'
    && line.qty > 0
  )
}

export function useCart() {
  const { tx } = useLocaleText()
  const lines = useState<CartLine[]>('solace-cart', () => [])
  // Distinct defaults avoid Nuxt payload dedupe linking these flags together.
  const hydrated = useState('solace-cart-hydrated', () => false)
  const watching = useState<'off' | 'on'>('solace-cart-watching', () => 'off')

  const count = computed(() =>
    lines.value.reduce((sum, line) => sum + line.qty, 0),
  )

  const subtotal = computed(() =>
    lines.value.reduce(
      (sum, line) => sum + priceToNumber(line.price) * line.qty,
      0,
    ),
  )

  const subtotalLabel = computed(() => `$${subtotal.value.toFixed(2)}`)

  const qtyMap = computed(() => {
    const map: Record<string, number> = {}
    for (const line of lines.value) {
      map[line.id] = line.qty
    }
    return map
  })

  function persist() {
    if (!import.meta.client) {
      return
    }
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(lines.value))
    }
    catch {
      // Private mode / quota — keep in-memory cart only.
    }
  }

  function hydrate() {
    if (!import.meta.client || hydrated.value) {
      return
    }
    hydrated.value = true
    try {
      const raw = localStorage.getItem(CART_KEY)
      if (!raw) {
        return
      }
      const parsed = JSON.parse(raw) as unknown
      if (Array.isArray(parsed)) {
        lines.value = parsed.filter(isCartLine)
      }
    }
    catch {
      lines.value = []
    }
  }

  if (import.meta.client) {
    hydrate()
    if (watching.value === 'off') {
      watching.value = 'on'
      watch(lines, persist, { deep: true })
    }
  }

  function addItem(
    item: MenuItem,
    displayName?: string,
    options?: { qty?: number, note?: string },
  ) {
    const name = displayName || tx(item.name)
    const qty = Math.max(1, options?.qty ?? 1)
    const note = options?.note?.trim() || undefined
    const index = lines.value.findIndex(line => line.id === item.id)

    if (index >= 0) {
      const current = lines.value[index]!
      const next = [...lines.value]
      next[index] = {
        ...current,
        name,
        qty: current.qty + qty,
        note: note ?? current.note,
      }
      lines.value = next
      return
    }

    lines.value = [
      ...lines.value,
      {
        id: item.id,
        name,
        price: item.price,
        qty,
        note,
      },
    ]
  }

  function setQty(id: string, qty: number) {
    if (qty <= 0) {
      lines.value = lines.value.filter(entry => entry.id !== id)
      return
    }
    lines.value = lines.value.map(entry =>
      entry.id === id ? { ...entry, qty } : entry,
    )
  }

  function setNote(id: string, note: string) {
    const next = note.trim()
    lines.value = lines.value.map((entry) => {
      if (entry.id !== id) {
        return entry
      }
      if (next) {
        return { ...entry, note: next }
      }
      const { note: _removed, ...rest } = entry
      return rest
    })
  }

  function removeItem(id: string) {
    setQty(id, 0)
  }

  function qtyOf(id: string) {
    return qtyMap.value[id] ?? 0
  }

  function lineTotalLabel(line: CartLine) {
    return `$${(priceToNumber(line.price) * line.qty).toFixed(2)}`
  }

  function clear() {
    lines.value = []
  }

  return {
    lines,
    count,
    subtotal,
    subtotalLabel,
    qtyMap,
    addItem,
    setQty,
    setNote,
    removeItem,
    qtyOf,
    lineTotalLabel,
    clear,
  }
}
