<script setup lang="ts">
const { t, te } = useI18n()
const toast = useToast()
const { el, visible } = useReveal()

const email = ref('')
const status = ref<'idle' | 'loading'>('idle')

function translateKey(key: string) {
  return te(key) ? t(key) : key
}

async function subscribe() {
  status.value = 'loading'
  try {
    const result = await $fetch<{ messageKey: string }>('/api/newsletter', {
      method: 'POST',
      body: { email: email.value },
    })
    toast.success(t(result.messageKey))
    email.value = ''
  }
  catch (error: unknown) {
    const err = error as { data?: { data?: { errors?: string[] }, errors?: string[] } }
    const errors = err.data?.data?.errors ?? err.data?.errors ?? []
    toast.error(errors[0] ? translateKey(errors[0]) : t('newsletter.error'))
  }
  finally {
    status.value = 'idle'
  }
}
</script>

<template>
  <section
    ref="el"
    class="section-space"
  >
    <div
      class="container-site"
      :class="{ 'is-visible': visible }"
    >
      <div class="reveal-block grid gap-8 overflow-hidden border border-ink/10 bg-[linear-gradient(135deg,#f1efe9_0%,#faf8f4_48%,#e8e2d8_100%)] p-[clamp(2rem,6vw,4rem)] md:grid-cols-[1.15fr_1fr] md:items-end">
        <div>
          <p class="eyebrow">
            {{ t('newsletter.eyebrow') }}
          </p>
          <h2 class="mb-3 text-[clamp(1.9rem,4vw,2.8rem)] leading-[1.05] tracking-tight">
            {{ t('newsletter.title') }}
          </h2>
          <p class="max-w-md leading-relaxed text-mute">
            {{ t('newsletter.lede') }}
          </p>
        </div>

        <form
          class="flex flex-col gap-3 sm:flex-row"
          @submit.prevent="subscribe"
        >
          <label
            class="sr-only"
            for="newsletter-email"
          >
            {{ t('newsletter.email') }}
          </label>
          <input
            id="newsletter-email"
            v-model="email"
            required
            type="email"
            autocomplete="email"
            :placeholder="t('newsletter.placeholder')"
            class="w-full rounded-sm border border-ink/15 bg-foam/90 px-3 py-3.5 text-sm outline-none transition focus:border-leaf"
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
    </div>
  </section>
</template>
