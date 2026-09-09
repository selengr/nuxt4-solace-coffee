<script setup lang="ts">
import type { MenuItem } from '~/types/cafe'

const { info, menu, byCategory } = useCafe()
const { t } = useI18n()
const { tx } = useLocaleText()
const localePath = useLocalePath()
const { addItem } = useCart()
const toast = useToast()

useSeoMeta({
  title: () => `${t('menuPage.eyebrow')} — ${info.name}`,
  description: () => t('menuPage.lede'),
})

type Filter = 'all' | MenuItem['category']

const filter = ref<Filter>('all')
const query = ref('')

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

const visibleCount = computed(() =>
  visibleSections.value.reduce((sum, section) => sum + section.items.length, 0),
)

function addToOrder(item: MenuItem) {
  const name = tx(item.name)
  addItem(item, name)
  toast.success(t('menuPage.added', { name }))
}
</script>

<template>
  <div class="section-space">
    <div class="container-site">
      <p class="eyebrow">
        {{ t('menuPage.eyebrow') }}
      </p>
      <h1 class="mb-3 text-[clamp(2.4rem,6vw,3.5rem)]">
        {{ t('menuPage.title') }}
      </h1>
      <p class="mb-8 max-w-xl text-mute">
        {{ t('menuPage.lede') }}
      </p>

      <label class="mb-6 block max-w-md">
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
        class="mb-10 flex flex-wrap gap-2"
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
                {{ tx(item.name) }}
              </h3>
              <p class="text-[0.92rem] text-mute">
                {{ tx(item.description) }}
              </p>
              <p class="mt-2 text-sm font-medium">
                {{ item.price }}
              </p>
            </div>
            <BaseButton
              type="button"
              variant="ink"
              @click="addToOrder(item)"
            >
              {{ t('menuPage.add') }}
            </BaseButton>
          </li>
        </ul>
      </section>

      <p class="text-sm text-mute">
        {{ t('menuPage.showing', { visible: visibleCount, total: menu.length }) }} ·
        <NuxtLink
          :to="localePath('/order')"
          class="text-leaf underline-offset-2 hover:underline"
        >
          {{ t('menuPage.reviewOrder') }}
        </NuxtLink>
      </p>
    </div>
  </div>
</template>
