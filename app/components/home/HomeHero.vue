<script setup lang="ts">
const { info } = useCafe()
</script>

<template>
  <section class="hero">
    <div class="hero__media" aria-hidden="true">
      <img
        src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=2000&q=80"
        alt=""
        width="2000"
        height="1333"
      >
      <div class="hero__scrim" />
    </div>

    <div class="container hero__content">
      <p class="eyebrow reveal">
        Specialty café · Nuxt 4 starter
      </p>
      <h1 class="hero__title reveal reveal-delay-1">
        {{ info.name }}
      </h1>
      <p class="hero__lede reveal reveal-delay-2">
        {{ info.tagline }}
      </p>
      <div class="hero__actions reveal reveal-delay-3">
        <BaseButton
          to="/menu"
          variant="light"
        >
          View the menu
        </BaseButton>
        <BaseButton
          to="/visit"
          variant="ghost"
        >
          Find the room
        </BaseButton>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: min(92vh, 54rem);
  display: grid;
  align-items: end;
  color: var(--color-foam);
  overflow: hidden;
}

.hero__media {
  position: absolute;
  inset: 0;
}

.hero__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.04);
  animation: ease-zoom 12s var(--ease-out) forwards;
}

.hero__scrim {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      180deg,
      rgb(26 23 20 / 0.25) 0%,
      rgb(26 23 20 / 0.55) 45%,
      rgb(26 23 20 / 0.88) 100%
    );
}

.hero__content {
  position: relative;
  z-index: 1;
  padding-block: clamp(4rem, 12vw, 7rem) clamp(3.5rem, 8vw, 5.5rem);
  max-width: 42rem;
}

.hero .eyebrow {
  color: var(--color-brass);
}

.hero__title {
  font-size: clamp(3.4rem, 10vw, 6.5rem);
  letter-spacing: -0.03em;
  margin-bottom: 1rem;
}

.hero__lede {
  font-size: clamp(1.05rem, 2.2vw, 1.25rem);
  font-weight: 300;
  max-width: 28rem;
  color: rgb(250 249 246 / 0.84);
  margin-bottom: 2rem;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
}

@keyframes ease-zoom {
  to {
    transform: scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero__media img {
    animation: none;
    transform: none;
  }
}
</style>
