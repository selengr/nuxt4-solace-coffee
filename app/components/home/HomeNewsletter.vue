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
    class="section-space pt-0"
  >
    <div
      class="container-site"
      :class="{ 'is-visible': visible }"
    >
      <div class="reveal-block relative overflow-hidden bg-roast px-[clamp(1.75rem,5vw,3.5rem)] py-[clamp(2.25rem,6vw,3.75rem)] text-foam md:grid md:grid-cols-[1.2fr_1fr] md:items-end md:gap-10">
        <div
          class="pointer-events-none absolute -end-10 -top-16 h-56 w-56 rounded-full bg-brass/20 blur-3xl"
          aria-hidden="true"
        />
        <div class="relative">
          <p class="eyebrow !text-brass">
            {{ t('newsletter.eyebrow') }}
          </p>
          <h2 class="mb-3 text-[clamp(1.9rem,4vw,2.8rem)] leading-[1.05] tracking-tight">
            {{ t('newsletter.title') }}
          </h2>
          <p class="max-w-md leading-relaxed text-foam/70">
            {{ t('newsletter.lede') }}
          </p>
        </div>

        <form
          class="relative mt-8 flex flex-col gap-3 sm:flex-row md:mt-0"
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
            class="w-full rounded-sm border border-foam/20 bg-ink/40 px-3 py-3.5 text-sm text-foam outline-none transition placeholder:text-foam/40 focus:border-brass"
          >
          <BaseButton
            type="submit"
            variant="light"
            :disabled="status === 'loading'"
          >
            {{ status === 'loading' ? t('newsletter.sending') : t('newsletter.cta') }}
          </BaseButton>
        </form>
      </div>
    </div>
  </section>
</template>
