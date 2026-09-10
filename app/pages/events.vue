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
const interested = useState<string[]>('solace-event-interest', () => [])

function markInterest(eventId: string, title: string) {
  if (!interested.value.includes(eventId)) {
    interested.value = [...interested.value, eventId]
  }
  toast.success(t('eventsPage.interestSent', { title }))
}

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
          class="flex flex-col border border-ink/10 p-6"
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
          <p class="mb-6 grow text-sm leading-relaxed text-mute">
            {{ tx(event.description) }}
          </p>
          <BaseButton
            type="button"
            :variant="interested.includes(event.id) ? 'primary' : 'ink'"
            :disabled="interested.includes(event.id)"
            @click="markInterest(event.id, tx(event.title))"
          >
            {{ interested.includes(event.id) ? t('eventsPage.interestDone') : t('eventsPage.interest') }}
          </BaseButton>
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
          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">{{ t('eventsPage.name') }}</span>
            <input
              v-model="inquiry.name"
              required
              type="text"
              autocomplete="name"
              class="rounded-sm border border-ink/15 bg-foam px-3 py-3 text-sm outline-none focus:border-leaf"
            >
          </label>
          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">{{ t('eventsPage.email') }}</span>
            <input
              v-model="inquiry.email"
              required
              type="email"
              autocomplete="email"
              class="rounded-sm border border-ink/15 bg-foam px-3 py-3 text-sm outline-none focus:border-leaf"
            >
          </label>
          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">{{ t('eventsPage.details') }}</span>
            <textarea
              v-model="inquiry.message"
              required
              rows="5"
              class="rounded-sm border border-ink/15 bg-foam px-3 py-3 text-sm outline-none focus:border-leaf"
            />
          </label>
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
