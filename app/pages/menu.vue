<script setup lang="ts">
import type { DietaryTag, MenuItem } from '~/types/cafe'

const { info, menu, byCategory } = useCafe()
const { t } = useI18n()
const { tx } = useLocaleText()
const localePath = useLocalePath()
const { addItem, count, subtotalLabel, qtyMap, setQty } = useCart()
const { active, shortStatus, remainingLabel } = useActiveOrder()
const { favorites, recent, isFavorite, toggleFavorite, trackView } = useMenuPrefs()
const toast = useToast()

useCafeSeo({
  title: () => `${t('menuPage.eyebrow')} — ${info.name}`,
  description: () => t('menuPage.lede'),
})

type Filter = 'all' | MenuItem['category']

const filter = ref<Filter>('all')
const dietary = ref<'all' | DietaryTag>('all')
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

function printMenu() {
  if (import.meta.client) {
    window.print()
  }
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

const dietaryFilters = computed(() => [
  { key: 'all' as const, label: t('menuPage.dietaryAll') },
  { key: 'vegan' as const, label: t('menuPage.tags.vegan') },
  { key: 'vegetarian' as const, label: t('menuPage.tags.vegetarian') },
  { key: 'gf' as const, label: t('menuPage.tags.gf') },
  { key: 'dairy-free' as const, label: t('menuPage.tags.dairy-free') },
])

function itemById(id: string) {
  return menu.find(entry => entry.id === id)
}

const favoriteItems = computed(() =>
  favorites.value.map(itemById).filter((item): item is MenuItem => !!item),
)

const recentItems = computed(() =>
  recent.value.map(itemById).filter((item): item is MenuItem => !!item),
)

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

function matchesDietary(item: MenuItem) {
  if (dietary.value === 'all') {
    return true
  }
  return item.dietary?.includes(dietary.value) ?? false
}

const visibleSections = computed(() => {
  const base = filter.value === 'all'
    ? sections.value
    : sections.value.filter(section => section.key === filter.value)

  return base
    .map(section => ({
      ...section,
      items: byCategory(section.key).filter(item => matchesQuery(item) && matchesDietary(item)),
    }))
    .filter(section => section.items.length > 0)
})

const visibleCount = computed(() =>
  visibleSections.value.reduce((sum, section) => sum + section.items.length, 0),
)

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
      <header class="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div class="max-w-2xl">
          <p class="eyebrow">
            {{ t('menuPage.eyebrow') }}
          </p>
          <h1 class="mb-2 font-display text-[clamp(2.3rem,5vw,3.2rem)] leading-[1.05] tracking-tight">
            {{ t('menuPage.title') }}
          </h1>
          <p class="text-mute">
            {{ t('menuPage.lede') }}
          </p>
        </div>
        <button
          type="button"
          class="print:hidden inline-flex items-center rounded-sm border border-ink/15 px-4 py-2.5 text-sm font-medium transition hover:border-ink/30"
          @click="printMenu"
        >
          {{ t('menuPage.print') }}
        </button>
      </header>

      <div class="print:hidden sticky top-[4rem] z-30 mb-6 border border-ink/10 bg-foam/95 shadow-sm backdrop-blur-md">
        <div class="flex flex-col gap-3 p-3 sm:p-3.5">
          <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
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
          <div
            class="flex gap-1 overflow-x-auto"
            role="group"
            :aria-label="t('menuPage.dietary')"
          >
            <button
              v-for="option in dietaryFilters"
              :key="option.key"
              type="button"
              class="shrink-0 rounded-sm border px-2.5 py-1.5 text-xs transition"
              :class="dietary === option.key
                ? 'border-ink bg-ink text-foam'
                : 'border-ink/10 text-mute hover:border-ink/25 hover:text-ink'"
              @click="dietary = option.key"
            >
              {{ option.label }}
            </button>
          </div>
        </div>
      </div>

      <p class="print:hidden mb-6 text-xs text-mute">
        {{ t('menuPage.showing', { visible: visibleCount, total: menu.length }) }}
      </p>

      <section
        v-if="favoriteItems.length || recentItems.length"
        class="print:hidden mb-10"
      >
        <p class="mb-3 text-xs font-medium uppercase tracking-wide text-mute">
          {{ t('menuPage.prefs') }}
        </p>
        <div
          v-if="favoriteItems.length"
          class="mb-5"
        >
          <h2 class="mb-3 font-display text-lg tracking-tight">
            {{ t('menuPage.favorites', { count: favoriteItems.length }) }}
          </h2>
          <ul class="m-0 flex list-none gap-2 overflow-x-auto p-0 pb-1">
            <li
              v-for="item in favoriteItems"
              :key="`fav-${item.id}`"
              class="min-w-[11rem] shrink-0 border border-ink/10 bg-foam"
            >
              <button
                type="button"
                class="w-full px-3 py-3 text-start"
                @click="openDetail(item)"
              >
                <span class="block truncate font-medium">{{ tx(item.name) }}</span>
                <span class="text-sm text-leaf">{{ item.price }}</span>
              </button>
            </li>
          </ul>
        </div>
        <div v-if="recentItems.length">
          <h2 class="mb-3 font-display text-lg tracking-tight">
            {{ t('menuPage.recent') }}
          </h2>
          <ul class="m-0 flex list-none gap-2 overflow-x-auto p-0 pb-1">
            <li
              v-for="item in recentItems"
              :key="`recent-${item.id}`"
              class="min-w-[11rem] shrink-0 border border-ink/10 bg-mist/40"
            >
              <button
                type="button"
                class="w-full px-3 py-3 text-start"
                @click="openDetail(item)"
              >
                <span class="block truncate font-medium">{{ tx(item.name) }}</span>
                <span class="text-sm text-leaf">{{ item.price }}</span>
              </button>
            </li>
          </ul>
        </div>
      </section>

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
          <template v-if="active">
            <p class="flex items-center gap-2 font-medium text-ink">
              <span
                class="order-live-dot h-2 w-2 shrink-0 rounded-full bg-leaf"
                aria-hidden="true"
              />
              {{ t('menuPage.activeTicket', { status: shortStatus }) }}
            </p>
            <p class="truncate text-mute">
              {{ remainingLabel }}
            </p>
          </template>
          <template v-else>
            <p class="font-medium text-ink">
              {{ count ? t('menuPage.bagSummary', { count, total: subtotalLabel }) : t('menuPage.bagEmpty') }}
            </p>
            <p class="truncate text-mute">
              {{ info.name }} · {{ t('order.eyebrow') }}
            </p>
          </template>
        </div>
        <BaseButton
          :to="localePath('/order')"
          :variant="active || count ? 'primary' : 'ink'"
          :class="active || count ? '' : 'opacity-80'"
        >
          {{ active
            ? t('menuPage.viewTicket')
            : count
              ? t('menuPage.reviewOrder')
              : t('menuPage.goOrder') }}
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
