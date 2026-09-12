<script setup lang="ts">
const { t } = useI18n()
const toast = useToast()
const { fullAddress, googleMapsUrl, appleMapsUrl } = useMapLinks()

const linkClass
  = 'inline-flex items-center justify-center gap-2 rounded-sm px-5 py-3.5 text-sm font-medium tracking-wide transition duration-200 ease-out hover:-translate-y-px'

async function copyAddress() {
  try {
    await navigator.clipboard.writeText(fullAddress.value)
    toast.success(t('visitPage.copied'))
  }
  catch {
    toast.error(t('error.generic'))
  }
}
</script>

<template>
  <section
    class="mt-8 border-t border-ink/10 pt-6"
    :aria-label="t('visitPage.directions')"
  >
    <h2 class="mb-2 text-xl tracking-tight">
      {{ t('visitPage.directions') }}
    </h2>
    <p class="mb-4 max-w-md text-sm leading-relaxed text-mute">
      {{ t('visitPage.directionsLede') }}
    </p>

    <div class="mb-5 flex flex-wrap gap-2">
      <a
        :href="googleMapsUrl"
        class="bg-ink text-foam hover:bg-roast"
        :class="linkClass"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ t('visitPage.openGoogle') }}
      </a>
      <a
        :href="appleMapsUrl"
        class="border border-ink/15 bg-transparent text-ink hover:border-ink/30"
        :class="linkClass"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ t('visitPage.openApple') }}
      </a>
      <BaseButton
        type="button"
        variant="ghost"
        class="!border-ink/15 !text-ink hover:!border-ink/30 hover:!bg-mist"
        @click="copyAddress"
      >
        {{ t('visitPage.copyAddress') }}
      </BaseButton>
    </div>

    <ul class="m-0 list-none space-y-2 p-0 text-sm text-mute">
      <li>{{ t('visitPage.transit') }}</li>
      <li>{{ t('visitPage.parking') }}</li>
    </ul>
  </section>
</template>
