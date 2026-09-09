<script setup lang="ts">
const { info } = useCafe()

useSeoMeta({
  title: `Visit — ${info.name}`,
  description: `Hours and location for ${info.name}.`,
})
</script>

<template>
  <div class="page section">
    <div class="container visit-page">
      <div>
        <p class="eyebrow">
          Visit
        </p>
        <h1>We’re open when you need a pause.</h1>
        <p class="lede">
          No reservations — just walk in. Laptops welcome until the afternoon
          rush.
        </p>

        <dl>
          <div>
            <dt>Address</dt>
            <dd>{{ info.address }}<br>{{ info.city }}</dd>
          </div>
          <div>
            <dt>Hours</dt>
            <dd>
              <p
                v-for="line in info.hours"
                :key="line"
              >
                {{ line }}
              </p>
            </dd>
          </div>
          <div>
            <dt>Contact</dt>
            <dd>
              <a :href="`mailto:${info.email}`">{{ info.email }}</a><br>
              {{ info.phone }}
            </dd>
          </div>
        </dl>
      </div>

      <div
        class="map"
        aria-label="Map placeholder for café location"
      >
        <p>{{ info.address }}</p>
        <p>{{ info.city }}</p>
        <p class="map__hint">
          Replace this panel with Google Maps or Mapbox embed.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.visit-page {
  display: grid;
  gap: 2.5rem;
}

.visit-page h1 {
  font-size: clamp(2.4rem, 6vw, 3.4rem);
  margin-bottom: 1rem;
  max-width: 14ch;
}

.lede {
  color: var(--color-muted);
  margin-bottom: 2rem;
  max-width: 32rem;
}

dl {
  display: grid;
  gap: 1.5rem;
  margin: 0;
}

dt {
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-leaf);
  margin-bottom: 0.4rem;
}

dd {
  margin: 0;
  color: var(--color-ink);
}

.map {
  min-height: 22rem;
  background:
    linear-gradient(145deg, var(--color-stone), var(--color-mist));
  border-radius: 0.5rem;
  display: grid;
  place-content: center;
  text-align: center;
  gap: 0.35rem;
  padding: 2rem;
}

.map__hint {
  margin-top: 0.75rem;
  font-size: 0.85rem;
  color: var(--color-muted);
}

@media (min-width: 900px) {
  .visit-page {
    grid-template-columns: 0.95fr 1.05fr;
    align-items: start;
  }
}
</style>
