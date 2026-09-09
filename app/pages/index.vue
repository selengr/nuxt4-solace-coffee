<script setup lang="ts">
const { info } = useCafe()

useSeoMeta({
  title: `${info.name} — Specialty Coffee`,
  description: info.tagline,
  ogTitle: `${info.name} — Specialty Coffee`,
  ogDescription: info.tagline,
})
</script>

<template>
  <div>
    <HomeHero />
    <HomeFeatured />
    <HomeValues />
    <HomeStory />
    <HomeGallery />
    <HomeVisit />
  </div>
</template>
