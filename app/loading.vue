<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div
    class="fixed inset-x-0 top-0 z-[60] h-0.5 overflow-hidden bg-ink/5"
    role="progressbar"
    aria-busy="true"
    aria-valuemin="0"
    aria-valuemax="100"
    :aria-label="t('a11y.loading')"
  >
    <div class="loading-bar h-full w-1/3 bg-leaf" />
  </div>
</template>

<style scoped>
.loading-bar {
  animation: loading-slide 0.9s ease-in-out infinite;
}

@keyframes loading-slide {
  0% {
    transform: translateX(-120%);
  }
  100% {
    transform: translateX(320%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .loading-bar {
    animation: none;
    width: 100%;
    opacity: 0.55;
  }
}
</style>
