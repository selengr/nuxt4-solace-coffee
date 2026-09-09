import { Resend } from 'resend'

export async function sendCafeEmail(options: {
  to: string
  from: string
  subject: string
  replyTo?: string
  text: string
  html?: string
}) {
  const config = useRuntimeConfig()
  const apiKey = config.resendApiKey as string

  if (!apiKey) {
    console.info('[mail:demo]', options)
    return { id: 'demo-mode', demo: true as const }
  }

  const resend = new Resend(apiKey)
  const result = await resend.emails.send({
    from: options.from,
    to: options.to,
    subject: options.subject,
    replyTo: options.replyTo,
    text: options.text,
    html: options.html ?? `<pre>${options.text}</pre>`,
  })

  if (result.error) {
    throw createError({
      statusCode: 502,
      statusMessage: 'Email provider error',
      data: { message: result.error.message },
    })
  }

  return { id: result.data?.id ?? 'sent', demo: false as const }
}
