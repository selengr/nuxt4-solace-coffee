<script setup lang="ts">
const { t } = useI18n()
const { current } = useLocaleText()
const localePath = useLocalePath()
const { el, visible } = useReveal()

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
  <section
    ref="el"
    class="border-y border-ink/5 bg-mist section-space"
  >
    <div
      class="container-site"
      :class="{ 'is-visible': visible }"
    >
      <div class="mb-12 flex flex-wrap items-end justify-between gap-5">
        <div class="reveal-block">
          <p class="eyebrow">
            {{ t('journalTeaser.eyebrow') }}
          </p>
          <h2 class="text-[clamp(2.2rem,4.5vw,3.2rem)] leading-[1.05] tracking-tight">
            {{ t('journalTeaser.title') }}
          </h2>
        </div>
        <BaseButton
          class="reveal-block reveal-block--2"
          :to="localePath('/blog')"
          variant="ink"
        >
          {{ t('journalTeaser.cta') }}
        </BaseButton>
      </div>

      <ul class="m-0 grid list-none gap-0 p-0 md:grid-cols-3 md:gap-8">
        <li
          v-for="(post, index) in posts"
          :key="post.slug"
          class="border-t border-ink/10 py-6 transition hover:border-ink/30"
          :class="`reveal-block reveal-block--${index + 1}`"
        >
          <p class="mb-3 text-xs text-leaf label-meta">
            {{ formatDate(post.date) }}
          </p>
          <h3 class="mb-3 text-xl leading-snug tracking-tight">
            <NuxtLink
              :to="localePath(post.path)"
              class="transition hover:text-leaf"
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
