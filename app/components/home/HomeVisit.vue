<script setup lang="ts">
const { info } = useCafe()
const { t } = useI18n()
const { txList } = useLocaleText()
const localePath = useLocalePath()
const { el, visible } = useReveal()
</script>

<template>
  <section
    ref="el"
    class="relative overflow-hidden bg-roast py-[clamp(4.5rem,10vw,7.5rem)] text-foam"
  >
    <div
      class="pointer-events-none absolute -start-24 top-0 h-72 w-72 rounded-full bg-brass/15 blur-3xl"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute -end-16 bottom-0 h-80 w-80 rounded-full bg-leaf/20 blur-3xl"
      aria-hidden="true"
    />

    <div
      class="container-site relative grid gap-10 lg:grid-cols-[1.3fr_1fr_auto] lg:items-end"
      :class="{ 'is-visible': visible }"
    >
      <div class="reveal-block">
        <p class="eyebrow !text-brass">
          {{ t('visitBlock.eyebrow') }}
        </p>
        <h2 class="mb-4 text-[clamp(2.3rem,5vw,3.6rem)] leading-[1.02] tracking-tight">
          {{ t('visitBlock.title', { name: info.name }) }}
        </h2>
        <p class="max-w-md text-foam/70 leading-relaxed">
          {{ t('visitBlock.lede') }}
        </p>
      </div>

      <div class="reveal-block reveal-block--2 grid gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        <div>
          <p class="mb-2 text-[0.7rem] text-brass label-meta">
            {{ t('visitBlock.address') }}
          </p>
          <p>{{ info.address }}</p>
          <p>{{ info.city }}</p>
        </div>
        <div>
          <p class="mb-2 text-[0.7rem] text-brass label-meta">
            {{ t('visitBlock.hours') }}
          </p>
          <p
            v-for="line in txList(info.hours)"
            :key="line"
          >
            {{ line }}
          </p>
        </div>
      </div>

      <div class="reveal-block reveal-block--3">
        <BaseButton
          :to="localePath('/visit')"
          variant="light"
        >
          {{ t('visitBlock.cta') }}
        </BaseButton>
      </div>
    </div>
  </section>
</template>
