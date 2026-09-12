<script setup lang="ts">
const STAMPS_NEEDED = 8

const { info } = useCafe()
const { t } = useI18n()
const localePath = useLocalePath()
const toast = useToast()

useSeoMeta({
  title: () => `${t('loyaltyPage.eyebrow')} — ${info.name}`,
  description: () => t('loyaltyPage.seoDescription'),
})

const stamps = useState<number>('solace-loyalty-stamps', () => 0)

const slots = computed(() =>
  Array.from({ length: STAMPS_NEEDED }, (_, i) => i < stamps.value),
)

const progressLabel = computed(() =>
  t('loyaltyPage.progress', { current: stamps.value, total: STAMPS_NEEDED }),
)

function addStamp() {
  if (stamps.value >= STAMPS_NEEDED) {
    toast.success(t('loyaltyPage.readyHint'))
    return
  }
  stamps.value += 1
  if (stamps.value >= STAMPS_NEEDED) {
    toast.success(t('loyaltyPage.full'))
  }
  else {
    toast.success(t('loyaltyPage.stampAdded'))
  }
}

function redeem() {
  if (stamps.value < STAMPS_NEEDED) {
    toast.error(t('loyaltyPage.notReady'))
    return
  }
  stamps.value = 0
  toast.success(t('loyaltyPage.redeemed'))
}

function resetCard() {
  stamps.value = 0
  toast.success(t('loyaltyPage.resetDone'))
}
</script>

<template>
  <div class="section-space">
    <div class="container-site max-w-4xl">
      <p class="eyebrow">
        {{ t('loyaltyPage.eyebrow') }}
      </p>
      <h1 class="mb-4 max-w-[16ch] text-[clamp(2.4rem,6vw,3.5rem)] leading-snug">
        {{ t('loyaltyPage.title') }}
      </h1>
      <p class="mb-12 max-w-2xl leading-relaxed text-mute">
        {{ t('loyaltyPage.lede') }}
      </p>

      <section
        class="mb-12 border border-ink/10 bg-mist/40 p-6 sm:p-8"
        :aria-label="t('loyaltyPage.cardLabel')"
      >
        <div class="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p class="mb-1 text-[0.7rem] text-leaf label-meta">
              {{ t('loyaltyPage.cardLabel') }}
            </p>
            <p class="font-display text-2xl tracking-tight">
              {{ progressLabel }}
            </p>
          </div>
          <p class="max-w-xs text-sm text-mute">
            {{ t('loyaltyPage.reward') }}
          </p>
        </div>

        <ul
          class="mb-8 grid list-none grid-cols-4 gap-3 p-0 sm:grid-cols-8"
          :aria-label="progressLabel"
        >
          <li
            v-for="(filled, index) in slots"
            :key="index"
            class="aspect-square rounded-full border-2 transition"
            :class="filled
              ? 'border-leaf bg-leaf'
              : 'border-ink/15 bg-foam'"
            :aria-label="filled ? t('loyaltyPage.stampOn', { n: index + 1 }) : t('loyaltyPage.stampOff', { n: index + 1 })"
          />
        </ul>

        <div class="flex flex-wrap gap-2">
          <BaseButton
            type="button"
            variant="ink"
            @click="addStamp"
          >
            {{ t('loyaltyPage.addStamp') }}
          </BaseButton>
          <BaseButton
            type="button"
            variant="primary"
            :disabled="stamps < STAMPS_NEEDED"
            @click="redeem"
          >
            {{ t('loyaltyPage.redeem') }}
          </BaseButton>
          <BaseButton
            type="button"
            variant="ghost"
            @click="resetCard"
          >
            {{ t('loyaltyPage.reset') }}
          </BaseButton>
        </div>
        <p class="mt-4 text-sm text-mute">
          {{ t('loyaltyPage.demoNote') }}
        </p>
      </section>

      <h2 class="mb-6 text-2xl leading-snug">
        {{ t('loyaltyPage.howTitle') }}
      </h2>
      <ul class="mb-12 grid list-none gap-4 p-0 md:grid-cols-3">
        <li class="border border-ink/10 p-5 leading-relaxed text-mute">
          {{ t('loyaltyPage.how1') }}
        </li>
        <li class="border border-ink/10 p-5 leading-relaxed text-mute">
          {{ t('loyaltyPage.how2') }}
        </li>
        <li class="border border-ink/10 p-5 leading-relaxed text-mute">
          {{ t('loyaltyPage.how3') }}
        </li>
      </ul>

      <BaseButton
        :to="localePath('/visit')"
        variant="ink"
      >
        {{ t('loyaltyPage.cta') }}
      </BaseButton>
    </div>
  </div>
</template>
