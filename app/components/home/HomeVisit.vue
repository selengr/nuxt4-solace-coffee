<script setup lang="ts">
const { info } = useCafe()
</script>

<template>
  <section class="section visit">
    <div class="container visit__panel">
      <div>
        <p class="eyebrow">
          Come by
        </p>
        <h2>Find {{ info.name }}</h2>
        <p class="visit__lede">
          Walk in, take a seat by the window, and stay as long as the cup lasts.
        </p>
      </div>

      <div class="visit__meta">
        <div>
          <p class="visit__label">
            Address
          </p>
          <p>{{ info.address }}</p>
          <p>{{ info.city }}</p>
        </div>
        <div>
          <p class="visit__label">
            Hours
          </p>
          <p
            v-for="line in info.hours"
            :key="line"
          >
            {{ line }}
          </p>
        </div>
      </div>

      <BaseButton
        to="/visit"
        variant="light"
      >
        Plan your visit
      </BaseButton>
    </div>
  </section>
</template>

<style scoped>
.visit__panel {
  background: var(--color-roast);
  color: var(--color-foam);
  padding: clamp(2.5rem, 6vw, 4rem);
  display: grid;
  gap: 2rem;
  border-radius: 0.5rem;
}

.visit .eyebrow {
  color: var(--color-brass);
}

.visit h2 {
  font-size: clamp(2rem, 4vw, 2.8rem);
  margin-bottom: 0.75rem;
}

.visit__lede {
  color: rgb(250 249 246 / 0.72);
  max-width: 28rem;
}

.visit__meta {
  display: grid;
  gap: 1.5rem;
}

.visit__label {
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-brass);
  margin-bottom: 0.45rem;
}

@media (min-width: 700px) {
  .visit__meta {
    grid-template-columns: 1fr 1fr;
  }

  .visit__panel {
    grid-template-columns: 1.2fr 1fr auto;
    align-items: end;
  }
}
</style>
