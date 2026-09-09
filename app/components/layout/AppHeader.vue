<script setup lang="ts">
const { info } = useCafe()
const open = ref(false)
const route = useRoute()

const links = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/about', label: 'About' },
  { to: '/visit', label: 'Visit' },
]

watch(
  () => route.fullPath,
  () => {
    open.value = false
  },
)
</script>

<template>
  <header class="header">
    <div class="container header__inner">
      <NuxtLink
        to="/"
        class="logo"
      >
        {{ info.name }}
      </NuxtLink>

      <nav
        class="nav"
        :class="{ 'nav--open': open }"
        aria-label="Primary"
      >
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="nav__link"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <BaseButton
        class="header__cta"
        to="/visit"
        variant="primary"
      >
        Visit us
      </BaseButton>

      <button
        class="menu-toggle"
        type="button"
        :aria-expanded="open"
        aria-controls="mobile-nav"
        aria-label="Toggle menu"
        @click="open = !open"
      >
        <span />
        <span />
      </button>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 40;
  background: rgb(250 249 246 / 0.88);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgb(26 23 20 / 0.06);
}

.header__inner {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  min-height: 4.25rem;
}

.logo {
  font-family: var(--font-display);
  font-size: 1.45rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  margin-right: auto;
}

.nav {
  display: none;
  gap: 1.75rem;
}

.nav__link {
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--color-muted);
  transition: color 180ms ease;
}

.nav__link:hover,
.nav__link.router-link-active {
  color: var(--color-ink);
}

.header__cta {
  display: none;
}

.menu-toggle {
  width: 2.5rem;
  height: 2.5rem;
  border: 0;
  background: transparent;
  display: grid;
  place-content: center;
  gap: 6px;
  cursor: pointer;
}

.menu-toggle span {
  display: block;
  width: 1.35rem;
  height: 1.5px;
  background: var(--color-ink);
}

@media (max-width: 767px) {
  .nav--open {
    display: flex;
    flex-direction: column;
    position: absolute;
    inset: 4.25rem 0 auto;
    padding: 1.25rem 1.25rem 1.5rem;
    background: var(--color-foam);
    border-bottom: 1px solid rgb(26 23 20 / 0.08);
  }
}

@media (min-width: 768px) {
  .nav {
    display: flex;
  }

  .header__cta {
    display: inline-flex;
  }

  .menu-toggle {
    display: none;
  }
}
</style>
