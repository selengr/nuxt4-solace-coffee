<script setup lang="ts">
const { info } = useCafe()
const { t } = useI18n()
const { tx, txList } = useLocaleText()
const localePath = useLocalePath()
const year = new Date().getFullYear()

const exploreLinks = computed(() => [
  { path: '/menu', label: t('nav.menu') },
  { path: '/order', label: t('nav.order') },
  { path: '/events', label: t('nav.events') },
  { path: '/blog', label: t('nav.blog') },
  { path: '/about', label: t('nav.about') },
])

const helpLinks = computed(() => [
  { path: '/visit', label: t('nav.visit') },
  { path: '/contact', label: t('nav.contact') },
  { path: '/faq', label: t('nav.faq') },
  { path: '/wifi', label: t('nav.wifi') },
  { path: '/gift-cards', label: t('nav.giftCards') },
])
</script>

<template>
  <footer class="no-print bg-ink pb-8 pt-16 text-foam/80">
    <div class="container-site grid gap-8 border-b border-foam/10 pb-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
      <div>
        <p class="mb-3 font-display text-3xl text-foam">
          {{ info.name }}
        </p>
        <p class="max-w-xs text-[0.95rem] text-foam/60">
          {{ tx(info.tagline) }}
        </p>
      </div>

      <div>
        <p class="mb-3 text-sm font-medium text-brass">
          {{ t('footer.visit') }}
        </p>
        <p class="text-sm">
          {{ info.address }}
        </p>
        <p class="mb-3 text-sm">
          {{ info.city }}
        </p>
        <p
          v-for="line in txList(info.hours)"
          :key="line"
          class="text-sm text-foam/60"
        >
          {{ line }}
        </p>
      </div>

      <div>
        <p class="mb-3 text-sm font-medium text-brass">
          {{ t('footer.explore') }}
        </p>
        <p
          v-for="link in exploreLinks"
          :key="link.path"
          class="text-sm"
        >
          <NuxtLink
            :to="localePath(link.path)"
            class="transition hover:text-foam"
          >
            {{ link.label }}
          </NuxtLink>
        </p>
      </div>

      <div>
        <p class="mb-3 text-sm font-medium text-brass">
          {{ t('footer.help') }}
        </p>
        <p
          v-for="link in helpLinks"
          :key="link.path"
          class="text-sm"
        >
          <NuxtLink
            :to="localePath(link.path)"
            class="transition hover:text-foam"
          >
            {{ link.label }}
          </NuxtLink>
        </p>
        <p class="mt-3 text-sm">
          <a
            :href="`mailto:${info.email}`"
            class="transition hover:text-foam"
          >{{ info.email }}</a>
        </p>
      </div>
    </div>

    <div class="container-site flex flex-col gap-2 pt-6 text-xs text-foam/45 sm:flex-row sm:justify-between">
      <p>{{ t('footer.built', { year, name: info.name }) }}</p>
      <p>{{ t('footer.city') }}</p>
    </div>
  </footer>
</template>
