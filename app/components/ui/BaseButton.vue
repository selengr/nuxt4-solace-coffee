<script setup lang="ts">
withDefaults(
  defineProps<{
    to?: string
    variant?: 'primary' | 'ghost' | 'light' | 'ink'
    type?: 'button' | 'submit'
  }>(),
  {
    variant: 'primary',
    type: 'button',
  },
)

const variants: Record<string, string> = {
  primary: 'bg-leaf text-foam hover:bg-leaf-soft',
  ghost: 'border border-foam/35 bg-transparent text-foam hover:border-foam hover:bg-foam/10',
  light: 'bg-foam text-ink hover:bg-stone',
  ink: 'bg-ink text-foam hover:bg-roast',
}
</script>

<template>
  <NuxtLink
    v-if="to"
    :to="to"
    class="inline-flex items-center justify-center gap-2 rounded-sm px-5 py-3.5 text-sm font-medium tracking-wide transition duration-200 ease-out hover:-translate-y-px"
    :class="variants[variant]"
  >
    <slot />
  </NuxtLink>
  <button
    v-else
    :type="type"
    class="inline-flex items-center justify-center gap-2 rounded-sm px-5 py-3.5 text-sm font-medium tracking-wide transition duration-200 ease-out hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-60"
    :class="variants[variant]"
  >
    <slot />
  </button>
</template>
