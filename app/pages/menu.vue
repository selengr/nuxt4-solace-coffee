<script setup lang="ts">
const { info, byCategory } = useCafe()

useSeoMeta({
  title: `Menu — ${info.name}`,
  description: 'Espresso, brew bar, and kitchen plates at Solace Coffee.',
})

const sections = [
  { key: 'espresso' as const, title: 'Espresso bar', note: 'Milk alternatives available.' },
  { key: 'brew' as const, title: 'Brew bar', note: 'Ask for today’s origin card.' },
  { key: 'food' as const, title: 'Kitchen', note: 'Pastries bake through the morning.' },
]
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
      <p class="mb-12 max-w-xl text-mute">
        A focused specialty menu. Edit items in
        <code class="rounded bg-stone px-1.5 py-0.5 text-sm">app/data/menu.ts</code>.
      </p>

      <section
        v-for="section in sections"
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
            class="grid grid-cols-[1fr_auto] gap-4 border-b border-ink/[0.08] py-4"
          >
            <div>
              <h3 class="mb-1 text-[1.15rem]">
                {{ item.name }}
              </h3>
              <p class="text-[0.92rem] text-mute">
                {{ item.description }}
              </p>
            </div>
            <span class="whitespace-nowrap font-medium">{{ item.price }}</span>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
