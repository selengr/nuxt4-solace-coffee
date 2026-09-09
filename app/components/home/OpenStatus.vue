<script setup lang="ts">
const { isOpen, statusLabel } = useCafeHours()
</script>

<template>
  <p
    class="inline-flex items-center gap-2 rounded-sm border px-3 py-1.5 text-xs font-medium"
    :class="isOpen ? 'border-leaf/25 bg-leaf/10 text-leaf' : 'border-ink/10 bg-mist text-mute'"
  >
    <span
      class="h-1.5 w-1.5 rounded-full"
      :class="isOpen ? 'bg-leaf' : 'bg-mute'"
      aria-hidden="true"
    />
    {{ statusLabel }}
  </p>
</template>
