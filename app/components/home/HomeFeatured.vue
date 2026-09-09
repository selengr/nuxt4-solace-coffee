<script setup lang="ts">
const { featured } = useCafe()
</script>

<template>
  <section class="section featured">
    <div class="container">
      <div class="featured__head">
        <div>
          <p class="eyebrow">
            On the bar
          </p>
          <h2>Featured pours & plates</h2>
        </div>
        <BaseButton to="/menu">
          Full menu
        </BaseButton>
      </div>

      <ul class="featured__grid">
        <li
          v-for="item in featured"
          :key="item.id"
          class="card"
        >
          <p class="card__category">
            {{ item.category }}
          </p>
          <h3>{{ item.name }}</h3>
          <p class="card__desc">
            {{ item.description }}
          </p>
          <p class="card__price">
            {{ item.price }}
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.featured__head {
  display: flex;
  flex-wrap: wrap;
  align-items: end;
  justify-content: space-between;
  gap: 1.25rem;
  margin-bottom: 2.5rem;
}

.featured__head h2 {
  font-size: clamp(2rem, 4vw, 2.75rem);
  max-width: 14ch;
}

.featured__grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 1.25rem;
}

.card {
  padding: 1.5rem 0;
  border-top: 1px solid rgb(26 23 20 / 0.1);
}

.card__category {
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-muted);
  margin-bottom: 0.55rem;
}

.card h3 {
  font-size: 1.45rem;
  margin-bottom: 0.45rem;
}

.card__desc {
  color: var(--color-muted);
  font-size: 0.95rem;
  max-width: 34rem;
  margin-bottom: 0.85rem;
}

.card__price {
  font-weight: 500;
  font-size: 0.95rem;
}

@media (min-width: 768px) {
  .featured__grid {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2.5rem;
  }
}
</style>
