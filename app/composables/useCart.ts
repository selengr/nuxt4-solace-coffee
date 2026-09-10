import type { MenuItem } from '~/types/cafe'

export interface CartLine {
  id: string
  name: string
  price: string
  qty: number
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
  const lines = useState<CartLine[]>('solace-cart', () => [])
  const hydrated = useState('solace-cart-hydrated', () => false)
  const watching = useState('solace-cart-watching', () => false)

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
    if (!watching.value) {
      watching.value = true
      watch(lines, persist, { deep: true })
    }
  }

  function addItem(item: MenuItem, displayName?: string) {
    const { tx } = useLocaleText()
    const name = displayName || tx(item.name)
    const existing = lines.value.find(line => line.id === item.id)
    if (existing) {
      existing.qty += 1
      existing.name = name
      return
    }
    lines.value.push({
      id: item.id,
      name,
      price: item.price,
      qty: 1,
    })
  }

  function setQty(id: string, qty: number) {
    const line = lines.value.find(entry => entry.id === id)
    if (!line) {
      return
    }
    if (qty <= 0) {
      lines.value = lines.value.filter(entry => entry.id !== id)
      return
    }
    line.qty = qty
  }

  function clear() {
    lines.value = []
  }

  return {
    lines,
    count,
    subtotal,
    subtotalLabel,
    addItem,
    setQty,
    clear,
  }
}
