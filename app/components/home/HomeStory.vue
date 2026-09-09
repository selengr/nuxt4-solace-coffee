<script setup lang="ts">
const { info } = useCafe()
</script>

<template>
  <section class="story">
    <div class="story__image">
      <img
        src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1400&q=80"
        alt="Barista pouring espresso into a ceramic cup"
        width="1400"
        height="933"
      >
    </div>
    <div class="story__copy">
      <p class="eyebrow">
        Our room
      </p>
      <h2>A quiet counter for better coffee.</h2>
      <p>
        {{ info.name }} is a specialty café built for unhurried mornings —
        single-origin lots, careful milk texture, and a room that feels like a
        pause in the day.
      </p>
      <p>
        This project is also a Nuxt 4 boilerplate: clear folders, typed data,
        composables, and page sections you can remix for your own café brand.
      </p>
      <BaseButton to="/about">
        Our story
      </BaseButton>
    </div>
  </section>
</template>

<style scoped>
.story {
  display: grid;
  background: var(--color-mist);
}

.story__image img {
  width: 100%;
  height: min(70vh, 36rem);
  object-fit: cover;
}

.story__copy {
  padding: clamp(2.5rem, 6vw, 4.5rem);
  display: grid;
  align-content: center;
  gap: 1.1rem;
}

.story__copy h2 {
  font-size: clamp(2rem, 4vw, 3rem);
  max-width: 12ch;
}

.story__copy p {
  color: var(--color-muted);
  max-width: 36rem;
}

@media (min-width: 900px) {
  .story {
    grid-template-columns: 1.05fr 0.95fr;
    min-height: 34rem;
  }

  .story__image img {
    height: 100%;
  }
}
</style>
