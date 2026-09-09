<script setup lang="ts">
const { info, events } = useCafe()
const { t } = useI18n()
const { tx } = useLocaleText()
const localePath = useLocalePath()
const toast = useToast()

useSeoMeta({
  title: () => `${t('eventsPage.eyebrow')} — ${info.name}`,
  description: () => t('eventsPage.lede'),
})

const inquiry = reactive({
  name: '',
  email: '',
  message: '',
})

const status = ref<'idle' | 'loading'>('idle')

async function submitInquiry() {
  status.value = 'loading'
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: inquiry.name,
        email: inquiry.email,
        message: `[Events inquiry]\n${inquiry.message}`,
      },
    })
    toast.success(t('eventsPage.success'))
    inquiry.name = ''
    inquiry.email = ''
    inquiry.message = ''
  }
  catch {
    toast.error(t('error.generic'))
  }
  finally {
    status.value = 'idle'
  }
}
</script>

<template>
  <div class="section-space">
    <div class="container-site">
      <p class="eyebrow">
        {{ t('eventsPage.eyebrow') }}
      </p>
      <h1 class="mb-3 max-w-[16ch] text-[clamp(2.4rem,6vw,3.5rem)] leading-snug">
        {{ t('eventsPage.title') }}
      </h1>
      <p class="mb-12 max-w-xl leading-relaxed text-mute">
        {{ t('eventsPage.lede') }}
      </p>

      <ul class="mb-16 grid list-none gap-6 p-0 md:grid-cols-3">
        <li
          v-for="event in events"
          :key="event.id"
          class="border border-ink/10 p-6"
        >
          <p class="mb-3 text-[0.7rem] text-leaf label-meta">
            {{ t(`eventsPage.types.${event.type}`) }}
          </p>
          <h2 class="mb-2 text-xl leading-snug">
            {{ tx(event.title) }}
          </h2>
          <p class="mb-1 text-sm font-medium">
            {{ tx(event.date) }} · {{ event.time }}
          </p>
          <p class="text-sm leading-relaxed text-mute">
            {{ tx(event.description) }}
          </p>
        </li>
      </ul>

      <div class="grid gap-10 rounded-md bg-mist p-6 sm:p-8 lg:grid-cols-2">
        <div>
          <h2 class="mb-3 text-2xl leading-snug">
            {{ t('eventsPage.bookTitle') }}
          </h2>
          <p class="mb-4 leading-relaxed text-mute">
            {{ t('eventsPage.bookLede') }}
          </p>
          <BaseButton :to="localePath('/contact')">
            {{ t('eventsPage.contactLink') }}
          </BaseButton>
        </div>

        <form
          class="grid gap-3"
          @submit.prevent="submitInquiry"
        >
          <input
            v-model="inquiry.name"
            required
            type="text"
            :placeholder="t('eventsPage.name')"
            class="rounded-sm border border-ink/15 bg-foam px-3 py-3 text-sm outline-none focus:border-leaf"
          >
          <input
            v-model="inquiry.email"
            required
            type="email"
            :placeholder="t('eventsPage.email')"
            class="rounded-sm border border-ink/15 bg-foam px-3 py-3 text-sm outline-none focus:border-leaf"
          >
          <textarea
            v-model="inquiry.message"
            required
            rows="5"
            :placeholder="t('eventsPage.details')"
            class="rounded-sm border border-ink/15 bg-foam px-3 py-3 text-sm outline-none focus:border-leaf"
          />
          <BaseButton
            type="submit"
            variant="ink"
            :disabled="status === 'loading'"
          >
            {{ status === 'loading' ? t('eventsPage.sending') : t('eventsPage.send') }}
          </BaseButton>
        </form>
      </div>
    </div>
  </div>
</template>
