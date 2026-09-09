<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{
  error: NuxtError
}>()

const { t } = useI18n()
const localePath = useLocalePath()
const handleError = () => clearError({ redirect: localePath('/') })
</script>

<template>
  <div class="flex min-h-screen flex-col bg-mist">
    <div class="container-site flex flex-1 flex-col justify-center py-20">
      <p class="eyebrow">
        {{ t('error.brand') }}
      </p>
      <h1 class="mb-4 text-[clamp(2.5rem,8vw,4.5rem)] leading-snug">
        {{ error.statusCode === 404 ? t('error.notFound') : t('error.generic') }}
      </h1>
      <p class="mb-8 max-w-md leading-relaxed text-mute">
        {{ error.statusCode === 404
          ? t('error.notFoundLede')
          : error.statusMessage || t('error.generic') }}
      </p>
      <div class="flex flex-wrap gap-3">
        <BaseButton
          :to="localePath('/')"
          variant="ink"
        >
          {{ t('error.home') }}
        </BaseButton>
        <BaseButton
          type="button"
          variant="primary"
          @click="handleError"
        >
          {{ t('error.clear') }}
        </BaseButton>
      </div>
    </div>
  </div>
</template>
