<script setup lang="ts">
const { info } = useCafe()
const { t } = useI18n()

const mapSrc = computed(() => {
  const query = encodeURIComponent(`${info.address}, ${info.city}`)
  return `https://maps.google.com/maps?q=${query}&z=15&output=embed`
})
</script>

<template>
  <div class="overflow-hidden rounded-md border border-ink/10 bg-mist">
    <iframe
      :title="t('site.mapTitle')"
      :src="mapSrc"
      class="h-[22rem] w-full border-0 lg:h-[28rem]"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      allowfullscreen
    />
  </div>
</template>
