<script setup lang="ts">
const { info } = useCafe()
const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: () => `${t('privacyPage.eyebrow')} — ${info.name}`,
  description: () => t('privacyPage.seoDescription'),
})

const sections = computed(() => [
  { title: t('privacyPage.s1Title'), body: t('privacyPage.s1Body') },
  { title: t('privacyPage.s2Title'), body: t('privacyPage.s2Body') },
  { title: t('privacyPage.s3Title'), body: t('privacyPage.s3Body') },
  { title: t('privacyPage.s4Title'), body: t('privacyPage.s4Body') },
])
</script>

<template>
  <div class="section-space">
    <div class="container-site max-w-3xl">
      <p class="eyebrow">
        {{ t('privacyPage.eyebrow') }}
      </p>
      <h1 class="mb-4 max-w-[18ch] text-[clamp(2.4rem,6vw,3.5rem)] leading-snug">
        {{ t('privacyPage.title') }}
      </h1>
      <p class="mb-10 max-w-2xl leading-relaxed text-mute">
        {{ t('privacyPage.lede') }}
      </p>

      <ul class="mb-12 list-none space-y-8 p-0">
        <li
          v-for="section in sections"
          :key="section.title"
        >
          <h2 class="mb-2 text-xl tracking-tight">
            {{ section.title }}
          </h2>
          <p class="text-sm leading-relaxed text-mute">
            {{ section.body }}
          </p>
        </li>
      </ul>

      <p class="mb-6 text-sm text-mute">
        {{ t('privacyPage.contactHint') }}
        <a
          :href="`mailto:${info.email}`"
          class="text-leaf underline-offset-2 hover:underline"
        >{{ info.email }}</a>
      </p>

      <BaseButton
        :to="localePath('/contact')"
        variant="ink"
      >
        {{ t('privacyPage.cta') }}
      </BaseButton>
    </div>
  </div>
</template>
