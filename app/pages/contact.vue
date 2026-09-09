<script setup lang="ts">
const { info } = useCafe()
const { t } = useI18n()

useSeoMeta({
  title: () => `${t('contactPage.eyebrow')} — ${info.name}`,
  description: () => t('contactPage.lede'),
})
</script>

<template>
  <div class="section-space">
    <div class="container-site grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <p class="eyebrow">
          {{ t('contactPage.eyebrow') }}
        </p>
        <h1 class="mb-4 max-w-[12ch] text-[clamp(2.4rem,6vw,3.4rem)] leading-snug">
          {{ t('contactPage.title') }}
        </h1>
        <p class="mb-8 max-w-md leading-relaxed text-mute">
          {{ t('contactPage.lede') }}
        </p>

        <div class="space-y-5 text-sm">
          <div>
            <p class="mb-1 text-[0.7rem] text-leaf label-meta">
              {{ t('contactPage.email') }}
            </p>
            <a :href="`mailto:${info.email}`">{{ info.email }}</a>
          </div>
          <div>
            <p class="mb-1 text-[0.7rem] text-leaf label-meta">
              {{ t('contactPage.phone') }}
            </p>
            <p>{{ info.phone }}</p>
          </div>
          <div>
            <p class="mb-1 text-[0.7rem] text-leaf label-meta">
              {{ t('contactPage.social') }}
            </p>
            <p>{{ info.instagram }}</p>
          </div>
        </div>
      </div>

      <div class="rounded-md border border-ink/10 bg-mist p-6 sm:p-8">
        <ContactForm />
      </div>
    </div>
  </div>
</template>
