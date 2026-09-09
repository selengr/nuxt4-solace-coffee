<script setup lang="ts">
const { info } = useCafe()

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container footer__grid">
      <div>
        <p class="footer__brand">
          {{ info.name }}
        </p>
        <p class="footer__tagline">
          {{ info.tagline }}
        </p>
      </div>

      <div>
        <p class="footer__label">
          Visit
        </p>
        <p>{{ info.address }}</p>
        <p>{{ info.city }}</p>
      </div>

      <div>
        <p class="footer__label">
          Hours
        </p>
        <p
          v-for="line in info.hours"
          :key="line"
        >
          {{ line }}
        </p>
      </div>

      <div>
        <p class="footer__label">
          Contact
        </p>
        <p>
          <a :href="`mailto:${info.email}`">{{ info.email }}</a>
        </p>
        <p>{{ info.phone }}</p>
      </div>
    </div>

    <div class="container footer__bottom">
      <p>© {{ year }} {{ info.name }}. Nuxt 4 café starter boilerplate.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--color-ink);
  color: rgb(250 249 246 / 0.82);
  padding-top: 4rem;
  padding-bottom: 2rem;
}

.footer__grid {
  display: grid;
  gap: 2rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid rgb(250 249 246 / 0.12);
}

.footer__brand {
  font-family: var(--font-display);
  font-size: 1.75rem;
  color: var(--color-foam);
  margin-bottom: 0.65rem;
}

.footer__tagline {
  max-width: 18rem;
  color: rgb(250 249 246 / 0.62);
  font-size: 0.95rem;
}

.footer__label {
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-brass);
  margin-bottom: 0.75rem;
}

.footer p {
  font-size: 0.9rem;
}

.footer a:hover {
  color: var(--color-foam);
}

.footer__bottom {
  padding-top: 1.5rem;
  font-size: 0.8rem;
  color: rgb(250 249 246 / 0.45);
}

@media (min-width: 768px) {
  .footer__grid {
    grid-template-columns: 1.4fr 1fr 1fr 1fr;
  }
}
</style>
