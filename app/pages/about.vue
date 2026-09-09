<script setup lang="ts">
const { info, values } = useCafe()
const { t } = useI18n()
const { tx } = useLocaleText()

useSeoMeta({
  title: () => `${t('aboutPage.eyebrow')} — ${info.name}`,
  description: () => t('aboutPage.p1', { name: info.name }),
})
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
      <aside>
        <img
          src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80"
          alt=""
          width="1200"
          height="800"
          class="h-[min(28rem,70vw)] w-full rounded-sm object-cover"
        >
      </aside>
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
  </div>
</template>
