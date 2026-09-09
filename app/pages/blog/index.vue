<script setup lang="ts">
const { info } = useCafe()
const { t } = useI18n()
const { current, formatDate } = useLocaleText()
const localePath = useLocalePath()

const posts = computed(() => getAllPosts(current.value))

useSeoMeta({
  title: () => t('blogPage.seoTitle', { name: info.name }),
  description: () => t('blogPage.seoDescription'),
})
</script>

<template>
  <div class="section-space">
    <div class="container-site">
      <p class="eyebrow">
        {{ t('blogPage.eyebrow') }}
      </p>
      <h1 class="mb-3 text-[clamp(2.4rem,6vw,3.5rem)]">
        {{ t('blogPage.title') }}
      </h1>
      <p class="mb-12 max-w-xl text-mute leading-relaxed">
        {{ t('blogPage.lede') }}
      </p>

      <ul class="m-0 grid list-none gap-6 p-0 md:grid-cols-2 lg:grid-cols-3">
        <li
          v-for="post in posts"
          :key="`${post.locale}-${post.slug}`"
          class="border border-ink/10 p-6 transition hover:border-ink/25"
        >
          <p class="mb-3 text-xs text-leaf label-meta">
            {{ formatDate(post.date) }}
          </p>
          <h2 class="mb-3 text-xl leading-snug">
            <NuxtLink
              :to="localePath(post.path)"
              class="hover:underline"
            >
              {{ post.title }}
            </NuxtLink>
          </h2>
          <p class="mb-4 text-sm leading-relaxed text-mute">
            {{ post.description }}
          </p>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in post.tags"
              :key="tag"
              class="rounded-sm bg-mist px-2 py-1 text-[0.7rem] text-mute tag-chip"
            >
              {{ tag }}
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
