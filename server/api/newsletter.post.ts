function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export default defineEventHandler(async (event) => {
  const body = await readBody<{ email?: string }>(event)
  const config = useRuntimeConfig()
  const email = body.email?.trim().toLowerCase() ?? ''

  if (!isEmail(email)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Validation failed',
      data: { errors: ['Please enter a valid email address.'] },
    })
  }

  // Demo store: log subscription. Swap for a mailing list provider later.
  console.info('[newsletter]', {
    email,
    inbox: config.contactInbox,
    receivedAt: new Date().toISOString(),
  })

  await sendCafeEmail({
    to: config.contactInbox,
    from: config.mailFrom,
    subject: `[Solace] Newsletter signup: ${email}`,
    text: `New newsletter signup\nEmail: ${email}`,
  }).catch(() => {
    // Keep signup successful even if mail transport is unavailable in demo.
  })

  return {
    ok: true,
    message: 'You’re on the list — thanks for joining Solace notes.',
  }
})
