<script setup lang="ts">
const { info, events } = useCafe()
const { t } = useI18n()
const { tx } = useLocaleText()
const localePath = useLocalePath()
const toast = useToast()
const route = useRoute()

useSeoMeta({
  title: () => `${t('eventsPage.eyebrow')} — ${info.name}`,
  description: () => t('eventsPage.lede'),
})

const inquiry = reactive({
  name: '',
  email: '',
  date: '',
  guests: '',
  packageInterest: '',
  message: '',
})

const status = ref<'idle' | 'loading'>('idle')
const interested = useState<string[]>('solace-event-interest', () => [])

const packages = computed(() => [
  { title: t('eventsPage.package1Title'), body: t('eventsPage.package1Body') },
  { title: t('eventsPage.package2Title'), body: t('eventsPage.package2Body') },
  { title: t('eventsPage.package3Title'), body: t('eventsPage.package3Body') },
])

const includes = computed(() => [
  t('eventsPage.include1'),
  t('eventsPage.include2'),
  t('eventsPage.include3'),
])

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
        message: [
          '[Private hire inquiry]',
          `Date: ${inquiry.date || 'n/a'}`,
          `Guests: ${inquiry.guests || 'n/a'}`,
          `Package: ${inquiry.packageInterest || 'n/a'}`,
          '',
          inquiry.message,
        ].join('\n'),
      },
    })
    toast.success(t('eventsPage.success'))
    inquiry.name = ''
    inquiry.email = ''
    inquiry.date = ''
    inquiry.guests = ''
    inquiry.packageInterest = ''
    inquiry.message = ''
  }
  catch {
    toast.error(t('error.generic'))
  }
  finally {
    status.value = 'idle'
  }
}

onMounted(() => {
  if (route.hash === '#hire' && import.meta.client) {
    document.getElementById('hire')?.scrollIntoView({ behavior: 'smooth' })
  }
})
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

      <section
        id="hire"
        class="mb-12 scroll-mt-28"
      >
        <p class="eyebrow">
          {{ t('eventsPage.hireEyebrow') }}
        </p>
        <h2 class="mb-3 max-w-[18ch] text-[clamp(1.9rem,4vw,2.6rem)] leading-[1.05] tracking-tight">
          {{ t('eventsPage.hireTitle') }}
        </h2>
        <p class="mb-8 max-w-2xl leading-relaxed text-mute">
          {{ t('eventsPage.hireLede') }}
        </p>

        <div class="mb-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div class="border-t border-ink/10 pt-4">
            <p class="mb-1 text-[0.7rem] text-leaf label-meta">
              {{ t('eventsPage.capacity') }}
            </p>
            <p class="font-medium">
              {{ t('eventsPage.capacityValue') }}
            </p>
          </div>
          <div class="border-t border-ink/10 pt-4">
            <p class="mb-1 text-[0.7rem] text-leaf label-meta">
              {{ t('eventsPage.duration') }}
            </p>
            <p class="font-medium">
              {{ t('eventsPage.durationValue') }}
            </p>
          </div>
          <div class="border-t border-ink/10 pt-4 sm:col-span-2">
            <p class="mb-2 text-[0.7rem] text-leaf label-meta">
              {{ t('eventsPage.includeTitle') }}
            </p>
            <ul class="m-0 list-none space-y-1 p-0 text-sm text-mute">
              <li
                v-for="line in includes"
                :key="line"
              >
                {{ line }}
              </li>
            </ul>
          </div>
        </div>

        <h3 class="mb-4 text-xl tracking-tight">
          {{ t('eventsPage.packagesTitle') }}
        </h3>
        <ul class="mb-12 grid list-none gap-4 p-0 md:grid-cols-3">
          <li
            v-for="item in packages"
            :key="item.title"
            class="border border-ink/10 p-5"
          >
            <p class="mb-2 font-display text-lg tracking-tight">
              {{ item.title }}
            </p>
            <p class="text-sm leading-relaxed text-mute">
              {{ item.body }}
            </p>
          </li>
        </ul>
      </section>

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
          <div class="grid gap-3 sm:grid-cols-2">
            <label class="grid gap-1.5 text-sm">
              <span class="font-medium">{{ t('eventsPage.date') }}</span>
              <input
                v-model="inquiry.date"
                type="date"
                class="rounded-sm border border-ink/15 bg-foam px-3 py-3 text-sm outline-none focus:border-leaf"
              >
            </label>
            <label class="grid gap-1.5 text-sm">
              <span class="font-medium">{{ t('eventsPage.guests') }}</span>
              <input
                v-model="inquiry.guests"
                type="number"
                min="1"
                max="40"
                class="rounded-sm border border-ink/15 bg-foam px-3 py-3 text-sm outline-none focus:border-leaf"
              >
            </label>
          </div>
          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">{{ t('eventsPage.package') }}</span>
            <input
              v-model="inquiry.packageInterest"
              type="text"
              :placeholder="t('eventsPage.packagePlaceholder')"
              class="rounded-sm border border-ink/15 bg-foam px-3 py-3 text-sm outline-none focus:border-leaf"
            >
          </label>
          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">{{ t('eventsPage.details') }}</span>
            <textarea
              v-model="inquiry.message"
              required
              rows="4"
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
