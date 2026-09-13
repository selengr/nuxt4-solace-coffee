<script setup lang="ts">
const { info } = useCafe()
const { t, locale } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const { count } = useCart()
const { active, shortStatus } = useActiveOrder()
const route = useRoute()
const open = ref(false)

const links = computed(() => [
  { path: '/menu', label: t('nav.menu') },
  { path: '/order', label: t('nav.order') },
  { path: '/visit', label: t('nav.visit') },
])

const otherLocale = computed(() => (locale.value === 'en' ? 'fa' : 'en'))

function isActive(path: string) {
  const resolved = localePath(path)
  return route.path === resolved || route.path.startsWith(`${resolved}/`)
}

watch(
  () => route.fullPath,
  () => {
    open.value = false
  },
)

watch(locale, () => {
  open.value = false
})
</script>

<template>
  <header class="site-header no-print sticky top-0 z-40 border-b border-ink/5 bg-foam/90 backdrop-blur-md">
    <div class="container-site flex min-h-[4rem] items-center justify-between gap-3">
      <div class="flex min-w-0 items-center gap-6">
        <NuxtLink
          :to="localePath('/')"
          class="shrink-0 font-display text-[1.45rem] font-semibold tracking-tight"
        >
          {{ info.name }}
        </NuxtLink>

        <nav
          class="hidden items-center gap-5 sm:flex"
          :aria-label="t('a11y.primaryNav')"
        >
          <NuxtLink
            v-for="link in links"
            :key="link.path"
            :to="localePath(link.path)"
            class="text-sm text-mute transition hover:text-ink"
            :class="{ '!text-ink font-medium': isActive(link.path) }"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>
      </div>

      <div class="flex shrink-0 items-center gap-2">
        <NuxtLink
          :to="switchLocalePath(otherLocale)"
          class="inline-flex h-9 min-w-9 items-center justify-center rounded-sm border border-ink/10 px-2 text-xs font-medium text-ink transition hover:border-ink/25"
          :class="locale === 'fa' ? '' : 'uppercase tracking-wide'"
        >
          {{ t(`lang.${otherLocale}`) }}
        </NuxtLink>

        <NuxtLink
          :to="localePath('/order')"
          class="relative inline-flex h-9 items-center rounded-sm bg-ink px-3 text-sm font-medium text-foam transition hover:bg-roast"
          :aria-label="active
            ? t('a11y.activeTicket', { status: shortStatus })
            : count
              ? t('a11y.cartWithCount', { count })
              : t('nav.bag')"
        >
          {{ active ? t('order.viewTicket') : t('nav.bag') }}
          <span
            v-if="active"
            class="ms-1.5 grid h-2 w-2 place-items-center"
            aria-hidden="true"
          >
            <span class="order-live-dot h-2 w-2 rounded-full bg-leaf" />
          </span>
          <span
            v-else-if="count"
            class="ms-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-leaf px-1 text-[10px] text-foam"
            aria-hidden="true"
          >
            {{ count }}
          </span>
        </NuxtLink>

        <button
          class="grid h-10 w-10 place-content-center gap-1.5 sm:hidden"
          type="button"
          :aria-expanded="open"
          aria-controls="mobile-nav-panel"
          :aria-label="t('a11y.toggleMenu')"
          @click="open = !open"
        >
          <span class="block h-0.5 w-5 bg-ink" />
          <span class="block h-0.5 w-5 bg-ink" />
        </button>
      </div>
    </div>

    <nav
      v-if="open"
      id="mobile-nav-panel"
      class="border-t border-ink/5 bg-foam sm:hidden"
      :aria-label="t('a11y.mobileNav')"
    >
      <div class="container-site flex flex-col gap-1 py-3">
        <NuxtLink
          v-for="link in links"
          :key="`m-${link.path}`"
          :to="localePath(link.path)"
          class="rounded-sm px-2 py-2.5 text-sm font-medium text-ink transition hover:bg-mist"
          :class="{ '!bg-mist': isActive(link.path) }"
        >
          {{ link.label }}
        </NuxtLink>
      </div>
    </nav>
  </header>
</template>
