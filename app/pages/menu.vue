<script setup lang="ts">
import type { MenuItem } from '~/types/cafe'

const { info, menu, byCategory } = useCafe()
const localePath = useLocalePath()
const { addItem } = useCart()
const toast = useToast()

useSeoMeta({
  title: `Menu — ${info.name}`,
  description: 'Espresso, brew bar, and kitchen plates at Solace Coffee.',
})

type Filter = 'all' | MenuItem['category']

const filter = ref<Filter>('all')
const query = ref('')

const sections = [
  { key: 'espresso' as const, title: 'Espresso bar', note: 'Milk alternatives available.' },
  { key: 'brew' as const, title: 'Brew bar', note: 'Ask for today’s origin card.' },
  { key: 'food' as const, title: 'Kitchen', note: 'Pastries bake through the morning.' },
]

const filters: { key: Filter, label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'espresso', label: 'Espresso' },
  { key: 'brew', label: 'Brew' },
  { key: 'food', label: 'Food' },
]

function matchesQuery(item: MenuItem) {
  const q = query.value.trim().toLowerCase()
  if (!q) {
    return true
  }
  return (
    item.name.toLowerCase().includes(q)
    || item.description.toLowerCase().includes(q)
    || item.category.includes(q)
  )
}

const visibleSections = computed(() => {
  const base = filter.value === 'all'
    ? sections
    : sections.filter(section => section.key === filter.value)

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
  addItem(item)
  toast.success(`${item.name} added to your bag`)
}
</script>

<template>
  <div class="section-space">
    <div class="container-site">
      <p class="eyebrow">
        Menu
      </p>
      <h1 class="mb-3 text-[clamp(2.4rem,6vw,3.5rem)]">
        What we’re pouring
      </h1>
      <p class="mb-8 max-w-xl text-mute">
        Search the board, filter by category, and add items to pickup.
      </p>

      <label class="mb-6 block max-w-md">
        <span class="mb-2 block text-sm font-medium">Search menu</span>
        <input
          v-model="query"
          type="search"
          name="menu-search"
          placeholder="Latte, pour over, toast…"
          class="w-full rounded-sm border border-ink/15 bg-foam px-3 py-3 text-sm outline-none transition focus:border-leaf"
        >
      </label>

      <div
        class="mb-10 flex flex-wrap gap-2"
        role="group"
        aria-label="Menu categories"
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
        No items match “{{ query }}”. Try another search.
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
                {{ item.name }}
              </h3>
              <p class="text-[0.92rem] text-mute">
                {{ item.description }}
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
              Add
            </BaseButton>
          </li>
        </ul>
      </section>

      <p class="text-sm text-mute">
        Showing {{ visibleCount }} of {{ menu.length }} items ·
        <NuxtLink
          :to="localePath('/order')"
          class="text-leaf underline-offset-2 hover:underline"
        >
          Review pickup order
        </NuxtLink>
      </p>
    </div>
  </div>
</template>
