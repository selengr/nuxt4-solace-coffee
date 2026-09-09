<script setup lang="ts">
withDefaults(defineProps<{
  tone?: 'light' | 'dark'
}>(), {
  tone: 'light',
})

const { isOpen, statusLabel } = useCafeHours()
</script>

<template>
  <p
    class="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium backdrop-blur-sm"
    :class="tone === 'dark'
      ? (isOpen ? 'border-foam/20 bg-foam/10 text-foam' : 'border-foam/15 bg-ink/30 text-foam/70')
      : (isOpen ? 'border-leaf/25 bg-leaf/10 text-leaf' : 'border-ink/10 bg-mist text-mute')"
  >
    <span
      class="h-1.5 w-1.5 rounded-full"
      :class="isOpen
        ? (tone === 'dark' ? 'bg-leaf-soft' : 'bg-leaf')
        : (tone === 'dark' ? 'bg-foam/50' : 'bg-mute')"
      aria-hidden="true"
    />
    {{ statusLabel }}
  </p>
</template>
