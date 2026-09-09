<script setup lang="ts">
const { t } = useI18n()
const { current } = useLocaleText()
const localePath = useLocalePath()

const posts = computed(() => getAllPosts(current.value).slice(0, 3))

function formatDate(value?: string) {
  if (!value) {
    return ''
  }
  const tag = current.value === 'fa' ? 'fa-IR' : 'en-US'
  return new Date(value).toLocaleDateString(tag, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
</script>

<template>
  <section class="section-space border-y border-ink/5">
    <div class="container-site">
      <div class="mb-10 flex flex-wrap items-end justify-between gap-5">
        <div>
          <p class="eyebrow">
            {{ t('journalTeaser.eyebrow') }}
          </p>
          <h2 class="text-[clamp(2rem,4vw,2.85rem)] leading-snug">
            {{ t('journalTeaser.title') }}
          </h2>
        </div>
        <BaseButton :to="localePath('/blog')">
          {{ t('journalTeaser.cta') }}
        </BaseButton>
      </div>

      <ul class="m-0 grid list-none gap-6 p-0 md:grid-cols-3">
        <li
          v-for="post in posts"
          :key="post.slug"
          class="border border-ink/10 p-5"
        >
          <p class="mb-2 text-xs text-leaf label-meta">
            {{ formatDate(post.date) }}
          </p>
          <h3 class="mb-2 text-lg leading-snug">
            <NuxtLink
              :to="localePath(post.path)"
              class="hover:underline"
            >
              {{ post.title }}
            </NuxtLink>
          </h3>
          <p class="text-sm leading-relaxed text-mute">
            {{ post.description }}
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>
