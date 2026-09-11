<script setup lang="ts">
const { info } = useCafe()
const { t } = useI18n()
const { el, visible } = useReveal({ threshold: 0.12 })

const posts = computed(() => [
  {
    src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
    alt: t('instagram.alt1'),
  },
  {
    src: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80',
    alt: t('instagram.alt2'),
  },
  {
    src: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
    alt: t('instagram.alt3'),
  },
  {
    src: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80',
    alt: t('instagram.alt4'),
  },
  {
    src: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80',
    alt: t('instagram.alt5'),
  },
  {
    src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    alt: t('instagram.alt6'),
  },
])

const profileHref = computed(() =>
  `https://instagram.com/${info.instagram.replace('@', '')}`,
)
</script>

<template>
  <section
    ref="el"
    class="section-space pt-0"
  >
    <div
      class="container-site"
      :class="{ 'is-visible': visible }"
    >
      <div class="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div class="reveal-block">
          <p class="eyebrow">
            {{ t('instagram.eyebrow') }}
          </p>
          <h2 class="text-[clamp(2rem,4vw,2.8rem)] leading-[1.05] tracking-tight">
            {{ t('instagram.title') }}
          </h2>
          <p class="mt-2 text-sm text-mute">
            {{ info.instagram }} · {{ t('instagram.stubNote') }}
          </p>
        </div>
        <a
          class="reveal-block reveal-block--2 inline-flex items-center justify-center rounded-sm border border-ink/15 px-5 py-3 text-sm font-medium transition hover:border-ink/35"
          :href="profileHref"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ t('instagram.follow') }}
        </a>
      </div>

      <ul class="m-0 grid list-none grid-cols-2 gap-2 p-0 sm:grid-cols-3 md:gap-3">
        <li
          v-for="(post, index) in posts"
          :key="post.src"
          class="group relative aspect-square overflow-hidden"
          :class="`reveal-block reveal-block--${(index % 4) + 1}`"
        >
          <NuxtImg
            :src="post.src"
            :alt="post.alt"
            width="800"
            height="800"
            format="webp"
            sizes="(max-width: 640px) 50vw, 33vw"
            class="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
          />
        </li>
      </ul>
    </div>
  </section>
</template>
