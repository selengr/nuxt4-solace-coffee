<script setup lang="ts">
const { locale, locales } = useI18n()

const htmlDir = computed(() => {
  const current = locales.value.find(
    (entry) => typeof entry !== 'string' && entry.code === locale.value,
  )
  return current && typeof current !== 'string' && current.dir
    ? current.dir
    : 'ltr'
})

useHead({
  htmlAttrs: {
    lang: locale,
    dir: htmlDir,
  },
  bodyAttrs: {
    class: computed(() => (locale.value === 'fa' ? 'font-fa' : '')),
  },
})
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
