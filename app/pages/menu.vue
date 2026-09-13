<script setup lang="ts">
import type { MenuItem } from '~/types/cafe'

const { info, byCategory } = useCafe()
const { t } = useI18n()
const { tx } = useLocaleText()
const localePath = useLocalePath()
const { addItem, count, subtotalLabel, qtyMap, setQty } = useCart()
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

function addToOrder(item: MenuItem, event?: Event) {
  event?.stopPropagation()
  const name = tx(item.name)
  trackView(item.id)
  addItem(item, name)
  toast.success(t('menuPage.added', { name }))
}

function qtyOf(id: string) {
  return qtyMap.value[id] ?? 0
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
</script>

<template>
  <div class="menu-page section-space pb-40 sm:pb-36">
    <div class="container-site">
      <header class="mb-8 max-w-2xl">
        <p class="eyebrow">
          {{ t('menuPage.eyebrow') }}
        </p>
        <h1 class="mb-2 font-display text-[clamp(2.3rem,5vw,3.2rem)] leading-[1.05] tracking-tight">
          {{ t('menuPage.title') }}
        </h1>
        <p class="text-mute">
          {{ t('menuPage.lede') }}
        </p>
      </header>

      <div class="print:hidden sticky top-[4rem] z-30 mb-8 border border-ink/10 bg-foam/95 shadow-sm backdrop-blur-md">
        <div class="flex flex-col gap-3 p-3 sm:flex-row sm:items-center sm:gap-4 sm:p-3.5">
          <label class="block min-w-0 flex-1">
            <span class="sr-only">{{ t('menuPage.search') }}</span>
            <input
              v-model="query"
              type="search"
              name="menu-search"
              :placeholder="t('menuPage.searchPlaceholder')"
              class="w-full rounded-sm border border-ink/15 bg-mist/50 px-3 py-2.5 text-sm outline-none transition focus:border-leaf focus:bg-foam"
            >
          </label>
          <div
            class="flex gap-1 overflow-x-auto sm:shrink-0"
            role="tablist"
            :aria-label="t('menuPage.categories')"
          >
            <button
              v-for="option in filters"
              :key="option.key"
              type="button"
              role="tab"
              class="shrink-0 rounded-sm px-3 py-2 text-sm transition"
              :class="filter === option.key
                ? 'bg-ink text-foam'
                : 'bg-mist text-mute hover:text-ink'"
              :aria-selected="filter === option.key"
              @click="filter = option.key"
            >
              {{ option.label }}
            </button>
          </div>
        </div>
      </div>

      <p
        v-if="!visibleSections.length"
        class="mb-8 text-mute"
      >
        {{ t('menuPage.empty', { query }) }}
      </p>

      <section
        v-for="section in visibleSections"
        :key="section.key"
        class="mb-12"
      >
        <h2 class="mb-5 font-display text-xl tracking-tight text-ink">
          {{ section.title }}
        </h2>

        <ul class="m-0 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
          <li
            v-for="item in section.items"
            :key="item.id"
            class="flex flex-col overflow-hidden border border-ink/10 bg-foam transition hover:border-ink/25"
          >
            <button
              type="button"
              class="relative block aspect-[4/3] w-full overflow-hidden bg-[#2a221c] text-start"
              :aria-label="tx(item.name)"
              @click="openDetail(item)"
            >
              <img
                v-if="item.image"
                :src="item.image"
                :alt="tx(item.name)"
                width="640"
                height="480"
                loading="lazy"
                decoding="async"
                class="h-full w-full object-cover transition duration-500 hover:scale-[1.03]"
              >
              <span
                v-if="qtyOf(item.id)"
                class="absolute end-2 top-2 rounded-sm bg-leaf px-2 py-1 text-[0.7rem] font-medium text-foam"
              >
                {{ t('menuPage.inBag', { count: qtyOf(item.id) }) }}
              </span>
            </button>

            <div class="flex flex-1 flex-col p-4">
              <div class="mb-1 flex items-start justify-between gap-3">
                <button
                  type="button"
                  class="min-w-0 text-start"
                  @click="openDetail(item)"
                >
                  <span class="font-display text-lg leading-snug tracking-tight">
                    {{ tx(item.name) }}
                  </span>
                </button>
                <span class="shrink-0 pt-0.5 text-sm font-medium tabular-nums text-leaf">
                  {{ item.price }}
                </span>
              </div>
              <p class="mb-3 line-clamp-2 flex-1 text-sm leading-relaxed text-mute">
                {{ tx(item.description) }}
              </p>
              <DietaryTags :tags="item.dietary" />

              <div class="mt-4 flex items-center gap-2">
                <template v-if="qtyOf(item.id)">
                  <div class="flex flex-1 items-center justify-between rounded-sm border border-ink/15">
                    <button
                      type="button"
                      class="grid h-11 w-11 place-items-center text-lg transition hover:bg-mist"
                      :aria-label="t('order.decrease', { name: tx(item.name) })"
                      @click="setQty(item.id, qtyOf(item.id) - 1)"
                    >
                      −
                    </button>
                    <span class="text-sm font-medium tabular-nums">
                      {{ qtyOf(item.id) }}
                    </span>
                    <button
                      type="button"
                      class="grid h-11 w-11 place-items-center text-lg transition hover:bg-mist"
                      :aria-label="t('order.increase', { name: tx(item.name) })"
                      @click="addToOrder(item, $event)"
                    >
                      +
                    </button>
                  </div>
                </template>
                <button
                  v-else
                  type="button"
                  class="relative z-10 flex h-11 flex-1 items-center justify-center rounded-sm bg-ink text-sm font-medium text-foam transition hover:bg-roast"
                  @click="addToOrder(item, $event)"
                >
                  {{ t('menuPage.add') }}
                </button>
              </div>
            </div>
          </li>
        </ul>
      </section>

      <p class="max-w-xl text-xs leading-relaxed text-mute">
        {{ t('menuPage.allergenNote') }}
        <a
          href="/allergen-card.pdf"
          class="ms-1 underline-offset-2 hover:underline"
          download
        >{{ t('menuPage.allergenPdf') }}</a>
      </p>
    </div>

    <div
      class="print:hidden pointer-events-none fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-foam/95 p-3 backdrop-blur-md"
    >
      <div class="pointer-events-auto container-site flex items-center justify-between gap-3">
        <div class="min-w-0 text-sm">
          <p class="font-medium text-ink">
            {{ count ? t('menuPage.bagSummary', { count, total: subtotalLabel }) : t('menuPage.bagEmpty') }}
          </p>
          <p class="truncate text-mute">
            {{ info.name }} · {{ t('order.eyebrow') }}
          </p>
        </div>
        <BaseButton
          :to="localePath('/order')"
          :variant="count ? 'primary' : 'ink'"
          :class="count ? '' : 'opacity-80'"
        >
          {{ count ? t('menuPage.reviewOrder') : t('menuPage.goOrder') }}
        </BaseButton>
      </div>
    </div>

    <MenuItemDetail
      :item="selected"
      :open="detailOpen"
      @close="closeDetail"
      @favorite="onToggleFavorite"
    />
  </div>
</template>
