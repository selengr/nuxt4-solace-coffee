<script setup lang="ts">
import type { DietaryTag, MenuItem } from '~/types/cafe'

const { info, menu, byCategory } = useCafe()
const { t } = useI18n()
const { tx } = useLocaleText()
const localePath = useLocalePath()
const { addItem } = useCart()
const { favorites, recent, isFavorite, toggleFavorite, trackView } = useMenuPrefs()
const toast = useToast()

useSeoMeta({
  title: () => `${t('menuPage.eyebrow')} — ${info.name}`,
  description: () => t('menuPage.lede'),
})

type Filter = 'all' | MenuItem['category']
type DietFilter = 'all' | DietaryTag
type PrefsFilter = 'all' | 'favorites' | 'recent'

const filter = ref<Filter>('all')
const dietFilter = ref<DietFilter>('all')
const prefsFilter = ref<PrefsFilter>('all')
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
  { key: 'espresso' as const, title: t('menuPage.espressoTitle'), note: t('menuPage.espressoNote') },
  { key: 'brew' as const, title: t('menuPage.brewTitle'), note: t('menuPage.brewNote') },
  { key: 'food' as const, title: t('menuPage.foodTitle'), note: t('menuPage.foodNote') },
])

const filters = computed(() => [
  { key: 'all' as const, label: t('menuPage.all') },
  { key: 'espresso' as const, label: t('menuPage.espresso') },
  { key: 'brew' as const, label: t('menuPage.brew') },
  { key: 'food' as const, label: t('menuPage.food') },
])

const dietFilters = computed(() => [
  { key: 'all' as const, label: t('menuPage.dietaryAll') },
  { key: 'vegan' as const, label: t('menuPage.tags.vegan') },
  { key: 'vegetarian' as const, label: t('menuPage.tags.vegetarian') },
  { key: 'gf' as const, label: t('menuPage.tags.gf') },
  { key: 'dairy-free' as const, label: t('menuPage.tags.dairy-free') },
  { key: 'nuts' as const, label: t('menuPage.tags.nuts') },
])

const prefsFilters = computed(() => [
  { key: 'all' as const, label: t('menuPage.prefsAll') },
  { key: 'favorites' as const, label: t('menuPage.favorites', { count: favorites.value.length }) },
  { key: 'recent' as const, label: t('menuPage.recent') },
])

function matchesQuery(item: MenuItem) {
  const q = query.value.trim().toLowerCase()
  if (!q) {
    return true
  }
  return (
    tx(item.name).toLowerCase().includes(q)
    || tx(item.description).toLowerCase().includes(q)
    || item.category.includes(q)
  )
}

function matchesDiet(item: MenuItem) {
  if (dietFilter.value === 'all') {
    return true
  }
  return item.dietary?.includes(dietFilter.value) ?? false
}

function matchesPrefs(item: MenuItem) {
  if (prefsFilter.value === 'favorites') {
    return favorites.value.includes(item.id)
  }
  if (prefsFilter.value === 'recent') {
    return recent.value.includes(item.id)
  }
  return true
}

const visibleSections = computed(() => {
  const base = filter.value === 'all'
    ? sections.value
    : sections.value.filter(section => section.key === filter.value)

  return base
    .map(section => ({
      ...section,
      items: byCategory(section.key).filter(item =>
        matchesQuery(item) && matchesDiet(item) && matchesPrefs(item),
      ),
    }))
    .filter(section => section.items.length > 0)
})

const visibleCount = computed(() =>
  visibleSections.value.reduce((sum, section) => sum + section.items.length, 0),
)

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
  if (import.meta.client) {
    window.print()
  }
}
</script>

<template>
  <div class="section-space menu-page">
    <div class="container-site">
      <div class="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p class="eyebrow">
            {{ t('menuPage.eyebrow') }}
          </p>
          <h1 class="mb-3 text-[clamp(2.4rem,6vw,3.5rem)]">
            {{ t('menuPage.title') }}
          </h1>
          <p class="max-w-xl text-mute print:hidden">
            {{ t('menuPage.lede') }}
          </p>
        </div>
        <BaseButton
          class="print:hidden"
          type="button"
          variant="ink"
          @click="printMenu"
        >
          {{ t('menuPage.print') }}
        </BaseButton>
      </div>

      <label class="mb-6 block max-w-md print:hidden">
        <span class="mb-2 block text-sm font-medium">{{ t('menuPage.search') }}</span>
        <input
          v-model="query"
          type="search"
          name="menu-search"
          :placeholder="t('menuPage.searchPlaceholder')"
          class="w-full rounded-sm border border-ink/15 bg-foam px-3 py-3 text-sm outline-none transition focus:border-leaf"
        >
      </label>

      <div
        class="mb-4 flex flex-wrap gap-2 print:hidden"
        role="group"
        :aria-label="t('menuPage.prefs')"
      >
        <button
          v-for="option in prefsFilters"
          :key="option.key"
          type="button"
          class="rounded-sm border px-3 py-2 text-sm transition"
          :class="prefsFilter === option.key
            ? 'border-brass bg-brass/10 text-ink'
            : 'border-ink/15 text-mute hover:border-ink/40 hover:text-ink'"
          :aria-pressed="prefsFilter === option.key"
          @click="prefsFilter = option.key"
        >
          {{ option.label }}
        </button>
      </div>

      <div
        class="mb-4 flex flex-wrap gap-2 print:hidden"
        role="group"
        :aria-label="t('menuPage.categories')"
      >
        <button
          v-for="option in filters"
          :key="option.key"
          type="button"
          class="rounded-sm border px-3 py-2 text-sm transition"
          :class="filter === option.key
            ? 'border-ink bg-ink text-foam'
            : 'border-ink/15 text-mute hover:border-ink/40 hover:text-ink'"
          :aria-pressed="filter === option.key"
          @click="filter = option.key"
        >
          {{ option.label }}
        </button>
      </div>

      <div
        class="mb-10 flex flex-wrap gap-2 print:hidden"
        role="group"
        :aria-label="t('menuPage.dietary')"
      >
        <button
          v-for="option in dietFilters"
          :key="option.key"
          type="button"
          class="rounded-sm border px-3 py-2 text-sm transition"
          :class="dietFilter === option.key
            ? 'border-leaf bg-leaf/10 text-leaf'
            : 'border-ink/15 text-mute hover:border-ink/40 hover:text-ink'"
          :aria-pressed="dietFilter === option.key"
          @click="dietFilter = option.key"
        >
          {{ option.label }}
        </button>
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
        class="mb-12"
      >
        <div class="mb-4 flex flex-wrap items-end justify-between gap-3 border-b border-ink/10 pb-3">
          <h2 class="text-[1.6rem]">
            {{ section.title }}
          </h2>
          <p class="text-sm text-mute">
            {{ section.note }}
          </p>
        </div>
        <ul class="m-0 list-none p-0">
          <li
            v-for="item in section.items"
            :key="item.id"
            class="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-ink/[0.08] py-4"
          >
            <div>
              <h3 class="mb-1 text-[1.15rem]">
                <button
                  type="button"
                  class="text-start transition hover:text-leaf"
                  @click="openDetail(item)"
                >
                  {{ tx(item.name) }}
                </button>
              </h3>
              <p class="text-[0.92rem] text-mute">
                {{ tx(item.description) }}
              </p>
              <DietaryTags :tags="item.dietary" />
              <p class="mt-2 text-sm font-medium">
                {{ item.price }}
              </p>
              <button
                type="button"
                class="mt-2 text-xs text-leaf underline-offset-2 hover:underline print:hidden"
                @click="openDetail(item)"
              >
                {{ t('menuPage.viewDetails') }}
              </button>
            </div>
            <div class="flex flex-col gap-2 print:hidden sm:flex-row">
              <button
                type="button"
                class="inline-flex h-11 min-w-11 items-center justify-center rounded-sm border border-ink/15 text-sm transition hover:border-ink/30"
                :class="isFavorite(item.id) ? 'border-brass/40 bg-brass/10 text-ink' : 'text-mute'"
                :aria-pressed="isFavorite(item.id)"
                :aria-label="isFavorite(item.id) ? t('menuPage.unfavoriteAria', { name: tx(item.name) }) : t('menuPage.favoriteAria', { name: tx(item.name) })"
                @click="onToggleFavorite(item)"
              >
                ★
              </button>
              <BaseButton
                type="button"
                variant="ink"
                @click="addToOrder(item)"
              >
                {{ t('menuPage.add') }}
              </BaseButton>
            </div>
          </li>
        </ul>
      </section>

      <p class="mb-4 max-w-2xl text-sm leading-relaxed text-mute">
        {{ t('menuPage.allergenNote') }}
        <a
          href="/allergen-card.pdf"
          class="ms-1 text-leaf underline-offset-2 hover:underline"
          download
        >{{ t('menuPage.allergenPdf') }}</a>
        ·
        <NuxtLink
          :to="localePath('/care')"
          class="text-leaf underline-offset-2 hover:underline"
        >
          {{ t('menuPage.careLink') }}
        </NuxtLink>
      </p>

      <p class="text-sm text-mute print:hidden">
        {{ t('menuPage.showing', { visible: visibleCount, total: menu.length }) }} ·
        <NuxtLink
          :to="localePath('/order')"
          class="text-leaf underline-offset-2 hover:underline"
        >
          {{ t('menuPage.reviewOrder') }}
        </NuxtLink>
      </p>
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
