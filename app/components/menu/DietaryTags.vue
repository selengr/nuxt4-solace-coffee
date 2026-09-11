<script setup lang="ts">
import type { DietaryTag } from '~/types/cafe'

defineProps<{
  tags?: DietaryTag[]
}>()

const { t } = useI18n()
</script>

<template>
  <ul
    v-if="tags?.length"
    class="m-0 mt-2 flex list-none flex-wrap gap-1.5 p-0"
  >
    <li
      v-for="tag in tags"
      :key="tag"
      class="tag-chip rounded-sm border border-ink/10 bg-mist px-2 py-0.5 text-[0.68rem] text-mute"
    >
      {{ t(`menuPage.tags.${tag}`) }}
    </li>
  </ul>
</template>
