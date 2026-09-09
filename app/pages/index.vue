<script setup lang="ts">
const { info } = useCafe()
const { t } = useI18n()
const { tx } = useLocaleText()

useSeoMeta({
  title: () => t('site.title', { name: info.name }),
  description: () => tx(info.tagline),
  ogTitle: () => t('site.title', { name: info.name }),
  ogDescription: () => tx(info.tagline),
})
</script>

<template>
  <div class="home-page">
    <HomeHero />
    <HomeFeatured />
    <HomeStory />
    <HomeValues />
    <HomeGallery />
    <HomeTestimonials />
    <HomeJournal />
    <HomeNewsletter />
    <HomeVisit />
  </div>
</template>
