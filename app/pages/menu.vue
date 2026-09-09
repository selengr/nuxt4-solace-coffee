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

const visibleSections = computed(() =>
  filter.value === 'all'
    ? sections
    : sections.filter(section => section.key === filter.value),
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
        A focused specialty menu. Add items to pickup, or browse by category.
      </p>

      <div class="mb-10 flex flex-wrap gap-2">
        <button
          v-for="option in filters"
          :key="option.key"
          type="button"
          class="rounded-sm border px-3 py-2 text-sm transition"
          :class="filter === option.key
            ? 'border-ink bg-ink text-foam'
            : 'border-ink/15 text-mute hover:border-ink/40 hover:text-ink'"
          @click="filter = option.key"
        >
          {{ option.label }}
        </button>
      </div>

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
            v-for="item in byCategory(section.key)"
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
        {{ menu.length }} items ·
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
