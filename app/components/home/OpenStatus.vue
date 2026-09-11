<script setup lang="ts">
withDefaults(defineProps<{
  tone?: 'light' | 'dark'
  detailed?: boolean
}>(), {
  tone: 'light',
  detailed: false,
})

const {
  isOpen,
  statusLabel,
  closesSoon,
  nextOpenLabel,
  todayRangeLabel,
} = useCafeHours()
</script>

<template>
  <div
    class="inline-flex flex-col gap-1"
    :class="detailed ? 'items-start' : 'items-stretch'"
  >
    <p
      class="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium backdrop-blur-sm"
      :class="tone === 'dark'
        ? (isOpen
          ? (closesSoon ? 'border-brass/40 bg-brass/15 text-foam' : 'border-foam/20 bg-foam/10 text-foam')
          : 'border-foam/15 bg-ink/30 text-foam/70')
        : (isOpen
          ? (closesSoon ? 'border-brass/35 bg-brass/10 text-ink' : 'border-leaf/25 bg-leaf/10 text-leaf')
          : 'border-ink/10 bg-mist text-mute')"
    >
      <span
        class="h-1.5 w-1.5 rounded-full"
        :class="isOpen
          ? (closesSoon
            ? 'bg-brass'
            : (tone === 'dark' ? 'bg-leaf-soft' : 'bg-leaf'))
          : (tone === 'dark' ? 'bg-foam/50' : 'bg-mute')"
        aria-hidden="true"
      />
      {{ statusLabel }}
    </p>
    <p
      v-if="detailed"
      class="text-xs"
      :class="tone === 'dark' ? 'text-foam/60' : 'text-mute'"
    >
      <template v-if="isOpen">
        {{ todayRangeLabel }}
      </template>
      <template v-else>
        {{ nextOpenLabel }}
      </template>
    </p>
  </div>
</template>
