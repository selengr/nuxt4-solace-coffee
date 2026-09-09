<script setup lang="ts">
const { t, locale } = useI18n()

const items = computed(() =>
  t('marquee.items')
    .split('·')
    .map(item => item.trim())
    .filter(Boolean),
)

const track = computed(() => [...items.value, ...items.value])
</script>

<template>
  <section
    class="marquee overflow-hidden border-y border-ink/8 bg-mist py-4 text-ink"
    aria-hidden="true"
  >
    <div
      class="marquee__track flex w-max gap-10 whitespace-nowrap"
      :class="{ 'marquee__track--rtl': locale === 'fa' }"
    >
      <span
        v-for="(item, index) in track"
        :key="`${item}-${index}`"
        class="inline-flex items-center gap-10 font-display text-[clamp(1.15rem,2.4vw,1.55rem)] tracking-tight text-ink/70"
      >
        {{ item }}
        <span class="h-1.5 w-1.5 rounded-full bg-brass/80" />
      </span>
    </div>
  </section>
</template>

<style scoped>
.marquee__track {
  animation: marquee-scroll 42s linear infinite;
}

.marquee__track--rtl {
  animation-name: marquee-scroll-rtl;
}

@keyframes marquee-scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@keyframes marquee-scroll-rtl {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .marquee__track {
    animation: none;
  }
}
</style>
