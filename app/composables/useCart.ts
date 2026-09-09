import type { MenuItem } from '~/types/cafe'

export interface CartLine {
  id: string
  name: string
  price: string
  qty: number
}

function priceToNumber(price: string) {
  return Number(price.replace(/[^0-9.]/g, '')) || 0
}

export function useCart() {
  const lines = useState<CartLine[]>('solace-cart', () => [])

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
