<script setup lang="ts">
const { featured } = useCafe()
const { t } = useI18n()
const { tx } = useLocaleText()
const localePath = useLocalePath()
const { el, visible } = useReveal()
</script>

<template>
  <section
    ref="el"
    class="section-space"
  >
    <div
      class="container-site"
      :class="{ 'is-visible': visible }"
    >
      <div class="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div class="reveal-block max-w-xl">
          <p class="eyebrow">
            {{ t('featured.eyebrow') }}
          </p>
          <h2 class="text-[clamp(2.2rem,4.5vw,3.4rem)] leading-[1.05] tracking-tight">
            {{ t('featured.title') }}
          </h2>
        </div>
        <BaseButton
          class="reveal-block reveal-block--2"
          :to="localePath('/menu')"
          variant="ink"
        >
          {{ t('featured.fullMenu') }}
        </BaseButton>
      </div>

      <ul class="m-0 grid list-none gap-0 p-0 md:grid-cols-2 md:gap-x-12">
        <li
          v-for="(item, index) in featured"
          :key="item.id"
          class="group border-t border-ink/10 py-7 transition-colors"
          :class="`reveal-block reveal-block--${(index % 4) + 1}`"
        >
          <div class="mb-3 flex items-center justify-between gap-4">
            <p class="category-label text-[0.7rem] text-mute">
              {{ t(`menuPage.${item.category}`) }}
            </p>
            <p class="text-sm font-medium tabular-nums text-leaf">
              {{ item.price }}
            </p>
          </div>
          <h3 class="mb-2 font-display text-[clamp(1.45rem,2.4vw,1.85rem)] tracking-tight transition group-hover:text-leaf">
            {{ tx(item.name) }}
          </h3>
          <p class="max-w-md text-[0.95rem] leading-relaxed text-mute">
            {{ tx(item.description) }}
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>
