<script setup lang="ts">
const { info } = useCafe()
const { t } = useI18n()
const { tx, txList } = useLocaleText()
const localePath = useLocalePath()
const year = new Date().getFullYear()
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
        <p class="mb-3 text-[0.7rem] text-brass label-meta">
          {{ t('footer.visit') }}
        </p>
        <p class="text-sm">
          {{ info.address }}
        </p>
        <p class="text-sm">
          {{ info.city }}
        </p>
      </div>

      <div>
        <p class="mb-3 text-[0.7rem] text-brass label-meta">
          {{ t('footer.hours') }}
        </p>
        <p
          v-for="line in txList(info.hours)"
          :key="line"
          class="text-sm"
        >
          {{ line }}
        </p>
      </div>

      <div>
        <p class="mb-3 text-[0.7rem] text-brass label-meta">
          {{ t('footer.contact') }}
        </p>
        <p class="text-sm">
          <NuxtLink
            :to="localePath('/contact')"
            class="transition hover:text-foam"
          >
            {{ t('footer.write') }}
          </NuxtLink>
        </p>
        <p class="text-sm">
          <NuxtLink
            :to="localePath('/wifi')"
            class="transition hover:text-foam"
          >
            {{ t('nav.wifi') }}
          </NuxtLink>
        </p>
        <p class="text-sm">
          <NuxtLink
            :to="localePath('/press')"
            class="transition hover:text-foam"
          >
            {{ t('nav.press') }}
          </NuxtLink>
        </p>
        <p class="text-sm">
          <NuxtLink
            :to="localePath('/careers')"
            class="transition hover:text-foam"
          >
            {{ t('nav.careers') }}
          </NuxtLink>
        </p>
        <p class="text-sm">
          <NuxtLink
            :to="localePath('/care')"
            class="transition hover:text-foam"
          >
            {{ t('nav.care') }}
          </NuxtLink>
        </p>
        <p class="text-sm">
          <NuxtLink
            :to="localePath('/faq')"
            class="transition hover:text-foam"
          >
            {{ t('nav.faq') }}
          </NuxtLink>
        </p>
        <p class="text-sm">
          <NuxtLink
            :to="localePath('/gift-cards')"
            class="transition hover:text-foam"
          >
            {{ t('nav.giftCards') }}
          </NuxtLink>
        </p>
        <p class="text-sm">
          <NuxtLink
            :to="localePath('/loyalty')"
            class="transition hover:text-foam"
          >
            {{ t('nav.loyalty') }}
          </NuxtLink>
        </p>
        <p class="text-sm">
          <NuxtLink
            :to="localePath('/catering')"
            class="transition hover:text-foam"
          >
            {{ t('nav.catering') }}
          </NuxtLink>
        </p>
        <p class="text-sm">
          <NuxtLink
            :to="localePath('/wholesale')"
            class="transition hover:text-foam"
          >
            {{ t('nav.wholesale') }}
          </NuxtLink>
        </p>
        <p class="text-sm">
          <a
            :href="`mailto:${info.email}`"
            class="transition hover:text-foam"
          >{{ info.email }}</a>
        </p>
        <p class="text-sm">
          {{ info.instagram }}
        </p>
      </div>
    </div>

    <div class="container-site flex flex-col gap-2 pt-6 text-xs text-foam/45 sm:flex-row sm:justify-between">
      <p>{{ t('footer.built', { year, name: info.name }) }}</p>
      <p>{{ t('footer.city') }}</p>
    </div>
  </footer>
</template>
