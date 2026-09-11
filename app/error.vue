<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const { t } = useI18n()
const localePath = useLocalePath()
const isNotFound = computed(() => props.error.statusCode === 404)

const handleError = () => clearError({ redirect: localePath('/') })

const shortcuts = computed(() => [
  { to: '/menu', label: t('error.toMenu') },
  { to: '/visit', label: t('error.toVisit') },
  { to: '/order', label: t('error.toOrder') },
  { to: '/faq', label: t('error.toFaq') },
])
</script>

<template>
  <div class="relative flex min-h-screen flex-col overflow-hidden bg-ink text-foam">
    <div
      class="pointer-events-none absolute inset-0 opacity-50"
      aria-hidden="true"
      style="background: radial-gradient(circle at 18% 20%, rgb(156 135 96 / 0.28), transparent 40%), radial-gradient(circle at 82% 75%, rgb(53 86 72 / 0.3), transparent 42%);"
    />

    <div class="container-site relative flex flex-1 flex-col justify-center py-20">
      <p class="eyebrow !text-brass">
        {{ t('error.brand') }}
      </p>
      <p
        v-if="isNotFound"
        class="mb-2 font-display text-[clamp(4rem,14vw,8rem)] leading-none tracking-tight text-foam/20"
        aria-hidden="true"
      >
        404
      </p>
      <h1 class="mb-4 max-w-[14ch] text-[clamp(2.2rem,6vw,3.6rem)] leading-snug">
        {{ isNotFound ? t('error.notFound') : t('error.generic') }}
      </h1>
      <p class="mb-8 max-w-md leading-relaxed text-foam/70">
        {{ isNotFound
          ? t('error.notFoundLede')
          : (error.statusMessage || t('error.genericLede')) }}
      </p>

      <div class="mb-10 flex flex-wrap gap-3">
        <BaseButton
          :to="localePath('/')"
          variant="light"
        >
          {{ t('error.home') }}
        </BaseButton>
        <BaseButton
          type="button"
          variant="ghost"
          @click="handleError"
        >
          {{ t('error.clear') }}
        </BaseButton>
      </div>

      <div
        v-if="isNotFound"
        class="flex flex-wrap gap-x-5 gap-y-2 text-sm text-foam/65"
      >
        <NuxtLink
          v-for="link in shortcuts"
          :key="link.to"
          :to="localePath(link.to)"
          class="underline-offset-2 transition hover:text-foam hover:underline"
        >
          {{ link.label }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
