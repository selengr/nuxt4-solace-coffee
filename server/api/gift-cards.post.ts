function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    amount?: number
    recipientEmail?: string
    note?: string
    buyerEmail?: string
    buyerName?: string
  }>(event)
  const config = useRuntimeConfig()

  const amount = Number(body.amount) || 0
  const recipientEmail = body.recipientEmail?.trim() ?? ''
  const note = body.note?.trim() ?? ''
  const buyerEmail = body.buyerEmail?.trim() ?? ''
  const buyerName = body.buyerName?.trim() || 'Guest'

  const errors: string[] = []

  if (amount < 10 || amount > 500) {
    errors.push('giftCardsPage.minError')
  }
  if (buyerEmail && !isEmail(buyerEmail)) {
    errors.push('form.errors.email')
  }
  if (recipientEmail && !isEmail(recipientEmail)) {
    errors.push('giftCardsPage.recipientInvalid')
  }

  if (errors.length) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Validation failed',
      data: { errors },
    })
  }

  const text = [
    `Gift card inquiry`,
    `Amount: $${amount.toFixed(2)}`,
    `From: ${buyerName}${buyerEmail ? ` <${buyerEmail}>` : ''}`,
    recipientEmail ? `Recipient: ${recipientEmail}` : 'Recipient: (in person / undecided)',
    note ? `Note: ${note}` : null,
    '',
    'No payment collected — staff follow-up.',
  ]
    .filter(Boolean)
    .join('\n')

  const result = await sendCafeEmail({
    to: config.contactInbox,
    from: config.mailFrom,
    replyTo: buyerEmail || undefined,
    subject: `[Solace] Gift card inquiry · $${amount}`,
    text,
  })

  return {
    ok: true,
    demo: result.demo,
    messageKey: result.demo ? 'giftCardsPage.successDemo' : 'giftCardsPage.success',
  }
})
