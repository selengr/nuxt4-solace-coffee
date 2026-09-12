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
  <div class="menu-page section-space pb-28 sm:pb-[clamp(4.5rem,10vw,7.5rem)]">
    <div class="container-site max-w-4xl">
      <header class="mb-10 border-b border-ink/10 pb-8 text-center sm:text-start">
        <p class="eyebrow mb-3">
          {{ info.name }}
        </p>
        <h1 class="mb-3 font-display text-[clamp(2.4rem,5.5vw,3.4rem)] leading-[1.05] tracking-tight">
          {{ t('menuPage.title') }}
        </h1>
        <p class="mx-auto max-w-lg text-mute print:hidden sm:mx-0">
          {{ t('menuPage.lede') }}
        </p>
        <p class="mt-2 hidden text-sm text-mute print:block">
          {{ info.address }}, {{ info.city }}
        </p>
      </header>

      <div class="print:hidden sticky top-[4rem] z-30 mb-10 border border-ink/10 bg-foam/95 p-3 backdrop-blur-md sm:p-4">
        <label class="mb-3 block">
          <span class="sr-only">{{ t('menuPage.search') }}</span>
          <input
            v-model="query"
            type="search"
            name="menu-search"
            :placeholder="t('menuPage.searchPlaceholder')"
            class="w-full rounded-sm border border-ink/15 bg-mist/40 px-3 py-2.5 text-sm outline-none transition focus:border-leaf focus:bg-foam"
          >
        </label>
        <div
          class="flex gap-2 overflow-x-auto"
          role="tablist"
          :aria-label="t('menuPage.categories')"
        >
          <button
            v-for="option in filters"
            :key="option.key"
            type="button"
            role="tab"
            class="shrink-0 border-b-2 px-3 py-2 text-sm tracking-wide transition"
            :class="filter === option.key
              ? 'border-ink font-medium text-ink'
              : 'border-transparent text-mute hover:text-ink'"
            :aria-selected="filter === option.key"
            @click="filter = option.key"
          >
            {{ option.label }}
          </button>
        </div>
      </div>

      <p
        v-if="!visibleSections.length"
        class="mb-8 text-center text-mute print:hidden"
      >
        {{ t('menuPage.empty', { query }) }}
      </p>

      <section
        v-for="section in visibleSections"
        :key="section.key"
        class="mb-14"
      >
        <div class="mb-6 flex items-end gap-4">
          <h2 class="shrink-0 font-display text-[1.35rem] tracking-[0.04em] uppercase text-ink">
            {{ section.title }}
          </h2>
          <span
            class="mb-2 h-px min-w-[2rem] flex-1 bg-ink/15"
            aria-hidden="true"
          />
        </div>

        <ul class="m-0 list-none space-y-0 p-0">
          <li
            v-for="item in section.items"
            :key="item.id"
            class="group border-b border-ink/[0.07] py-5 first:pt-0 last:border-b-0"
          >
            <div class="flex gap-4 sm:gap-5">
              <button
                v-if="item.image"
                type="button"
                class="print:hidden relative hidden h-20 w-20 shrink-0 overflow-hidden bg-[#2a221c] sm:block"
                :aria-label="tx(item.name)"
                @click="openDetail(item)"
              >
                <img
                  :src="item.image"
                  :alt=""
                  width="160"
                  height="160"
                  loading="lazy"
                  decoding="async"
                  class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                >
              </button>

              <div class="min-w-0 flex-1">
                <div class="flex items-start gap-3">
                  <button
                    type="button"
                    class="min-w-0 flex-1 text-start print:pointer-events-none"
                    @click="openDetail(item)"
                  >
                    <span class="menu-item-row flex items-baseline gap-2">
                      <span class="font-display text-[1.15rem] tracking-tight text-ink transition group-hover:text-leaf sm:text-[1.25rem]">
                        {{ tx(item.name) }}
                      </span>
                      <span
                        class="menu-item-dots hidden min-w-[1.5rem] flex-1 sm:block"
                        aria-hidden="true"
                      />
                      <span class="shrink-0 font-medium tabular-nums text-ink">
                        {{ item.price }}
                      </span>
                    </span>
                    <span class="mt-1.5 block max-w-xl text-sm leading-relaxed text-mute">
                      {{ tx(item.description) }}
                    </span>
                  </button>

                  <button
                    type="button"
                    class="print:hidden shrink-0 self-start border border-ink/15 px-3.5 py-2 text-xs font-medium uppercase tracking-[0.08em] text-ink transition hover:border-ink hover:bg-ink hover:text-foam"
                    @click="addToOrder(item)"
                  >
                    {{ t('menuPage.add') }}
                  </button>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </section>

      <footer class="print:hidden border-t border-ink/10 pt-8">
        <div class="mb-6 flex flex-wrap items-center justify-between gap-4">
          <BaseButton
            :to="localePath('/order')"
            variant="ink"
          >
            {{ t('menuPage.reviewOrder') }}
            <template v-if="count">
              · {{ count }}
            </template>
          </BaseButton>
          <div class="flex flex-wrap gap-4 text-sm text-mute">
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
        </div>
        <p class="max-w-xl text-xs leading-relaxed text-mute">
          {{ t('menuPage.allergenNote') }}
        </p>
      </footer>
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
        {{ t('menuPage.reviewOrder') }} · {{ count }}
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

<style scoped>
.menu-item-dots {
  border-bottom: 1px dotted rgb(20 17 15 / 0.28);
  transform: translateY(-0.35em);
}

@media print {
  .menu-item-dots {
    display: block !important;
  }
}
</style>
