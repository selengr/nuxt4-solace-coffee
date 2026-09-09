<script setup lang="ts">
const { info } = useCafe()

useSeoMeta({
  title: `${info.name} — Specialty Coffee`,
  description: info.tagline,
})
</script>

<template>
  <div>
    <HomeHero />
    <HomeFeatured />
    <HomeStory />
    <HomeVisit />
  </div>
</template>
