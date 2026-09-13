<script setup lang="ts">
const { info } = useCafe()
const { t } = useI18n()
const localePath = useLocalePath()
const toast = useToast()
const {
  stamps,
  slots,
  isFull,
  stampsNeeded,
  addStamp,
  redeem,
  reset,
} = useLoyalty()

useSeoMeta({
  title: () => `${t('loyaltyPage.eyebrow')} — ${info.name}`,
  description: () => t('loyaltyPage.seoDescription'),
})

const progressLabel = computed(() =>
  t('loyaltyPage.progress', { current: stamps.value, total: stampsNeeded }),
)

function onAddStamp() {
  const result = addStamp()
  if (!result.added && result.full) {
    toast.success(t('loyaltyPage.readyHint'))
    return
  }
  if (result.full) {
    toast.success(t('loyaltyPage.full'))
    return
  }
  toast.success(t('loyaltyPage.stampAdded'))
}

function onRedeem() {
  if (!redeem()) {
    toast.error(t('loyaltyPage.notReady'))
    return
  }
  toast.success(t('loyaltyPage.redeemed'))
}

function onReset() {
  reset()
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
            @click="onAddStamp"
          >
            {{ t('loyaltyPage.addStamp') }}
          </BaseButton>
          <BaseButton
            type="button"
            variant="primary"
            :disabled="!isFull"
            @click="onRedeem"
          >
            {{ t('loyaltyPage.redeem') }}
          </BaseButton>
          <button
            type="button"
            class="text-sm text-mute underline-offset-2 hover:text-ink hover:underline"
            @click="onReset"
          >
            {{ t('loyaltyPage.reset') }}
          </button>
        </div>
        <p class="mt-4 text-sm text-mute">
          {{ t('loyaltyPage.demoNote') }}
        </p>
        <p
          v-if="isFull"
          class="mt-3 text-sm font-medium text-leaf"
        >
          {{ t('loyaltyPage.readyHint') }}
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

      <div class="flex flex-wrap gap-3">
        <BaseButton
          :to="localePath('/menu')"
          variant="primary"
        >
          {{ t('loyaltyPage.ctaOrder') }}
        </BaseButton>
        <BaseButton
          :to="localePath('/visit')"
          variant="ink"
        >
          {{ t('loyaltyPage.cta') }}
        </BaseButton>
      </div>
    </div>
  </div>
</template>
