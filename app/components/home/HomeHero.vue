<script setup lang="ts">
const HERO_IMAGE
  = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=2000&q=75'

const { info } = useCafe()
const { t } = useI18n()
const { tx } = useLocaleText()
const localePath = useLocalePath()

useHead({
  link: [
    {
      rel: 'preload',
      as: 'image',
      href: HERO_IMAGE,
      fetchpriority: 'high',
    },
  ],
})
</script>

<template>
  <section class="hero relative isolate min-h-[88svh] overflow-hidden bg-[#2a221c] text-foam md:min-h-[100svh]">
    <div
      class="absolute inset-0"
      aria-hidden="true"
    >
      <img
        :src="HERO_IMAGE"
        alt=""
        width="2000"
        height="1333"
        decoding="async"
        fetchpriority="high"
        class="hero__media h-full w-full object-cover"
      >
      <div class="hero__veil absolute inset-0" />
    </div>

    <div class="container-site relative z-10 flex min-h-[88svh] flex-col justify-end pb-[clamp(3rem,8vw,5.5rem)] pt-24 md:min-h-[100svh]">
      <div class="max-w-3xl">
        <div class="mb-5">
          <OpenStatus tone="dark" />
        </div>

        <h1 class="hero__title mb-4 font-display tracking-[-0.04em]">
          {{ info.name }}
        </h1>

        <p class="mb-8 max-w-lg text-[clamp(1.05rem,2.1vw,1.3rem)] font-light leading-relaxed text-foam/85">
          {{ tx(info.tagline) }}
        </p>

        <div class="flex flex-wrap gap-3">
          <BaseButton
            :to="localePath('/menu')"
            variant="light"
          >
            {{ t('hero.ctaMenu') }}
          </BaseButton>
          <BaseButton
            :to="localePath('/order')"
            variant="ghost"
          >
            {{ t('hero.ctaOrder') }}
          </BaseButton>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero__title {
  font-size: clamp(3.5rem, 12vw, 7.5rem);
  line-height: 0.9;
  text-wrap: balance;
}

.hero__media {
  transform: scale(1.06);
  animation: hero-zoom 18s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.hero__veil {
  background:
    linear-gradient(105deg, rgb(20 17 15 / 0.72) 0%, rgb(20 17 15 / 0.28) 48%, rgb(20 17 15 / 0.55) 100%),
    linear-gradient(180deg, rgb(20 17 15 / 0.15) 0%, rgb(20 17 15 / 0.35) 45%, rgb(20 17 15 / 0.92) 100%);
}

@keyframes hero-zoom {
  to {
    transform: scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero__media {
    animation: none;
    transform: none;
  }
}
</style>
