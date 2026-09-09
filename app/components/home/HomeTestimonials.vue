<script setup lang="ts">
const { testimonials } = useCafe()
const { t } = useI18n()
</script>

<template>
  <section class="section-space border-y border-ink/5">
    <div class="container-site">
      <div class="mb-10 max-w-xl">
        <p class="eyebrow">
          {{ t('testimonials.eyebrow') }}
        </p>
        <h2 class="text-[clamp(2rem,4vw,2.85rem)]">
          {{ t('testimonials.title') }}
        </h2>
      </div>

      <ul class="grid list-none gap-6 p-0 md:grid-cols-3">
        <li
          v-for="item in testimonials"
          :key="item.id"
          class="border border-ink/10 bg-foam p-6"
        >
          <p class="mb-6 font-display text-xl leading-snug text-ink">
            “{{ item.quote }}”
          </p>
          <p class="text-sm font-medium">
            {{ item.name }}
          </p>
          <p class="text-xs text-mute">
            {{ item.role }}
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>
