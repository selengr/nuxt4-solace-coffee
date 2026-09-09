<script setup lang="ts">
const { t } = useI18n()
const { el, visible } = useReveal({ threshold: 0.1 })

const images = computed(() => [
  {
    src: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1600&q=80',
    alt: t('gallery.alt1'),
    caption: t('gallery.caption1'),
    className: 'md:col-span-7 md:row-span-2 min-h-[20rem] md:min-h-[38rem]',
  },
  {
    src: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1100&q=80',
    alt: t('gallery.alt2'),
    caption: t('gallery.caption2'),
    className: 'md:col-span-5 min-h-[14rem] md:min-h-[18rem]',
  },
  {
    src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1100&q=80',
    alt: t('gallery.alt3'),
    caption: t('gallery.caption3'),
    className: 'md:col-span-3 min-h-[14rem] md:min-h-[18rem]',
  },
  {
    src: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=1100&q=80',
    alt: t('gallery.alt4'),
    caption: t('gallery.caption4'),
    className: 'md:col-span-2 min-h-[14rem] md:min-h-[18rem]',
  },
])
</script>

<template>
  <section
    ref="el"
    class="overflow-hidden pb-[clamp(4.5rem,10vw,7.5rem)] pt-2"
  >
    <div
      class="container-site mb-10"
      :class="{ 'is-visible': visible }"
    >
      <div class="reveal-block flex flex-wrap items-end justify-between gap-4">
        <div>
          <p class="eyebrow">
            {{ t('gallery.eyebrow') }}
          </p>
          <h2 class="text-[clamp(2.2rem,4.5vw,3.2rem)] leading-[1.05] tracking-tight">
            {{ t('gallery.title') }}
          </h2>
        </div>
        <p class="max-w-sm text-sm leading-relaxed text-mute">
          {{ t('gallery.note') }}
        </p>
      </div>
    </div>

    <div
      class="mx-auto grid w-[min(100%,88rem)] gap-2 px-2 md:grid-cols-12 md:gap-3 md:px-4"
      :class="{ 'is-visible': visible }"
    >
      <figure
        v-for="(image, index) in images"
        :key="image.src"
        class="group relative overflow-hidden"
        :class="[image.className, `reveal-block reveal-block--${index + 1}`]"
      >
        <NuxtImg
          :src="image.src"
          :alt="image.alt"
          width="1600"
          height="1067"
          format="webp"
          sizes="(max-width: 768px) 100vw, 55vw"
          class="h-full w-full object-cover transition duration-[1100ms] ease-out group-hover:scale-[1.04]"
        />
        <figcaption class="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent px-4 pb-4 pt-12 text-sm text-foam opacity-0 transition duration-500 group-hover:opacity-100">
          {{ image.caption }}
        </figcaption>
      </figure>
    </div>
  </section>
</template>
