<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{
  error: NuxtError
}>()

const localePath = useLocalePath()
const handleError = () => clearError({ redirect: localePath('/') })
</script>

<template>
  <div class="flex min-h-screen flex-col bg-mist">
    <div class="container-site flex flex-1 flex-col justify-center py-20">
      <p class="eyebrow">
        Solace
      </p>
      <h1 class="mb-4 text-[clamp(2.5rem,8vw,4.5rem)]">
        {{ error.statusCode === 404 ? 'Page not found' : 'Something went wrong' }}
      </h1>
      <p class="mb-8 max-w-md text-mute">
        {{ error.statusCode === 404
          ? 'That route wandered off. Let’s get you back to the counter.'
          : error.statusMessage || 'Please try again in a moment.' }}
      </p>
      <div class="flex flex-wrap gap-3">
        <BaseButton
          :to="localePath('/')"
          variant="ink"
        >
          Back home
        </BaseButton>
        <BaseButton
          type="button"
          variant="primary"
          @click="handleError"
        >
          Clear error
        </BaseButton>
      </div>
    </div>
  </div>
</template>
