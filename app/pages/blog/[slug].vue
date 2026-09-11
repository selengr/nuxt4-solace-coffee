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

const related = computed(() => {
  if (!post.value) {
    return []
  }
  const currentTags = new Set(post.value.tags)
  return getAllPosts(current.value)
    .filter(entry => entry.slug !== post.value!.slug)
    .map(entry => ({
      ...entry,
      score: entry.tags.filter(tag => currentTags.has(tag)).length,
    }))
    .sort((a, b) => b.score - a.score || +new Date(b.date) - +new Date(a.date))
    .slice(0, 2)
})

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

      <section
        v-if="related.length"
        class="mt-16 border-t border-ink/10 pt-10"
      >
        <h2 class="mb-6 text-2xl tracking-tight">
          {{ t('blogPage.related') }}
        </h2>
        <ul class="m-0 grid list-none gap-4 p-0 sm:grid-cols-2">
          <li
            v-for="item in related"
            :key="item.slug"
            class="border border-ink/10 p-5 transition hover:border-ink/25"
          >
            <p class="mb-2 text-xs text-leaf label-meta">
              {{ formatDate(item.date) }}
            </p>
            <h3 class="text-lg leading-snug">
              <NuxtLink
                :to="localePath(item.path)"
                class="hover:text-leaf"
              >
                {{ item.title }}
              </NuxtLink>
            </h3>
          </li>
        </ul>
      </section>
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
