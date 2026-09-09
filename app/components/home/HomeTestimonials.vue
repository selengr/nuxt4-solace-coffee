<script setup lang="ts">
const { testimonials } = useCafe()
const { t } = useI18n()
const { tx } = useLocaleText()
const { el, visible } = useReveal()

const primary = computed(() => testimonials[0])
const rest = computed(() => testimonials.slice(1))
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

      <div
        v-if="primary"
        class="grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16"
      >
        <blockquote class="reveal-block border-t border-ink/10 pt-8">
          <p class="mb-4 text-[0.7rem] text-brass label-meta">
            {{ t('testimonials.featuredLabel') }}
          </p>
          <p class="mb-10 font-display text-[clamp(1.7rem,3.4vw,2.55rem)] leading-[1.15] tracking-tight text-ink quote-mark">
            «{{ tx(primary.quote) }}»
          </p>
          <footer>
            <p class="text-sm font-medium">
              {{ primary.name }}
            </p>
            <p class="mt-1 text-xs text-mute">
              {{ tx(primary.role) }}
            </p>
          </footer>
        </blockquote>

        <ul class="m-0 grid list-none gap-8 p-0">
          <li
            v-for="(item, index) in rest"
            :key="item.id"
            class="border-t border-ink/10 pt-6"
            :class="`reveal-block reveal-block--${index + 2}`"
          >
            <p class="mb-6 font-display text-[clamp(1.2rem,2vw,1.45rem)] leading-snug tracking-tight text-ink quote-mark">
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
    </div>
  </section>
</template>
