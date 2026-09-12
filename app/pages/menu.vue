<script setup lang="ts">
import type { MenuItem } from '~/types/cafe'

const { info, byCategory } = useCafe()
const { t } = useI18n()
const { tx } = useLocaleText()
const localePath = useLocalePath()
const { addItem, count } = useCart()
const { isFavorite, toggleFavorite, trackView } = useMenuPrefs()
const toast = useToast()

useCafeSeo({
  title: () => `${t('menuPage.eyebrow')} — ${info.name}`,
  description: () => t('menuPage.lede'),
})

type Filter = 'all' | MenuItem['category']

const filter = ref<Filter>('all')
const query = ref('')
const selected = ref<MenuItem | null>(null)
const detailOpen = ref(false)

function openDetail(item: MenuItem) {
  selected.value = item
  detailOpen.value = true
  trackView(item.id)
}

function closeDetail() {
  detailOpen.value = false
}

function addFromDetail(item: MenuItem) {
  addToOrder(item)
  closeDetail()
}

const sections = computed(() => [
  { key: 'espresso' as const, title: t('menuPage.espressoTitle') },
  { key: 'brew' as const, title: t('menuPage.brewTitle') },
  { key: 'food' as const, title: t('menuPage.foodTitle') },
])

const filters = computed(() => [
  { key: 'all' as const, label: t('menuPage.all') },
  { key: 'espresso' as const, label: t('menuPage.espresso') },
  { key: 'brew' as const, label: t('menuPage.brew') },
  { key: 'food' as const, label: t('menuPage.food') },
])

function matchesQuery(item: MenuItem) {
  const q = query.value.trim().toLowerCase()
  if (!q) {
    return true
  }
  return (
    tx(item.name).toLowerCase().includes(q)
    || tx(item.description).toLowerCase().includes(q)
  )
}

const visibleSections = computed(() => {
  const base = filter.value === 'all'
    ? sections.value
    : sections.value.filter(section => section.key === filter.value)

  return base
    .map(section => ({
      ...section,
      items: byCategory(section.key).filter(matchesQuery),
    }))
    .filter(section => section.items.length > 0)
})

function addToOrder(item: MenuItem) {
  const name = tx(item.name)
  trackView(item.id)
  addItem(item, name)
  toast.success(t('menuPage.added', { name }))
}

function onToggleFavorite(item: MenuItem) {
  trackView(item.id)
  toggleFavorite(item.id)
  toast.success(
    isFavorite(item.id)
      ? t('menuPage.favorited', { name: tx(item.name) })
      : t('menuPage.unfavorited', { name: tx(item.name) }),
  )
}

function printMenu() {
  if (!import.meta.client) {
    return
  }
  const prevFilter = filter.value
  const prevQuery = query.value
  filter.value = 'all'
  query.value = ''
  nextTick(() => {
    window.print()
    filter.value = prevFilter
    query.value = prevQuery
  })
}
</script>

<template>
  <div class="section-space menu-page pb-28 sm:pb-[clamp(4.5rem,10vw,7.5rem)]">
    <div class="container-site">
      <div class="mb-6 max-w-xl">
        <h1 class="mb-2 text-[clamp(2.2rem,5vw,3.2rem)] leading-snug">
          {{ t('menuPage.title') }}
        </h1>
        <p class="text-mute print:hidden">
          {{ t('menuPage.lede') }}
        </p>
        <p class="mt-2 hidden text-sm text-mute print:block">
          {{ info.name }} · {{ info.address }}, {{ info.city }}
        </p>
      </div>

      <div class="print:hidden sticky top-[4rem] z-30 -mx-4 mb-8 border-b border-ink/5 bg-foam/95 px-4 py-3 backdrop-blur-md sm:mx-0 sm:rounded-sm sm:border sm:border-ink/10 sm:px-4">
        <label class="mb-3 block">
          <span class="sr-only">{{ t('menuPage.search') }}</span>
          <input
            v-model="query"
            type="search"
            name="menu-search"
            :placeholder="t('menuPage.searchPlaceholder')"
            class="w-full rounded-sm border border-ink/15 bg-foam px-3 py-2.5 text-sm outline-none transition focus:border-leaf"
          >
        </label>
        <div
          class="flex gap-2 overflow-x-auto pb-0.5"
          role="group"
          :aria-label="t('menuPage.categories')"
        >
          <button
            v-for="option in filters"
            :key="option.key"
            type="button"
            class="shrink-0 rounded-sm border px-3.5 py-2 text-sm transition"
            :class="filter === option.key
              ? 'border-ink bg-ink text-foam'
              : 'border-ink/15 text-mute hover:border-ink/40 hover:text-ink'"
            :aria-pressed="filter === option.key"
            @click="filter = option.key"
          >
            {{ option.label }}
          </button>
        </div>
      </div>

      <p
        v-if="!visibleSections.length"
        class="mb-8 text-mute print:hidden"
      >
        {{ t('menuPage.empty', { query }) }}
      </p>

      <section
        v-for="section in visibleSections"
        :key="section.key"
        class="mb-10"
      >
        <h2 class="mb-3 text-xl tracking-tight text-mute">
          {{ section.title }}
        </h2>
        <ul class="m-0 list-none divide-y divide-ink/10 border-y border-ink/10 p-0">
          <li
            v-for="item in section.items"
            :key="item.id"
            class="flex items-start justify-between gap-4 py-4"
          >
            <button
              type="button"
              class="min-w-0 flex-1 text-start print:pointer-events-none"
              @click="openDetail(item)"
            >
              <span class="mb-1 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <span class="font-display text-lg tracking-tight">
                  {{ tx(item.name) }}
                </span>
                <span class="shrink-0 text-sm font-medium tabular-nums">
                  {{ item.price }}
                </span>
              </span>
              <span class="block text-sm leading-relaxed text-mute">
                {{ tx(item.description) }}
              </span>
            </button>
            <button
              type="button"
              class="print:hidden mt-0.5 shrink-0 rounded-sm bg-ink px-4 py-2.5 text-sm font-medium text-foam transition hover:bg-roast"
              @click="addToOrder(item)"
            >
              {{ t('menuPage.add') }}
            </button>
          </li>
        </ul>
      </section>

      <div class="print:hidden flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-mute">
        <button
          type="button"
          class="underline-offset-2 hover:text-ink hover:underline"
          @click="printMenu"
        >
          {{ t('menuPage.print') }}
        </button>
        <a
          href="/allergen-card.pdf"
          class="underline-offset-2 hover:text-ink hover:underline"
          download
        >{{ t('menuPage.allergenPdf') }}</a>
      </div>
      <p class="mt-4 max-w-xl text-xs leading-relaxed text-mute">
        {{ t('menuPage.allergenNote') }}
      </p>
    </div>

    <div
      v-if="count"
      class="print:hidden fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-foam/95 p-3 backdrop-blur-md sm:hidden"
    >
      <BaseButton
        class="w-full"
        :to="localePath('/order')"
        variant="primary"
      >
        {{ t('menuPage.reviewOrder') }} ({{ count }})
      </BaseButton>
    </div>

    <div class="print:hidden container-site mt-8 hidden sm:block">
      <BaseButton
        :to="localePath('/order')"
        variant="primary"
      >
        {{ t('menuPage.reviewOrder') }}
        <template v-if="count">
          ({{ count }})
        </template>
      </BaseButton>
    </div>

    <MenuItemDetail
      :item="selected"
      :open="detailOpen"
      @close="closeDetail"
      @add="addFromDetail"
      @favorite="onToggleFavorite"
    />
  </div>
</template>
