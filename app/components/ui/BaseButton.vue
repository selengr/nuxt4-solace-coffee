<script setup lang="ts">
withDefaults(
  defineProps<{
    to?: string
    variant?: 'primary' | 'ghost' | 'light'
    type?: 'button' | 'submit'
  }>(),
  {
    variant: 'primary',
    type: 'button',
  },
)
</script>

<template>
  <NuxtLink
    v-if="to"
    :to="to"
    class="btn"
    :class="`btn--${variant}`"
  >
    <slot />
  </NuxtLink>
  <button
    v-else
    :type="type"
    class="btn"
    :class="`btn--${variant}`"
  >
    <slot />
  </button>
</template>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.85rem 1.4rem;
  border-radius: var(--radius-sm);
  border: 1px solid transparent;
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  cursor: pointer;
  transition:
    background-color 200ms var(--ease-out),
    color 200ms var(--ease-out),
    border-color 200ms var(--ease-out),
    transform 200ms var(--ease-out);
}

.btn:hover {
  transform: translateY(-1px);
}

.btn--primary {
  background: var(--color-leaf);
  color: var(--color-foam);
}

.btn--primary:hover {
  background: var(--color-leaf-soft);
}

.btn--ghost {
  background: transparent;
  color: var(--color-foam);
  border-color: rgb(250 249 246 / 0.35);
}

.btn--ghost:hover {
  border-color: var(--color-foam);
  background: rgb(250 249 246 / 0.08);
}

.btn--light {
  background: var(--color-foam);
  color: var(--color-ink);
}

.btn--light:hover {
  background: var(--color-stone);
}
</style>
