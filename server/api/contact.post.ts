import type { ContactPayload } from '~/types/cafe'

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export default defineEventHandler(async (event) => {
  const body = await readBody<Partial<ContactPayload>>(event)
  const config = useRuntimeConfig()

  const name = body.name?.trim() ?? ''
  const email = body.email?.trim() ?? ''
  const message = body.message?.trim() ?? ''

  const errors: string[] = []

  if (name.length < 2) {
    errors.push('Please enter your name.')
  }
  if (!isEmail(email)) {
    errors.push('Please enter a valid email address.')
  }
  if (message.length < 10) {
    errors.push('Please write a slightly longer message.')
  }
  if (message.length > 2000) {
    errors.push('Message is too long (max 2000 characters).')
  }

  if (errors.length) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Validation failed',
      data: { errors },
    })
  }

  const text = [
    `New message from ${name}`,
    `Email: ${email}`,
    '',
    message,
  ].join('\n')

  const result = await sendCafeEmail({
    to: config.contactInbox,
    from: config.mailFrom,
    replyTo: email,
    subject: `[Solace] Message from ${name}`,
    text,
  })

  return {
    ok: true,
    demo: result.demo,
    message: result.demo
      ? 'Thanks — message saved in demo mode (add RESEND_API_KEY for real email).'
      : 'Thanks — we received your note and will reply soon.',
  }
})
