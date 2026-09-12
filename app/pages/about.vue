<script setup lang="ts">
const { info, values } = useCafe()
const { t } = useI18n()
const { tx } = useLocaleText()
const { el, visible } = useReveal()

useSeoMeta({
  title: () => `${t('aboutPage.eyebrow')} — ${info.name}`,
  description: () => t('aboutPage.p1', { name: info.name }),
})

const timeline = computed(() => [
  {
    year: t('aboutPage.step1Year'),
    title: t('aboutPage.step1Title'),
    body: t('aboutPage.step1Body'),
  },
  {
    year: t('aboutPage.step2Year'),
    title: t('aboutPage.step2Title'),
    body: t('aboutPage.step2Body'),
  },
  {
    year: t('aboutPage.step3Year'),
    title: t('aboutPage.step3Title'),
    body: t('aboutPage.step3Body'),
  },
])
</script>

<template>
  <div class="section-space">
    <div class="container-site grid items-center gap-10 lg:grid-cols-2">
      <div>
        <p class="eyebrow">
          {{ t('aboutPage.eyebrow') }}
        </p>
        <h1 class="mb-5 max-w-[14ch] text-[clamp(2.4rem,6vw,3.4rem)] leading-snug">
          {{ t('aboutPage.title') }}
        </h1>
        <p class="mb-4 max-w-md leading-relaxed text-mute">
          {{ t('aboutPage.p1', { name: info.name }) }}
        </p>
        <p class="mb-4 max-w-md leading-relaxed text-mute">
          {{ t('aboutPage.p2') }}
        </p>
        <p class="max-w-md leading-relaxed text-mute">
          {{ t('aboutPage.p3') }}
        </p>
      </div>
      <aside class="bg-[#2a221c]">
        <img
          src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1400&q=80"
          :alt="t('aboutPage.imageAlt')"
          width="1400"
          height="933"
          loading="lazy"
          decoding="async"
          class="h-[min(28rem,70vw)] w-full object-cover"
        >
      </aside>
    </div>

    <div
      ref="el"
      class="container-site mt-20"
      :class="{ 'is-visible': visible }"
    >
      <div class="reveal-block mb-10 max-w-xl">
        <p class="eyebrow">
          {{ t('aboutPage.timelineEyebrow') }}
        </p>
        <h2 class="text-[clamp(1.9rem,4vw,2.6rem)] leading-[1.05] tracking-tight">
          {{ t('aboutPage.timelineTitle') }}
        </h2>
      </div>
      <ol class="m-0 grid list-none gap-8 p-0 md:grid-cols-3">
        <li
          v-for="(step, index) in timeline"
          :key="step.year"
          class="border-t border-ink/10 pt-6"
          :class="`reveal-block reveal-block--${index + 1}`"
        >
          <p class="mb-3 font-display text-3xl text-brass">
            {{ step.year }}
          </p>
          <h3 class="mb-2 text-xl tracking-tight">
            {{ step.title }}
          </h3>
          <p class="text-sm leading-relaxed text-mute">
            {{ step.body }}
          </p>
        </li>
      </ol>
    </div>

    <div class="container-site mt-20 grid gap-8 border-t border-ink/10 pt-12 md:grid-cols-3">
      <article
        v-for="value in values"
        :key="tx(value.title)"
      >
        <h2 class="mb-3 text-xl">
          {{ tx(value.title) }}
        </h2>
        <p class="text-sm leading-relaxed text-mute">
          {{ tx(value.description) }}
        </p>
      </article>
    </div>

    <div class="container-site mt-20 grid gap-8 overflow-hidden bg-mist p-[clamp(1.75rem,5vw,3rem)] lg:grid-cols-[1.1fr_1fr] lg:items-center">
      <div>
        <p class="eyebrow">
          {{ t('aboutPage.sourcingEyebrow') }}
        </p>
        <h2 class="mb-4 text-[clamp(1.8rem,3.5vw,2.4rem)] leading-[1.05] tracking-tight">
          {{ t('aboutPage.sourcingTitle') }}
        </h2>
        <p class="max-w-lg leading-relaxed text-mute">
          {{ t('aboutPage.sourcingBody') }}
        </p>
      </div>
      <div class="bg-[#2a221c]">
        <img
          src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1200&q=80"
          :alt="t('aboutPage.sourcingTitle')"
          width="1200"
          height="800"
          loading="lazy"
          decoding="async"
          class="h-[min(18rem,55vw)] w-full object-cover lg:h-[22rem]"
        >
      </div>
    </div>
  </div>
</template>
