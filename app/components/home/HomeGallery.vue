<script setup lang="ts">
const { t } = useI18n()
const { el, visible } = useReveal({ threshold: 0.12 })

const images = computed(() => [
  {
    src: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1400&q=80',
    alt: t('gallery.alt1'),
    className: 'md:col-span-7 md:row-span-2 min-h-[18rem] md:min-h-[34rem]',
  },
  {
    src: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1000&q=80',
    alt: t('gallery.alt2'),
    className: 'md:col-span-5 min-h-[14rem] md:min-h-[16rem]',
  },
  {
    src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80',
    alt: t('gallery.alt3'),
    className: 'md:col-span-5 min-h-[14rem] md:min-h-[16rem]',
  },
])
</script>

<template>
  <section
    ref="el"
    class="overflow-hidden pb-[clamp(4.5rem,10vw,7.5rem)] pt-4"
  >
    <div
      class="container-site mb-8"
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
      class="container-site grid gap-3 md:grid-cols-12"
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
          width="1400"
          height="900"
          format="webp"
          sizes="(max-width: 768px) 100vw, 60vw"
          class="h-full w-full object-cover transition duration-[1100ms] ease-out group-hover:scale-[1.04]"
        />
      </figure>
    </div>
  </section>
</template>
