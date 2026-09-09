<script setup lang="ts">
const { values } = useCafe()
const { t } = useI18n()
</script>

<template>
  <section class="border-y border-ink/5 bg-mist section-space">
    <div class="container-site">
      <div class="mb-10 max-w-xl">
        <p class="eyebrow">
          {{ t('values.eyebrow') }}
        </p>
        <h2 class="text-[clamp(2rem,4vw,2.85rem)]">
          {{ t('values.title') }}
        </h2>
      </div>

      <ul class="grid list-none gap-8 p-0 md:grid-cols-3">
        <li
          v-for="(value, index) in values"
          :key="value.title"
          class="border-t border-ink/10 pt-6"
        >
          <p class="mb-4 font-display text-4xl text-brass/80">
            0{{ index + 1 }}
          </p>
          <h3 class="mb-3 text-xl">
            {{ value.title }}
          </h3>
          <p class="text-[0.95rem] leading-relaxed text-mute">
            {{ value.description }}
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>
