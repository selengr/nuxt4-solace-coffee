<script setup lang="ts">
const { locale, locales } = useI18n()

const i18nHead = useLocaleHead({
  addDirAttribute: true,
  addSeoAttributes: true,
})

const htmlDir = computed(() => {
  const fromHead = i18nHead.value.htmlAttrs?.dir
  if (fromHead === 'rtl' || fromHead === 'ltr') {
    return fromHead
  }
  const current = locales.value.find(
    entry => typeof entry !== 'string' && entry.code === locale.value,
  )
  if (current && typeof current !== 'string' && current.dir) {
    return current.dir
  }
  return locale.value === 'fa' ? 'rtl' : 'ltr'
})

const htmlLang = computed(() => {
  return i18nHead.value.htmlAttrs?.lang || (locale.value === 'fa' ? 'fa-IR' : 'en-US')
})

useHead(() => ({
  htmlAttrs: {
    lang: htmlLang.value,
    dir: htmlDir.value,
  },
}))

function applyDocumentDirection(code: string) {
  if (!import.meta.client) {
    return
  }
  const dir = code === 'fa' ? 'rtl' : 'ltr'
  const lang = code === 'fa' ? 'fa-IR' : 'en-US'
  document.documentElement.setAttribute('dir', dir)
  document.documentElement.setAttribute('lang', lang)
  document.body.classList.toggle('font-fa', code === 'fa')
}

watch(locale, code => applyDocumentDirection(code), { immediate: true })

onMounted(() => {
  applyDocumentDirection(locale.value)
})
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
