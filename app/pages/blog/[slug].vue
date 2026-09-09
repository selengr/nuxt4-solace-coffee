<script setup lang="ts">
const route = useRoute()
const localePath = useLocalePath()
const { t } = useI18n()
const { current, formatDate } = useLocaleText()

const slug = computed(() => {
  const value = route.params.slug
  return Array.isArray(value) ? value[0] : String(value || '')
})

const post = computed(() => getPostBySlug(slug.value, current.value))

if (!getPostBySlug(slug.value, current.value)) {
  throw createError({ statusCode: 404, statusMessage: t('error.postNotFound') })
}

useSeoMeta({
  title: () => post.value ? `${post.value.title} — Solace` : t('blogPage.seoTitle', { name: 'Solace' }),
  description: () => post.value?.description || '',
})
</script>

<template>
  <article
    v-if="post"
    class="section-space"
  >
    <div class="container-site max-w-3xl">
      <NuxtLink
        :to="localePath('/blog')"
        class="mb-8 inline-block text-sm text-mute hover:text-ink"
      >
        <span class="back-arrow">←</span> {{ t('blogPage.back') }}
      </NuxtLink>

      <p class="eyebrow">
        {{ formatDate(post.date, { year: 'numeric', month: 'long', day: 'numeric' }) }}
        <span v-if="post.author"> · {{ post.author }}</span>
      </p>
      <h1 class="mb-4 text-[clamp(2.2rem,5vw,3.2rem)] leading-snug">
        {{ post.title }}
      </h1>
      <p class="mb-10 text-lg leading-relaxed text-mute">
        {{ post.description }}
      </p>

      <div
        class="prose-solace"
        v-html="post.html"
      />
    </div>
  </article>
</template>

<style scoped>
.prose-solace :deep(h2) {
  margin: 2rem 0 0.85rem;
  font-size: 1.45rem;
  line-height: 1.35;
}

.prose-solace :deep(p),
.prose-solace :deep(li) {
  color: #6a635b;
  line-height: 1.85;
  margin-bottom: 1rem;
}

.prose-solace :deep(ul) {
  padding-inline-start: 1.25rem;
  margin-bottom: 1.25rem;
}

.back-arrow {
  display: inline-block;
}

:global([dir='rtl']) .back-arrow {
  display: inline-block;
  transform: scaleX(-1);
}
</style>
