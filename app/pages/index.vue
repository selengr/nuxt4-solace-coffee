<script setup lang="ts">
const { info } = useCafe()
const { t } = useI18n()
const { tx } = useLocaleText()

useCafeSeo({
  title: () => t('site.title', { name: info.name }),
  description: () => tx(info.tagline),
})
</script>

<template>
  <div class="home-page">
    <HomeHero />
    <HomeFeatured />
    <HomeStory />
    <HomeGallery />
    <HomeTestimonials />
    <HomeNewsletter />
    <HomeVisit />
  </div>
</template>

<style scoped>
.home-page {
  background-color: #faf8f4;
  background-image:
    radial-gradient(circle at 12% 18%, rgb(156 135 96 / 0.07), transparent 28%),
    radial-gradient(circle at 88% 8%, rgb(53 86 72 / 0.06), transparent 26%),
    linear-gradient(180deg, #faf8f4 0%, #f3f0ea 48%, #faf8f4 100%);
}
</style>
