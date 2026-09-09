<script setup lang="ts">
const { info } = useCafe()
const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: () => `${t('wholesalePage.eyebrow')} — ${info.name}`,
  description: () => t('wholesalePage.seoDescription'),
})
</script>

<template>
  <div class="section-space">
    <div class="container-site max-w-4xl">
      <p class="eyebrow">
        {{ t('wholesalePage.eyebrow') }}
      </p>
      <h1 class="mb-4 max-w-[16ch] text-[clamp(2.4rem,6vw,3.5rem)] leading-snug">
        {{ t('wholesalePage.title') }}
      </h1>
      <p class="mb-12 max-w-2xl leading-relaxed text-mute">
        {{ t('wholesalePage.lede') }}
      </p>

      <h2 class="mb-6 text-2xl leading-snug">
        {{ t('wholesalePage.offerTitle') }}
      </h2>
      <ul class="mb-12 grid list-none gap-4 p-0 md:grid-cols-3">
        <li class="border border-ink/10 p-5 leading-relaxed text-mute">
          {{ t('wholesalePage.offer1') }}
        </li>
        <li class="border border-ink/10 p-5 leading-relaxed text-mute">
          {{ t('wholesalePage.offer2') }}
        </li>
        <li class="border border-ink/10 p-5 leading-relaxed text-mute">
          {{ t('wholesalePage.offer3') }}
        </li>
      </ul>

      <BaseButton
        :to="localePath('/contact')"
        variant="ink"
      >
        {{ t('wholesalePage.cta') }}
      </BaseButton>
    </div>
  </div>
</template>
