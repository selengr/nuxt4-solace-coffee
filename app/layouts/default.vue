<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <a
      href="#main-content"
      class="skip-link"
    >
      {{ t('a11y.skip') }}
    </a>
    <CafeJsonLd />
    <AppHeader />
    <main
      id="main-content"
      class="flex-1"
      tabindex="-1"
    >
      <slot />
    </main>
    <AppFooter />
    <ToastHost />
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 220ms ease, transform 220ms ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
</style>
