<script setup lang="ts">
const { values } = useCafe()
const { t } = useI18n()
const { tx } = useLocaleText()
const { el, visible } = useReveal()
</script>

<template>
  <section
    ref="el"
    class="relative overflow-hidden bg-ink py-[clamp(4.5rem,10vw,7.5rem)] text-foam"
  >
    <div
      class="pointer-events-none absolute inset-0 opacity-40"
      aria-hidden="true"
      style="background: radial-gradient(circle at 15% 20%, rgb(156 135 96 / 0.22), transparent 42%), radial-gradient(circle at 85% 80%, rgb(53 86 72 / 0.28), transparent 40%);"
    />
    <div
      class="container-site relative"
      :class="{ 'is-visible': visible }"
    >
      <div class="reveal-block mb-12 max-w-xl">
        <p class="eyebrow !text-brass">
          {{ t('values.eyebrow') }}
        </p>
        <h2 class="text-[clamp(2.2rem,4.5vw,3.3rem)] leading-[1.05] tracking-tight">
          {{ t('values.title') }}
        </h2>
      </div>

      <ul class="m-0 grid list-none gap-8 p-0 md:grid-cols-3 md:gap-10">
        <li
          v-for="(value, index) in values"
          :key="tx(value.title)"
          class="border-t border-foam/15 pt-7"
          :class="`reveal-block reveal-block--${index + 1}`"
        >
          <p class="mb-5 font-display text-[clamp(2.8rem,5vw,4rem)] leading-none tracking-tight text-brass/90">
            {{ String(index + 1).padStart(2, '0') }}
          </p>
          <h3 class="mb-3 text-xl tracking-tight">
            {{ tx(value.title) }}
          </h3>
          <p class="text-[0.95rem] leading-relaxed text-foam/65">
            {{ tx(value.description) }}
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>
