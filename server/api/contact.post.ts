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
    errors.push('form.errors.name')
  }
  if (!isEmail(email)) {
    errors.push('form.errors.email')
  }
  if (message.length < 10) {
    errors.push('form.errors.message')
  }
  if (message.length > 2000) {
    errors.push('form.errors.messageLong')
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
    messageKey: result.demo ? 'form.successDemo' : 'form.success',
  }
})
