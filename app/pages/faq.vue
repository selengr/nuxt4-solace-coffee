<script setup lang="ts">
const { info } = useCafe()
const { t } = useI18n()
const localePath = useLocalePath()

useCafeSeo({
  title: () => `${t('faqPage.eyebrow')} — ${info.name}`,
  description: () => t('faqPage.seoDescription'),
})

const query = ref('')
const openId = ref<string | null>('hours')

const items = computed(() => [
  { id: 'hours', q: t('faqPage.q1'), a: t('faqPage.a1') },
  { id: 'milk', q: t('faqPage.q2'), a: t('faqPage.a2') },
  { id: 'allergens', q: t('faqPage.q3'), a: t('faqPage.a3') },
  { id: 'wifi', q: t('faqPage.q4'), a: t('faqPage.a4') },
  { id: 'pickup', q: t('faqPage.q5'), a: t('faqPage.a5') },
  { id: 'private', q: t('faqPage.q6'), a: t('faqPage.a6') },
  { id: 'access', q: t('faqPage.q7'), a: t('faqPage.a7') },
  { id: 'dogs', q: t('faqPage.q8'), a: t('faqPage.a8') },
])

const visibleItems = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) {
    return items.value
  }
  return items.value.filter(item =>
    item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q),
  )
})

watch(visibleItems, (list) => {
  if (!list.length) {
    openId.value = null
    return
  }
  if (!list.some(item => item.id === openId.value)) {
    openId.value = list[0]!.id
  }
})

function toggle(id: string) {
  openId.value = openId.value === id ? null : id
}
</script>

<template>
  <div class="section-space">
    <div class="container-site max-w-3xl">
      <p class="eyebrow">
        {{ t('faqPage.eyebrow') }}
      </p>
      <h1 class="mb-3 max-w-[16ch] text-[clamp(2.4rem,6vw,3.5rem)] leading-snug">
        {{ t('faqPage.title') }}
      </h1>
      <p class="mb-8 max-w-xl leading-relaxed text-mute">
        {{ t('faqPage.lede') }}
      </p>

      <label class="mb-8 block max-w-md">
        <span class="sr-only">{{ t('faqPage.search') }}</span>
        <input
          v-model="query"
          type="search"
          name="faq-search"
          :placeholder="t('faqPage.searchPlaceholder')"
          class="w-full rounded-sm border border-ink/15 bg-foam px-3 py-3 text-sm outline-none transition focus:border-leaf"
        >
      </label>

      <p
        v-if="!visibleItems.length"
        class="mb-8 text-mute"
      >
        {{ t('faqPage.empty', { query }) }}
      </p>

      <div
        v-else
        class="divide-y divide-ink/10 border-y border-ink/10"
      >
        <div
          v-for="item in visibleItems"
          :key="item.id"
        >
          <h2>
            <button
              type="button"
              class="flex w-full items-center justify-between gap-4 py-5 text-start text-lg tracking-tight transition hover:text-leaf"
              :aria-expanded="openId === item.id"
              :aria-controls="`faq-${item.id}`"
              @click="toggle(item.id)"
            >
              <span>{{ item.q }}</span>
              <span
                class="text-mute"
                aria-hidden="true"
              >{{ openId === item.id ? '−' : '+' }}</span>
            </button>
          </h2>
          <div
            v-show="openId === item.id"
            :id="`faq-${item.id}`"
            class="pb-5 leading-relaxed text-mute"
          >
            {{ item.a }}
          </div>
        </div>
      </div>

      <p class="mt-10 text-sm text-mute">
        {{ t('faqPage.more') }}
        <NuxtLink
          :to="localePath('/contact')"
          class="text-leaf underline-offset-2 hover:underline"
        >
          {{ t('faqPage.contact') }}
        </NuxtLink>
      </p>
    </div>
  </div>
</template>
