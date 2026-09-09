<script setup lang="ts">
const { info } = useCafe()
const open = ref(false)
const route = useRoute()

const links = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/about', label: 'About' },
  { to: '/visit', label: 'Visit' },
  { to: '/contact', label: 'Contact' },
]

watch(
  () => route.fullPath,
  () => {
    open.value = false
  },
)
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-ink/5 bg-foam/90 backdrop-blur-md">
    <div class="container-site flex min-h-[4.25rem] items-center gap-6">
      <NuxtLink
        to="/"
        class="mr-auto font-display text-[1.45rem] font-semibold tracking-tight"
      >
        {{ info.name }}
      </NuxtLink>

      <nav
        id="mobile-nav"
        class="hidden items-center gap-7 md:flex"
        aria-label="Primary"
      >
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="text-sm text-mute transition hover:text-ink"
          active-class="!text-ink"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <BaseButton
        class="hidden md:inline-flex"
        to="/visit"
        variant="primary"
      >
        Visit us
      </BaseButton>

      <button
        class="grid h-10 w-10 place-content-center gap-1.5 md:hidden"
        type="button"
        :aria-expanded="open"
        aria-controls="mobile-nav-panel"
        aria-label="Toggle menu"
        @click="open = !open"
      >
        <span class="block h-0.5 w-5 bg-ink" />
        <span class="block h-0.5 w-5 bg-ink" />
      </button>
    </div>

    <nav
      v-if="open"
      id="mobile-nav-panel"
      class="border-t border-ink/5 bg-foam px-5 py-4 md:hidden"
      aria-label="Mobile"
    >
      <div class="flex flex-col gap-3">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="py-1 text-sm text-mute"
        >
          {{ link.label }}
        </NuxtLink>
        <BaseButton
          to="/visit"
          variant="primary"
        >
          Visit us
        </BaseButton>
      </div>
    </nav>
  </header>
</template>
