export interface OrderItemPayload {
  id: string
  name: string
  price: string
  qty: number
}

export interface OrderPayload {
  customerName: string
  customerEmail: string
  phone?: string
  notes?: string
  items: OrderItemPayload[]
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export default defineEventHandler(async (event) => {
  const body = await readBody<Partial<OrderPayload>>(event)
  const config = useRuntimeConfig()

  const customerName = body.customerName?.trim() ?? ''
  const customerEmail = body.customerEmail?.trim() ?? ''
  const phone = body.phone?.trim() ?? ''
  const notes = body.notes?.trim() ?? ''
  const items = Array.isArray(body.items) ? body.items : []

  const errors: string[] = []

  if (customerName.length < 2) {
    errors.push('form.errors.name')
  }
  if (!isEmail(customerEmail)) {
    errors.push('form.errors.email')
  }
  if (!items.length) {
    errors.push('form.errors.emptyOrder')
  }
  if (items.some(item => !item.id || !item.qty || item.qty < 1)) {
    errors.push('form.errors.invalidItems')
  }

  if (errors.length) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Validation failed',
      data: { errors },
    })
  }

  const orderId = `SLC-${Date.now().toString(36).toUpperCase()}`
  const lines = items.map(
    item => `• ${item.qty}× ${item.name} (${item.price})`,
  )

  const text = [
    `Pickup order ${orderId}`,
    `Customer: ${customerName}`,
    `Email: ${customerEmail}`,
    phone ? `Phone: ${phone}` : null,
    notes ? `Notes: ${notes}` : null,
    '',
    'Items:',
    ...lines,
  ]
    .filter(Boolean)
    .join('\n')

  const result = await sendCafeEmail({
    to: config.contactInbox,
    from: config.mailFrom,
    replyTo: customerEmail,
    subject: `[Solace] Pickup order ${orderId}`,
    text,
  })

  return {
    ok: true,
    orderId,
    demo: result.demo,
    messageKey: result.demo ? 'orderApi.successDemo' : 'orderApi.success',
  }
})
