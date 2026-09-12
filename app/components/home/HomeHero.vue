<script setup lang="ts">
const { info } = useCafe()
const { t } = useI18n()
const { tx } = useLocaleText()
const localePath = useLocalePath()
</script>

<template>
  <section class="hero relative isolate min-h-[100svh] overflow-hidden text-foam">
    <div
      class="absolute inset-0"
      aria-hidden="true"
    >
      <NuxtImg
        src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=2400&q=80"
        alt=""
        width="2400"
        height="1600"
        format="webp"
        sizes="100vw"
        class="hero__media h-full w-full object-cover"
      />
      <div class="hero__veil absolute inset-0" />
      <div class="hero__grain absolute inset-0 opacity-[0.18] mix-blend-overlay" />
    </div>

    <div class="container-site relative z-10 flex min-h-[100svh] flex-col justify-end pb-[clamp(3.5rem,9vw,6.5rem)] pt-28">
      <div class="max-w-3xl">
        <div class="reveal mb-6">
          <OpenStatus tone="dark" />
        </div>

        <h1 class="reveal reveal-delay-1 hero__title mb-5 font-display tracking-[-0.04em]">
          {{ info.name }}
        </h1>

        <p class="reveal reveal-delay-2 mb-9 max-w-lg text-[clamp(1.05rem,2.1vw,1.35rem)] font-light leading-relaxed text-foam/80">
          {{ tx(info.tagline) }}
        </p>

        <div class="reveal reveal-delay-3 flex flex-wrap gap-3">
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

      <div
        class="hero__scroll pointer-events-none absolute inset-x-0 bottom-6 hidden justify-center md:flex"
        aria-hidden="true"
      >
        <span class="hero__scroll-line" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero__title {
  font-size: clamp(4rem, 14vw, 8.5rem);
  line-height: 0.9;
  text-wrap: balance;
}

.hero__media {
  transform: scale(1.1);
  animation: hero-zoom 22s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.hero__veil {
  background:
    linear-gradient(105deg, rgb(20 17 15 / 0.62) 0%, rgb(20 17 15 / 0.18) 46%, rgb(20 17 15 / 0.5) 100%),
    linear-gradient(180deg, rgb(20 17 15 / 0.2) 0%, rgb(20 17 15 / 0.32) 40%, rgb(20 17 15 / 0.94) 100%);
}

.hero__grain {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E");
}

.hero__scroll-line {
  display: block;
  width: 1px;
  height: 3.25rem;
  background: linear-gradient(180deg, transparent, rgb(250 248 244 / 0.75));
  animation: scroll-pulse 2.4s ease-in-out infinite;
}

@keyframes hero-zoom {
  to {
    transform: scale(1);
  }
}

@keyframes scroll-pulse {
  0%,
  100% {
    opacity: 0.25;
    transform: scaleY(0.85);
  }
  50% {
    opacity: 1;
    transform: scaleY(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero__media,
  .hero__scroll-line {
    animation: none;
  }

  .hero__media {
    transform: none;
  }
}
</style>
