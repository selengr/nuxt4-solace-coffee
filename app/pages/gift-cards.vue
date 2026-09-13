<script setup lang="ts">
const { info } = useCafe()
const { t, te } = useI18n()
const localePath = useLocalePath()
const toast = useToast()
const { profile } = useGuestProfile()

useSeoMeta({
  title: () => `${t('giftCardsPage.eyebrow')} — ${info.name}`,
  description: () => t('giftCardsPage.seoDescription'),
})

const presets = [25, 50, 100] as const
const amount = ref<number | 'custom'>(50)
const customAmount = ref(75)
const recipientEmail = ref('')
const note = ref('')
const buyerName = ref(profile.value.name || '')
const buyerEmail = ref(profile.value.email || '')
const status = ref<'idle' | 'loading' | 'error'>('idle')

const selectedAmount = computed(() =>
  amount.value === 'custom' ? Number(customAmount.value) || 0 : amount.value,
)

async function submitInquiry() {
  if (selectedAmount.value < 10) {
    toast.error(t('giftCardsPage.minError'))
    return
  }

  status.value = 'loading'
  try {
    const result = await $fetch<{ ok: boolean, messageKey: string, demo?: boolean }>('/api/gift-cards', {
      method: 'POST',
      body: {
        amount: selectedAmount.value,
        recipientEmail: recipientEmail.value,
        note: note.value,
        buyerName: buyerName.value,
        buyerEmail: buyerEmail.value,
      },
    })
    toast.success(te(result.messageKey) ? t(result.messageKey) : t('giftCardsPage.success'))
    note.value = ''
    status.value = 'idle'
  }
  catch (error: unknown) {
    status.value = 'error'
    const err = error as { data?: { data?: { errors?: string[] }, errors?: string[] } }
    const keys = err.data?.data?.errors ?? err.data?.errors ?? []
    const message = keys.length
      ? (te(keys[0]!) ? t(keys[0]!) : keys[0]!)
      : t('form.genericError')
    toast.error(message)
  }
}
</script>

<template>
  <div class="section-space">
    <div class="container-site max-w-4xl">
      <p class="eyebrow">
        {{ t('giftCardsPage.eyebrow') }}
      </p>
      <h1 class="mb-4 max-w-[16ch] text-[clamp(2.4rem,6vw,3.5rem)] leading-snug">
        {{ t('giftCardsPage.title') }}
      </h1>
      <p class="mb-12 max-w-2xl leading-relaxed text-mute">
        {{ t('giftCardsPage.lede') }}
      </p>

      <h2 class="mb-6 text-2xl leading-snug">
        {{ t('giftCardsPage.offerTitle') }}
      </h2>
      <ul class="mb-12 grid list-none gap-4 p-0 md:grid-cols-3">
        <li class="border border-ink/10 p-5 leading-relaxed text-mute">
          {{ t('giftCardsPage.offer1') }}
        </li>
        <li class="border border-ink/10 p-5 leading-relaxed text-mute">
          {{ t('giftCardsPage.offer2') }}
        </li>
        <li class="border border-ink/10 p-5 leading-relaxed text-mute">
          {{ t('giftCardsPage.offer3') }}
        </li>
      </ul>

      <section class="mb-10 border border-ink/10 bg-mist p-6 sm:p-8">
        <h2 class="mb-4 text-xl tracking-tight">
          {{ t('giftCardsPage.pickerTitle') }}
        </h2>
        <p class="mb-5 text-sm text-mute">
          {{ t('giftCardsPage.pickerLede') }}
        </p>

        <form
          class="grid gap-4"
          @submit.prevent="submitInquiry"
        >
          <div
            class="flex flex-wrap gap-2"
            role="group"
            :aria-label="t('giftCardsPage.amount')"
          >
            <button
              v-for="preset in presets"
              :key="preset"
              type="button"
              class="rounded-sm border px-4 py-2.5 text-sm transition"
              :class="amount === preset
                ? 'border-ink bg-ink text-foam'
                : 'border-ink/15 text-mute hover:border-ink/35'"
              :aria-pressed="amount === preset"
              @click="amount = preset"
            >
              ${{ preset }}
            </button>
            <button
              type="button"
              class="rounded-sm border px-4 py-2.5 text-sm transition"
              :class="amount === 'custom'
                ? 'border-ink bg-ink text-foam'
                : 'border-ink/15 text-mute hover:border-ink/35'"
              :aria-pressed="amount === 'custom'"
              @click="amount = 'custom'"
            >
              {{ t('giftCardsPage.custom') }}
            </button>
          </div>

          <label
            v-if="amount === 'custom'"
            class="grid max-w-xs gap-1.5 text-sm"
          >
            <span class="font-medium">{{ t('giftCardsPage.customAmount') }}</span>
            <input
              v-model.number="customAmount"
              type="number"
              min="10"
              max="500"
              class="rounded-sm border border-ink/15 bg-foam px-3 py-3 outline-none focus:border-leaf"
            >
          </label>

          <div class="grid gap-4 sm:grid-cols-2">
            <label class="grid gap-1.5 text-sm">
              <span class="font-medium">{{ t('giftCardsPage.buyerName') }}</span>
              <input
                v-model="buyerName"
                type="text"
                autocomplete="name"
                class="rounded-sm border border-ink/15 bg-foam px-3 py-3 outline-none focus:border-leaf"
              >
            </label>
            <label class="grid gap-1.5 text-sm">
              <span class="font-medium">{{ t('giftCardsPage.buyerEmail') }}</span>
              <input
                v-model="buyerEmail"
                type="email"
                autocomplete="email"
                class="rounded-sm border border-ink/15 bg-foam px-3 py-3 outline-none focus:border-leaf"
              >
            </label>
          </div>

          <label class="grid max-w-md gap-1.5 text-sm">
            <span class="font-medium">{{ t('giftCardsPage.recipient') }}</span>
            <input
              v-model="recipientEmail"
              type="email"
              :placeholder="t('giftCardsPage.recipientPlaceholder')"
              class="rounded-sm border border-ink/15 bg-foam px-3 py-3 outline-none focus:border-leaf"
            >
          </label>

          <label class="grid max-w-md gap-1.5 text-sm">
            <span class="font-medium">{{ t('giftCardsPage.note') }}</span>
            <textarea
              v-model="note"
              rows="3"
              :placeholder="t('giftCardsPage.notePlaceholder')"
              class="rounded-sm border border-ink/15 bg-foam px-3 py-3 outline-none focus:border-leaf"
            />
          </label>

          <p class="text-sm font-medium">
            {{ t('giftCardsPage.selected', { amount: selectedAmount }) }}
          </p>

          <div class="flex flex-wrap gap-3">
            <BaseButton
              type="submit"
              variant="primary"
              :disabled="status === 'loading'"
            >
              {{ status === 'loading' ? t('giftCardsPage.sending') : t('giftCardsPage.submit') }}
            </BaseButton>
            <BaseButton
              :to="localePath('/contact')"
              variant="ink"
            >
              {{ t('giftCardsPage.cta') }}
            </BaseButton>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>
