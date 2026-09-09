<script setup lang="ts">
const { info } = useCafe()
const { tx } = useLocaleText()

useSeoMeta({
  title: `${info.name} — Specialty Coffee`,
  description: () => tx(info.tagline),
  ogTitle: `${info.name} — Specialty Coffee`,
  ogDescription: () => tx(info.tagline),
})
</script>

<template>
  <div>
    <HomeHero />
    <HomeFeatured />
    <HomeValues />
    <HomeStory />
    <HomeTestimonials />
    <HomeGallery />
    <HomeNewsletter />
    <HomeVisit />
  </div>
</template>
