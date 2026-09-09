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

  // Demo inbox log — swap for Resend, Nodemailer, or a CRM webhook.
  console.info('[contact]', {
    to: config.contactInbox,
    name,
    email,
    message,
    receivedAt: new Date().toISOString(),
  })

  return {
    ok: true,
    message: 'Thanks — we received your note and will reply soon.',
  }
})
