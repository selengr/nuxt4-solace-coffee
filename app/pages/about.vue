<script setup lang="ts">
const { info } = useCafe()

useSeoMeta({
  title: `About — ${info.name}`,
  description: 'The story behind Northroom specialty coffee.',
})
</script>

<template>
  <div class="page section">
    <div class="container about">
      <div>
        <p class="eyebrow">
          About
        </p>
        <h1>Built for better mornings.</h1>
        <p>
          {{ info.name }} began as a small counter with one espresso machine and
          a stubborn belief that coffee shops should feel calm — not rushed,
          not loud for the sake of it.
        </p>
        <p>
          We roast relationships first: rotating microlots, dialed recipes, and
          a short food list that pairs with what’s in the cup.
        </p>
      </div>
      <aside>
        <img
          src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80"
          alt="Warm café interior with wooden tables and soft light"
          width="1200"
          height="800"
        >
      </aside>
    </div>
  </div>
</template>

<style scoped>
.about {
  display: grid;
  gap: 2.5rem;
  align-items: center;
}

.about h1 {
  font-size: clamp(2.4rem, 6vw, 3.4rem);
  margin-bottom: 1.25rem;
  max-width: 12ch;
}

.about p {
  color: var(--color-muted);
  margin-bottom: 1rem;
  max-width: 36rem;
}

.about img {
  width: 100%;
  height: min(28rem, 70vw);
  object-fit: cover;
  border-radius: 0.35rem;
}

@media (min-width: 900px) {
  .about {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
