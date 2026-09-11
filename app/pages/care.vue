<script setup lang="ts">
const { info } = useCafe()
const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: () => `${t('carePage.eyebrow')} — ${info.name}`,
  description: () => t('carePage.seoDescription'),
})

const points = computed(() => [
  { title: t('carePage.accessTitle'), body: t('carePage.accessBody') },
  { title: t('carePage.quietTitle'), body: t('carePage.quietBody') },
  { title: t('carePage.allergenTitle'), body: t('carePage.allergenBody') },
  { title: t('carePage.serviceTitle'), body: t('carePage.serviceBody') },
])
</script>

<template>
  <div class="section-space">
    <div class="container-site max-w-4xl">
      <p class="eyebrow">
        {{ t('carePage.eyebrow') }}
      </p>
      <h1 class="mb-4 max-w-[16ch] text-[clamp(2.4rem,6vw,3.5rem)] leading-snug">
        {{ t('carePage.title') }}
      </h1>
      <p class="mb-12 max-w-2xl leading-relaxed text-mute">
        {{ t('carePage.lede') }}
      </p>

      <ul class="mb-12 grid list-none gap-6 p-0 md:grid-cols-2">
        <li
          v-for="point in points"
          :key="point.title"
          class="border-t border-ink/10 pt-5"
        >
          <h2 class="mb-2 text-xl tracking-tight">
            {{ point.title }}
          </h2>
          <p class="text-sm leading-relaxed text-mute">
            {{ point.body }}
          </p>
        </li>
      </ul>

      <div class="flex flex-wrap gap-3">
        <a
          href="/allergen-card.pdf"
          class="inline-flex items-center justify-center gap-2 rounded-sm bg-ink px-5 py-3.5 text-sm font-medium tracking-wide text-foam transition duration-200 ease-out hover:-translate-y-px hover:bg-roast"
          download
        >
          {{ t('carePage.pdfCta') }}
        </a>
        <BaseButton
          :to="localePath('/faq')"
          variant="primary"
        >
          {{ t('carePage.faqCta') }}
        </BaseButton>
        <BaseButton
          :to="localePath('/contact')"
        >
          {{ t('carePage.contactCta') }}
        </BaseButton>
      </div>
    </div>
  </div>
</template>
