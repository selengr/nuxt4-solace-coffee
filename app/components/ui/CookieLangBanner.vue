<script setup lang="ts">
const { t, locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const localePath = useLocalePath()
const { showBanner, accept, hydrate } = useConsent()

const otherLocale = computed(() => (locale.value === 'en' ? 'fa' : 'en'))

onMounted(() => {
  hydrate()
})
</script>

<template>
  <div
    v-if="showBanner"
    class="no-print fixed inset-x-0 bottom-0 z-[55] border-t border-ink/10 bg-foam/95 p-4 shadow-[0_-8px_30px_rgb(20_17_15_/_0.08)] backdrop-blur-md"
    role="dialog"
    :aria-label="t('consent.title')"
  >
    <div class="container-site flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div class="max-w-2xl">
        <p class="mb-1 text-sm font-medium">
          {{ t('consent.title') }}
        </p>
        <p class="text-sm leading-relaxed text-mute">
          {{ t('consent.lede') }}
          <NuxtLink
            :to="localePath('/privacy')"
            class="ms-1 text-leaf underline-offset-2 hover:underline"
          >
            {{ t('consent.privacy') }}
          </NuxtLink>
        </p>
      </div>
      <div class="flex flex-wrap gap-2">
        <NuxtLink
          :to="switchLocalePath(otherLocale)"
          class="inline-flex items-center justify-center rounded-sm border border-ink/15 px-4 py-2.5 text-sm font-medium transition hover:border-ink/30"
        >
          {{ t('consent.switchLang', { lang: t(`lang.${otherLocale}`) }) }}
        </NuxtLink>
        <BaseButton
          type="button"
          variant="ink"
          @click="accept"
        >
          {{ t('consent.accept') }}
        </BaseButton>
      </div>
    </div>
  </div>
</template>
