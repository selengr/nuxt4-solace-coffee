<script setup lang="ts">
const { info } = useCafe()
const { t } = useI18n()
const localePath = useLocalePath()
const toast = useToast()

useSeoMeta({
  title: () => `${t('cateringPage.eyebrow')} — ${info.name}`,
  description: () => t('cateringPage.seoDescription'),
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

const packages = computed(() => [
  { title: t('cateringPage.pkg1Title'), body: t('cateringPage.pkg1Body') },
  { title: t('cateringPage.pkg2Title'), body: t('cateringPage.pkg2Body') },
  { title: t('cateringPage.pkg3Title'), body: t('cateringPage.pkg3Body') },
])

async function submitInquiry() {
  status.value = 'loading'
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: inquiry.name,
        email: inquiry.email,
        message: [
          '[Catering inquiry]',
          `Date: ${inquiry.date || 'n/a'}`,
          `Guests: ${inquiry.guests || 'n/a'}`,
          `Package: ${inquiry.packageInterest || 'n/a'}`,
          '',
          inquiry.message,
        ].join('\n'),
      },
    })
    toast.success(t('cateringPage.success'))
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
</script>

<template>
  <div class="section-space">
    <div class="container-site">
      <p class="eyebrow">
        {{ t('cateringPage.eyebrow') }}
      </p>
      <h1 class="mb-3 max-w-[16ch] text-[clamp(2.4rem,6vw,3.5rem)] leading-snug">
        {{ t('cateringPage.title') }}
      </h1>
      <p class="mb-12 max-w-xl leading-relaxed text-mute">
        {{ t('cateringPage.lede') }}
      </p>

      <h2 class="mb-6 text-2xl leading-snug">
        {{ t('cateringPage.packagesTitle') }}
      </h2>
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

      <div class="mb-12 grid gap-6 border-t border-ink/10 pt-8 sm:grid-cols-3">
        <div>
          <p class="mb-1 text-[0.7rem] text-leaf label-meta">
            {{ t('cateringPage.leadTime') }}
          </p>
          <p class="font-medium">
            {{ t('cateringPage.leadTimeValue') }}
          </p>
        </div>
        <div>
          <p class="mb-1 text-[0.7rem] text-leaf label-meta">
            {{ t('cateringPage.minGuests') }}
          </p>
          <p class="font-medium">
            {{ t('cateringPage.minGuestsValue') }}
          </p>
        </div>
        <div>
          <p class="mb-1 text-[0.7rem] text-leaf label-meta">
            {{ t('cateringPage.delivery') }}
          </p>
          <p class="font-medium">
            {{ t('cateringPage.deliveryValue') }}
          </p>
        </div>
      </div>

      <div class="grid gap-10 rounded-md bg-mist p-6 sm:p-8 lg:grid-cols-2">
        <div>
          <h2 class="mb-3 text-2xl leading-snug">
            {{ t('cateringPage.formTitle') }}
          </h2>
          <p class="mb-4 leading-relaxed text-mute">
            {{ t('cateringPage.formLede') }}
          </p>
          <BaseButton :to="localePath('/events')">
            {{ t('cateringPage.eventsLink') }}
          </BaseButton>
        </div>

        <form
          class="grid gap-3"
          @submit.prevent="submitInquiry"
        >
          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">{{ t('cateringPage.name') }}</span>
            <input
              v-model="inquiry.name"
              required
              type="text"
              autocomplete="name"
              class="rounded-sm border border-ink/15 bg-foam px-3 py-3 text-sm outline-none focus:border-leaf"
            >
          </label>
          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">{{ t('cateringPage.email') }}</span>
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
              <span class="font-medium">{{ t('cateringPage.date') }}</span>
              <input
                v-model="inquiry.date"
                type="date"
                class="rounded-sm border border-ink/15 bg-foam px-3 py-3 text-sm outline-none focus:border-leaf"
              >
            </label>
            <label class="grid gap-1.5 text-sm">
              <span class="font-medium">{{ t('cateringPage.guests') }}</span>
              <input
                v-model="inquiry.guests"
                type="number"
                min="8"
                max="120"
                class="rounded-sm border border-ink/15 bg-foam px-3 py-3 text-sm outline-none focus:border-leaf"
              >
            </label>
          </div>
          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">{{ t('cateringPage.package') }}</span>
            <input
              v-model="inquiry.packageInterest"
              type="text"
              :placeholder="t('cateringPage.packagePlaceholder')"
              class="rounded-sm border border-ink/15 bg-foam px-3 py-3 text-sm outline-none focus:border-leaf"
            >
          </label>
          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">{{ t('cateringPage.details') }}</span>
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
            {{ status === 'loading' ? t('cateringPage.sending') : t('cateringPage.send') }}
          </BaseButton>
        </form>
      </div>
    </div>
  </div>
</template>
