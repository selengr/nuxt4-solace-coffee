<script setup lang="ts">
const { t } = useI18n()
const toast = useToast()

const email = ref('')
const status = ref<'idle' | 'loading'>('idle')

async function subscribe() {
  status.value = 'loading'
  try {
    const result = await $fetch<{ message: string }>('/api/newsletter', {
      method: 'POST',
      body: { email: email.value },
    })
    toast.success(result.message)
    email.value = ''
  }
  catch (error: unknown) {
    const err = error as { data?: { data?: { errors?: string[] }, errors?: string[] } }
    const errors = err.data?.data?.errors ?? err.data?.errors ?? []
    toast.error(errors[0] || 'Could not subscribe. Try again.')
  }
  finally {
    status.value = 'idle'
  }
}
</script>

<template>
  <section class="section-space">
    <div class="container-site grid gap-8 rounded-md border border-ink/10 bg-mist p-[clamp(2rem,5vw,3.5rem)] md:grid-cols-[1.2fr_1fr] md:items-end">
      <div>
        <p class="eyebrow">
          {{ t('newsletter.eyebrow') }}
        </p>
        <h2 class="mb-3 text-[clamp(1.8rem,4vw,2.5rem)]">
          {{ t('newsletter.title') }}
        </h2>
        <p class="max-w-md text-mute">
          {{ t('newsletter.lede') }}
        </p>
      </div>

      <form
        class="flex flex-col gap-3 sm:flex-row"
        @submit.prevent="subscribe"
      >
        <label class="sr-only" for="newsletter-email">
          {{ t('newsletter.email') }}
        </label>
        <input
          id="newsletter-email"
          v-model="email"
          required
          type="email"
          autocomplete="email"
          :placeholder="t('newsletter.placeholder')"
          class="w-full rounded-sm border border-ink/15 bg-foam px-3 py-3 text-sm outline-none focus:border-leaf"
        >
        <BaseButton
          type="submit"
          variant="ink"
          :disabled="status === 'loading'"
        >
          {{ status === 'loading' ? t('newsletter.sending') : t('newsletter.cta') }}
        </BaseButton>
      </form>
    </div>
  </section>
</template>
