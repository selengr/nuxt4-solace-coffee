<script setup lang="ts">
const { info, byCategory } = useCafe()

useSeoMeta({
  title: `Menu — ${info.name}`,
  description: 'Espresso, brew bar, and simple food at Northroom.',
})

const sections = [
  { key: 'espresso' as const, title: 'Espresso bar' },
  { key: 'brew' as const, title: 'Brew bar' },
  { key: 'food' as const, title: 'Kitchen' },
]
</script>

<template>
  <div class="page section">
    <div class="container">
      <p class="eyebrow">
        Menu
      </p>
      <h1>What we’re pouring</h1>
      <p class="lede">
        A compact specialty menu — swap items in <code>app/data/menu.ts</code>.
      </p>

      <section
        v-for="section in sections"
        :key="section.key"
        class="menu-block"
      >
        <h2>{{ section.title }}</h2>
        <ul>
          <li
            v-for="item in byCategory(section.key)"
            :key="item.id"
          >
            <div>
              <h3>{{ item.name }}</h3>
              <p>{{ item.description }}</p>
            </div>
            <span>{{ item.price }}</span>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<style scoped>
.page h1 {
  font-size: clamp(2.4rem, 6vw, 3.5rem);
  margin-bottom: 0.75rem;
}

.lede {
  color: var(--color-muted);
  margin-bottom: 3rem;
  max-width: 36rem;
}

.lede code {
  font-size: 0.85em;
  background: var(--color-stone);
  padding: 0.1rem 0.35rem;
  border-radius: 0.25rem;
}

.menu-block {
  margin-bottom: 2.75rem;
}

.menu-block h2 {
  font-size: 1.6rem;
  margin-bottom: 1rem;
  padding-bottom: 0.65rem;
  border-bottom: 1px solid rgb(26 23 20 / 0.12);
}

.menu-block ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.menu-block li {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1rem;
  padding: 1.1rem 0;
  border-bottom: 1px solid rgb(26 23 20 / 0.08);
}

.menu-block h3 {
  font-size: 1.15rem;
  margin-bottom: 0.3rem;
}

.menu-block p {
  color: var(--color-muted);
  font-size: 0.92rem;
}

.menu-block span {
  font-weight: 500;
  white-space: nowrap;
}
</style>
