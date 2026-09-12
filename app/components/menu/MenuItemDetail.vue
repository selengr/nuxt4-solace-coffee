<script setup lang="ts">
import type { MenuItem } from '~/types/cafe'

const props = defineProps<{
  item: MenuItem | null
  open: boolean
}>()

const emit = defineEmits<{
  close: []
  add: [MenuItem]
  favorite: [MenuItem]
}>()

const { t } = useI18n()
const { tx } = useLocaleText()
const { isFavorite } = useMenuPrefs()

const titleId = 'menu-item-detail-title'

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    emit('close')
  }
}

watch(
  () => props.open,
  (isOpen) => {
    if (!import.meta.client) {
      return
    }
    document.body.style.overflow = isOpen ? 'hidden' : ''
    if (isOpen) {
      window.addEventListener('keydown', onKeydown)
    }
    else {
      window.removeEventListener('keydown', onKeydown)
    }
  },
)

onUnmounted(() => {
  if (import.meta.client) {
    document.body.style.overflow = ''
    window.removeEventListener('keydown', onKeydown)
  }
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open && item"
      class="fixed inset-0 z-[70] flex justify-end"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="titleId"
    >
      <button
        type="button"
        class="absolute inset-0 bg-ink/45"
        :aria-label="t('menuPage.closeDetail')"
        @click="emit('close')"
      />
      <aside class="relative flex h-full w-full max-w-md flex-col overflow-y-auto bg-foam shadow-[-12px_0_40px_rgb(20_17_15_/_0.18)]">
        <div class="flex items-center justify-between border-b border-ink/10 px-5 py-4">
          <p class="text-xs text-mute label-meta">
            {{ t(`menuPage.${item.category}`) }}
          </p>
          <button
            type="button"
            class="grid h-9 w-9 place-items-center rounded-sm border border-ink/15 text-sm"
            :aria-label="t('menuPage.closeDetail')"
            @click="emit('close')"
          >
            ×
          </button>
        </div>

        <div
          v-if="item.image"
          class="aspect-[5/4] overflow-hidden bg-[#2a221c]"
        >
          <img
            :src="item.image"
            :alt="tx(item.name)"
            width="900"
            height="720"
            loading="lazy"
            decoding="async"
            class="h-full w-full object-cover"
          >
        </div>

        <div class="flex flex-1 flex-col px-5 py-6">
          <h2
            :id="titleId"
            class="mb-2 font-display text-[clamp(1.6rem,4vw,2rem)] tracking-tight"
          >
            {{ tx(item.name) }}
          </h2>
          <p class="mb-4 text-sm font-medium text-leaf">
            {{ item.price }}
          </p>
          <p class="mb-4 leading-relaxed text-mute">
            {{ tx(item.description) }}
          </p>
          <DietaryTags :tags="item.dietary" />

          <div class="mt-auto flex flex-col gap-3 pt-8">
            <BaseButton
              type="button"
              variant="ink"
              @click="emit('add', item)"
            >
              {{ t('menuPage.add') }}
            </BaseButton>
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-sm border border-ink/15 px-5 py-3.5 text-sm font-medium transition hover:border-ink/30"
              :class="isFavorite(item.id) ? 'border-brass/40 bg-brass/10' : ''"
              @click="emit('favorite', item)"
            >
              {{ isFavorite(item.id) ? t('menuPage.detailUnfavorite') : t('menuPage.detailFavorite') }}
            </button>
          </div>
        </div>
      </aside>
    </div>
  </Teleport>
</template>
