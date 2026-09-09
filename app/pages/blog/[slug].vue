<script setup lang="ts">
const route = useRoute()
const localePath = useLocalePath()

const slug = computed(() => {
  const value = route.params.slug
  return Array.isArray(value) ? value[0] : String(value || '')
})

const post = computed(() => getPostBySlug(slug.value))

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found' })
}

useSeoMeta({
  title: () => post.value ? `${post.value.title} — Solace` : 'Journal — Solace',
  description: () => post.value?.description || '',
})

function formatDate(value?: string) {
  if (!value) {
    return ''
  }
  return new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
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
        ← All notes
      </NuxtLink>

      <p class="eyebrow">
        {{ formatDate(post.date) }}
        <span v-if="post.author"> · {{ post.author }}</span>
      </p>
      <h1 class="mb-4 text-[clamp(2.2rem,5vw,3.2rem)]">
        {{ post.title }}
      </h1>
      <p class="mb-10 text-lg text-mute">
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
}

.prose-solace :deep(p),
.prose-solace :deep(li) {
  color: #6a635b;
  line-height: 1.7;
  margin-bottom: 1rem;
}

.prose-solace :deep(ul) {
  padding-inline-start: 1.25rem;
  margin-bottom: 1.25rem;
}
</style>
