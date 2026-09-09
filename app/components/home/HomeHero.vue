<script setup lang="ts">
const { info } = useCafe()
const { t } = useI18n()
const { tx } = useLocaleText()
const localePath = useLocalePath()
</script>

<template>
  <section class="relative grid min-h-[min(92vh,54rem)] items-end overflow-hidden text-foam">
    <div
      class="absolute inset-0"
      aria-hidden="true"
    >
      <NuxtImg
        src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=2200&q=80"
        alt=""
        width="2200"
        height="1467"
        format="webp"
        sizes="100vw"
        class="h-full w-full object-cover animate-ease-zoom"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/55 to-ink/90" />
    </div>

    <div class="container-site relative z-10 max-w-2xl pb-[clamp(3.5rem,8vw,5.5rem)] pt-[clamp(4rem,12vw,7rem)]">
      <p class="eyebrow !text-brass reveal">
        {{ t('hero.eyebrow') }}
      </p>
      <div class="reveal reveal-delay-1 mb-5">
        <OpenStatus />
      </div>
      <h1 class="reveal reveal-delay-1 mb-4 text-[clamp(3.4rem,10vw,6.6rem)] tracking-tight">
        {{ info.name }}
      </h1>
      <p class="reveal reveal-delay-2 mb-8 max-w-md text-[clamp(1.05rem,2.2vw,1.25rem)] font-light text-foam/85">
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
          :to="localePath('/visit')"
          variant="ghost"
        >
          {{ t('hero.ctaVisit') }}
        </BaseButton>
      </div>
    </div>
  </section>
</template>
