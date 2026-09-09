<script setup lang="ts">
const { info } = useCafe()
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <section class="grid bg-mist lg:grid-cols-[1.05fr_0.95fr] lg:min-h-[34rem]">
    <div>
      <img
        src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1400&q=80"
        alt="Barista pouring espresso into a ceramic cup"
        width="1400"
        height="933"
        class="h-[min(70vh,36rem)] w-full object-cover lg:h-full"
      >
    </div>
    <div class="grid content-center gap-4 p-[clamp(2.5rem,6vw,4.5rem)]">
      <p class="eyebrow">
        {{ t('story.eyebrow') }}
      </p>
      <h2 class="max-w-[12ch] text-[clamp(2rem,4vw,3rem)]">
        {{ t('story.title') }}
      </h2>
      <p class="max-w-md text-mute">
        {{ t('story.p1', { name: info.name }) }}
      </p>
      <p class="max-w-md text-mute">
        {{ t('story.p2') }}
      </p>
      <div class="pt-2">
        <BaseButton :to="localePath('/about')">
          {{ t('story.cta') }}
        </BaseButton>
      </div>
    </div>
  </section>
</template>
