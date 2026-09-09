<script setup lang="ts">
const { testimonials } = useCafe()
const { t } = useI18n()
const { tx } = useLocaleText()
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
      <div class="reveal-block mb-12 max-w-xl">
        <p class="eyebrow">
          {{ t('testimonials.eyebrow') }}
        </p>
        <h2 class="text-[clamp(2.2rem,4.5vw,3.3rem)] leading-[1.05] tracking-tight">
          {{ t('testimonials.title') }}
        </h2>
      </div>

      <ul class="m-0 grid list-none gap-10 p-0 lg:grid-cols-3 lg:gap-12">
        <li
          v-for="(item, index) in testimonials"
          :key="item.id"
          class="border-t border-ink/10 pt-6"
          :class="`reveal-block reveal-block--${index + 1}`"
        >
          <p class="mb-8 font-display text-[clamp(1.35rem,2.2vw,1.7rem)] leading-snug tracking-tight text-ink quote-mark">
            «{{ tx(item.quote) }}»
          </p>
          <p class="text-sm font-medium">
            {{ item.name }}
          </p>
          <p class="mt-1 text-xs text-mute">
            {{ tx(item.role) }}
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>
