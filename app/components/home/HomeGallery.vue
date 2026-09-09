<script setup lang="ts">
const images = [
  {
    src: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=80',
    alt: 'Café interior with warm light',
  },
  {
    src: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1000&q=80',
    alt: 'Espresso in a white cup',
  },
  {
    src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80',
    alt: 'Coffee shop seating area',
  },
]
</script>

<template>
  <section class="section-space">
    <div class="container-site mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p class="eyebrow">
          Atmosphere
        </p>
        <h2 class="text-[clamp(2rem,4vw,2.75rem)]">
          The room, the light, the cup.
        </h2>
      </div>
      <p class="max-w-sm text-sm text-mute">
        Photography placeholders — replace with your own café shots in production.
      </p>
    </div>

    <div class="grid gap-3 md:grid-cols-3">
      <figure
        v-for="(image, index) in images"
        :key="image.src"
        class="overflow-hidden"
        :class="index === 1 ? 'md:translate-y-6' : ''"
      >
        <img
          :src="image.src"
          :alt="image.alt"
          width="1000"
          height="750"
          class="h-72 w-full object-cover transition duration-700 ease-out hover:scale-[1.03] md:h-[22rem]"
        >
      </figure>
    </div>
  </section>
</template>
