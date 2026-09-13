<script setup lang="ts">
import type { MenuItem } from '~/types/cafe'

const props = defineProps<{
  item: MenuItem | null
  open: boolean
}>()

const emit = defineEmits<{
  close: []
  favorite: [MenuItem]
}>()

const { t } = useI18n()
const { tx } = useLocaleText()
const localePath = useLocalePath()
const toast = useToast()
const { isFavorite } = useMenuPrefs()
const { addItem, qtyOf, setQty } = useCart()

const titleId = 'menu-item-detail-title'
const pickQty = ref(1)
const note = ref('')

const inBag = computed(() => (props.item ? qtyOf(props.item.id) : 0))

watch(
  () => [props.open, props.item?.id] as const,
  ([isOpen]) => {
    if (isOpen && props.item) {
      pickQty.value = 1
      note.value = ''
    }
  },
)

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

function bumpPick(delta: number) {
  pickQty.value = Math.min(12, Math.max(1, pickQty.value + delta))
}

function addToBag(goCheckout = false) {
  if (!props.item) {
    return
  }
  const name = tx(props.item.name)
  addItem(props.item, name, {
    qty: pickQty.value,
    note: note.value,
  })
  toast.success(t('menuPage.addedQty', { name, count: pickQty.value }))
  emit('close')
  if (goCheckout) {
    navigateTo(localePath('/order'))
  }
}
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

          <p
            v-if="inBag"
            class="mt-4 text-sm text-mute"
          >
            {{ t('menuPage.alreadyInBag', { count: inBag }) }}
          </p>

          <div class="mt-6 grid gap-4">
            <div>
              <p class="mb-2 text-sm font-medium">
                {{ t('menuPage.qty') }}
              </p>
              <div class="flex w-full max-w-[11rem] items-center justify-between rounded-sm border border-ink/15">
                <button
                  type="button"
                  class="grid h-11 w-11 place-items-center text-lg transition hover:bg-mist"
                  :aria-label="t('order.decrease', { name: tx(item.name) })"
                  @click="bumpPick(-1)"
                >
                  −
                </button>
                <span class="text-sm font-medium tabular-nums">
                  {{ pickQty }}
                </span>
                <button
                  type="button"
                  class="grid h-11 w-11 place-items-center text-lg transition hover:bg-mist"
                  :aria-label="t('order.increase', { name: tx(item.name) })"
                  @click="bumpPick(1)"
                >
                  +
                </button>
              </div>
            </div>

            <label class="grid gap-1.5 text-sm">
              <span class="font-medium">{{ t('menuPage.itemNote') }}</span>
              <input
                v-model="note"
                type="text"
                maxlength="80"
                :placeholder="t('menuPage.itemNotePlaceholder')"
                class="rounded-sm border border-ink/15 bg-mist/40 px-3 py-3 text-sm outline-none focus:border-leaf focus:bg-foam"
              >
            </label>
          </div>

          <div class="mt-auto flex flex-col gap-2 pt-8">
            <BaseButton
              type="button"
              variant="ink"
              @click="addToBag(false)"
            >
              {{ t('menuPage.addToBag') }}
            </BaseButton>
            <BaseButton
              type="button"
              variant="primary"
              @click="addToBag(true)"
            >
              {{ t('menuPage.addAndCheckout') }}
            </BaseButton>

            <div
              v-if="inBag"
              class="mt-2 flex items-center justify-between rounded-sm border border-ink/10 bg-mist/40 px-3 py-2"
            >
              <span class="text-sm text-mute">
                {{ t('menuPage.inBagNow', { count: inBag }) }}
              </span>
              <div class="flex items-center gap-1">
                <button
                  type="button"
                  class="grid h-8 w-8 place-items-center rounded-sm border border-ink/15 text-sm"
                  @click="setQty(item.id, inBag - 1)"
                >
                  −
                </button>
                <button
                  type="button"
                  class="grid h-8 w-8 place-items-center rounded-sm border border-ink/15 text-sm"
                  @click="addItem(item, tx(item.name))"
                >
                  +
                </button>
              </div>
            </div>

            <button
              type="button"
              class="mt-2 inline-flex items-center justify-center rounded-sm border border-ink/15 px-5 py-3 text-sm font-medium transition hover:border-ink/30"
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
