<script setup lang="ts">
const { info } = useCafe()
const { t } = useI18n()
const localePath = useLocalePath()
const { el, visible } = useReveal()
</script>

<template>
  <section
    ref="el"
    class="relative isolate overflow-hidden bg-ink lg:grid lg:min-h-[min(88vh,46rem)] lg:grid-cols-2"
    :class="{ 'is-visible': visible }"
  >
    <div class="relative min-h-[22rem] bg-[#2a221c] lg:order-2 lg:min-h-full">
      <img
        src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1600&q=80"
        :alt="t('gallery.storyAlt')"
        width="1600"
        height="1067"
        loading="lazy"
        decoding="async"
        class="story-media absolute inset-0 h-full w-full object-cover"
      >
      <div class="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent lg:bg-gradient-to-l lg:from-transparent lg:to-ink/25" />
    </div>

    <div class="relative flex items-center bg-mist px-[clamp(1.5rem,6vw,4.5rem)] py-[clamp(3rem,8vw,5rem)] text-ink lg:order-1">
      <div class="max-w-lg">
        <p class="eyebrow reveal-block">
          {{ t('story.eyebrow') }}
        </p>
        <h2 class="reveal-block reveal-block--1 mb-5 text-[clamp(2.2rem,4.5vw,3.4rem)] leading-[1.05] tracking-tight">
          {{ t('story.title') }}
        </h2>
        <p class="reveal-block reveal-block--2 mb-4 leading-relaxed text-mute">
          {{ t('story.p1', { name: info.name }) }}
        </p>
        <p class="reveal-block reveal-block--3 mb-8 leading-relaxed text-mute">
          {{ t('story.p2') }}
        </p>
        <div class="reveal-block reveal-block--3">
          <BaseButton
            :to="localePath('/about')"
            variant="ink"
          >
            {{ t('story.cta') }}
          </BaseButton>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.story-media {
  transform: scale(1.04);
  transition: transform 1.4s cubic-bezier(0.22, 1, 0.36, 1);
}

.is-visible .story-media {
  transform: scale(1);
}

@media (prefers-reduced-motion: reduce) {
  .story-media {
    transform: none;
    transition: none;
  }
}
</style>
