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
    class="relative isolate overflow-hidden py-[clamp(5rem,11vw,8rem)] text-foam"
  >
    <div
      class="absolute inset-0 bg-[#2a221c]"
      aria-hidden="true"
    >
      <img
        src="https://images.unsplash.com/photo-1559305616-3f99cd43e353?auto=format&fit=crop&w=2200&q=80"
        :alt="t('visitBlock.alt')"
        width="2200"
        height="1400"
        loading="lazy"
        decoding="async"
        class="h-full w-full object-cover"
      >
      <div class="absolute inset-0 bg-ink/78" />
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgb(156_135_96_/_0.22),transparent_45%),radial-gradient(circle_at_85%_70%,rgb(53_86_72_/_0.2),transparent_40%)]" />
    </div>

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
        <p class="max-w-md text-foam/75 leading-relaxed">
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
