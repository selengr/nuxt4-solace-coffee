<script setup lang="ts">
const { info } = useCafe()
const { t, locale } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const { count } = useCart()
const open = ref(false)
const route = useRoute()

const links = computed(() => [
  { to: localePath('/'), label: t('nav.home') },
  { to: localePath('/menu'), label: t('nav.menu') },
  { to: localePath('/order'), label: t('nav.order') },
  { to: localePath('/events'), label: t('nav.events') },
  { to: localePath('/blog'), label: t('nav.blog') },
  { to: localePath('/wholesale'), label: t('nav.wholesale') },
  { to: localePath('/about'), label: t('nav.about') },
  { to: localePath('/visit'), label: t('nav.visit') },
  { to: localePath('/contact'), label: t('nav.contact') },
])

const otherLocale = computed(() => (locale.value === 'en' ? 'fa' : 'en'))

watch(
  () => route.fullPath,
  () => {
    open.value = false
  },
)
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-ink/5 bg-foam/90 backdrop-blur-md">
    <div class="container-site flex min-h-[4.25rem] items-center gap-4 md:gap-6">
      <NuxtLink
        :to="localePath('/')"
        class="me-auto font-display text-[1.45rem] font-semibold tracking-tight"
      >
        {{ info.name }}
      </NuxtLink>

      <nav
        id="mobile-nav"
        class="hidden items-center gap-5 xl:flex"
        :aria-label="t('a11y.primaryNav')"
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

      <NuxtLink
        :to="switchLocalePath(otherLocale)"
        class="hidden text-xs font-medium uppercase tracking-wider text-mute hover:text-ink sm:inline"
      >
        {{ t(`lang.${otherLocale}`) }}
      </NuxtLink>

      <NuxtLink
        :to="localePath('/order')"
        class="relative hidden text-sm text-mute hover:text-ink md:inline"
      >
        {{ t('nav.order') }}
        <span
          v-if="count"
          class="absolute -end-3 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-leaf px-1 text-[10px] text-foam"
        >
          {{ count }}
        </span>
      </NuxtLink>

      <BaseButton
        class="hidden md:inline-flex"
        :to="localePath('/visit')"
        variant="primary"
      >
        {{ t('nav.visitCta') }}
      </BaseButton>

      <button
        class="grid h-10 w-10 place-content-center gap-1.5 xl:hidden"
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

    <nav
      v-if="open"
      id="mobile-nav-panel"
      class="border-t border-ink/5 bg-foam px-5 py-4 xl:hidden"
      :aria-label="t('a11y.mobileNav')"
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
        <NuxtLink
          :to="switchLocalePath(otherLocale)"
          class="py-1 text-sm text-mute"
        >
          {{ t(`lang.${otherLocale}`) }}
        </NuxtLink>
        <BaseButton
          :to="localePath('/visit')"
          variant="primary"
        >
          {{ t('nav.visitCta') }}
        </BaseButton>
      </div>
    </nav>
  </header>
</template>
