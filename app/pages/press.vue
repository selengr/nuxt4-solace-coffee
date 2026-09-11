<script setup lang="ts">
const { info } = useCafe()
const { t } = useI18n()
const { tx } = useLocaleText()
const localePath = useLocalePath()

useSeoMeta({
  title: () => `${t('pressPage.eyebrow')} — ${info.name}`,
  description: () => t('pressPage.seoDescription'),
})

const assets = computed(() => [
  { title: t('pressPage.asset1Title'), body: t('pressPage.asset1Body'), href: '/favicon.ico' },
  { title: t('pressPage.asset2Title'), body: t('pressPage.asset2Body'), href: '/allergen-card.pdf' },
  { title: t('pressPage.asset3Title'), body: t('pressPage.asset3Body'), href: localePath('/about') },
])
</script>

<template>
  <div class="section-space">
    <div class="container-site max-w-4xl">
      <p class="eyebrow">
        {{ t('pressPage.eyebrow') }}
      </p>
      <h1 class="mb-4 max-w-[16ch] text-[clamp(2.4rem,6vw,3.5rem)] leading-snug">
        {{ t('pressPage.title') }}
      </h1>
      <p class="mb-10 max-w-2xl leading-relaxed text-mute">
        {{ t('pressPage.lede') }}
      </p>

      <section class="mb-12 border-t border-ink/10 pt-8">
        <h2 class="mb-3 text-2xl tracking-tight">
          {{ t('pressPage.voiceTitle') }}
        </h2>
        <p class="mb-3 max-w-2xl leading-relaxed text-mute">
          {{ t('pressPage.voiceBody') }}
        </p>
        <p class="max-w-2xl font-display text-xl tracking-tight text-ink">
          “{{ tx(info.tagline) }}”
        </p>
      </section>

      <section class="mb-12">
        <h2 class="mb-6 text-2xl tracking-tight">
          {{ t('pressPage.assetsTitle') }}
        </h2>
        <ul class="m-0 grid list-none gap-4 p-0 md:grid-cols-3">
          <li
            v-for="asset in assets"
            :key="asset.title"
            class="border border-ink/10 p-5"
          >
            <h3 class="mb-2 text-lg tracking-tight">
              {{ asset.title }}
            </h3>
            <p class="mb-4 text-sm leading-relaxed text-mute">
              {{ asset.body }}
            </p>
            <NuxtLink
              v-if="asset.href.startsWith('/')"
              :to="asset.href"
              class="text-sm text-leaf underline-offset-2 hover:underline"
            >
              {{ t('pressPage.open') }}
            </NuxtLink>
          </li>
        </ul>
      </section>

      <section class="mb-12 border-t border-ink/10 pt-8">
        <h2 class="mb-3 text-2xl tracking-tight">
          {{ t('pressPage.factsTitle') }}
        </h2>
        <dl class="grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <dt class="mb-1 text-[0.7rem] text-leaf label-meta">
              {{ t('pressPage.location') }}
            </dt>
            <dd class="m-0">
              {{ info.address }}, {{ info.city }}
            </dd>
          </div>
          <div>
            <dt class="mb-1 text-[0.7rem] text-leaf label-meta">
              {{ t('pressPage.media') }}
            </dt>
            <dd class="m-0">
              <a :href="`mailto:${info.email}`">{{ info.email }}</a>
            </dd>
          </div>
        </dl>
      </section>

      <BaseButton
        :to="localePath('/contact')"
        variant="ink"
      >
        {{ t('pressPage.cta') }}
      </BaseButton>
    </div>
  </div>
</template>
