<script setup lang="ts">
const { info } = useCafe()
const { t } = useI18n()
const localePath = useLocalePath()

const justJoined = useState<boolean>('solace-newsletter-joined', () => false)

useCafeSeo({
  title: () => `${t('newsletterThanks.eyebrow')} — ${info.name}`,
  description: () => t('newsletterThanks.seoDescription'),
})
</script>

<template>
  <div class="section-space">
    <div class="container-site max-w-2xl">
      <p class="eyebrow">
        {{ t('newsletterThanks.eyebrow') }}
      </p>
      <h1 class="mb-4 max-w-[16ch] text-[clamp(2.4rem,6vw,3.5rem)] leading-snug">
        {{ justJoined ? t('newsletterThanks.title') : t('newsletterThanks.titleGeneric') }}
      </h1>
      <p class="mb-8 max-w-xl leading-relaxed text-mute">
        {{ justJoined ? t('newsletterThanks.lede') : t('newsletterThanks.ledeGeneric') }}
      </p>

      <ul class="mb-10 list-none space-y-3 p-0 text-sm leading-relaxed text-mute">
        <li>{{ t('newsletterThanks.note1') }}</li>
        <li>{{ t('newsletterThanks.note2') }}</li>
        <li>{{ t('newsletterThanks.note3') }}</li>
      </ul>

      <div class="flex flex-wrap gap-3">
        <BaseButton
          :to="localePath('/')"
          variant="ink"
        >
          {{ t('newsletterThanks.home') }}
        </BaseButton>
        <BaseButton
          :to="localePath('/events')"
          variant="primary"
        >
          {{ t('newsletterThanks.events') }}
        </BaseButton>
      </div>
    </div>
  </div>
</template>
