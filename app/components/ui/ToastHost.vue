<script setup lang="ts">
const { toasts, dismiss } = useToast()

const toneClass: Record<string, string> = {
  success: 'border-leaf/30 bg-leaf text-foam',
  error: 'border-red-900/20 bg-red-900 text-foam',
  info: 'border-ink/10 bg-ink text-foam',
}
</script>

<template>
  <div
    class="pointer-events-none fixed inset-x-0 bottom-24 z-[80] flex flex-col items-center gap-2 px-4 sm:bottom-6"
    aria-live="polite"
  >
    <div
      v-for="toast in toasts"
      :key="toast.id"
      class="pointer-events-auto flex max-w-md items-start gap-3 rounded-sm border px-4 py-3 text-sm shadow-lg"
      :class="toneClass[toast.tone]"
    >
      <p class="flex-1">
        {{ toast.message }}
      </p>
      <button
        type="button"
        class="opacity-80 hover:opacity-100"
        aria-label="Dismiss"
        @click="dismiss(toast.id)"
      >
        ×
      </button>
    </div>
  </div>
</template>
