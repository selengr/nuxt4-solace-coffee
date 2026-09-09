<script setup lang="ts">
const { info, values } = useCafe()

useSeoMeta({
  title: `About — ${info.name}`,
  description: 'The story behind Solace specialty coffee in Seattle.',
})
</script>

<template>
  <div class="section-space">
    <div class="container-site grid items-center gap-10 lg:grid-cols-2">
      <div>
        <p class="eyebrow">
          About
        </p>
        <h1 class="mb-5 max-w-[12ch] text-[clamp(2.4rem,6vw,3.4rem)]">
          Built for better mornings.
        </h1>
        <p class="mb-4 max-w-md text-mute">
          {{ info.name }} began as a small counter with one espresso machine and
          a stubborn belief that coffee shops should feel calm — not rushed,
          not loud for the sake of it.
        </p>
        <p class="mb-4 max-w-md text-mute">
          We roast relationships first: rotating microlots, dialed recipes, and
          a short food list that pairs with what’s in the cup.
        </p>
        <p class="max-w-md text-mute">
          Today the room on Mercer Street is where neighbors start their day,
          meet mid-afternoon, or simply sit with a pour-over and a book.
        </p>
      </div>
      <aside>
        <img
          src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80"
          alt="Warm café interior with wooden tables and soft light"
          width="1200"
          height="800"
          class="h-[min(28rem,70vw)] w-full rounded-sm object-cover"
        >
      </aside>
    </div>

    <div class="container-site mt-20 grid gap-8 border-t border-ink/10 pt-12 md:grid-cols-3">
      <article
        v-for="value in values"
        :key="value.title"
      >
        <h2 class="mb-3 text-xl">
          {{ value.title }}
        </h2>
        <p class="text-sm leading-relaxed text-mute">
          {{ value.description }}
        </p>
      </article>
    </div>
  </div>
</template>
