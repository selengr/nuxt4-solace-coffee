<script setup lang="ts">
const { info } = useCafe()
const localePath = useLocalePath()
const posts = getAllPosts()

useSeoMeta({
  title: `Journal — ${info.name}`,
  description: 'Notes on espresso, room design, and seasonal cooking from Solace Coffee.',
})

function formatDate(value?: string) {
  if (!value) {
    return ''
  }
  return new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
</script>

<template>
  <div class="section-space">
    <div class="container-site">
      <p class="eyebrow">
        Journal
      </p>
      <h1 class="mb-3 text-[clamp(2.4rem,6vw,3.5rem)]">
        Notes from the counter
      </h1>
      <p class="mb-12 max-w-xl text-mute">
        Short essays on dialing espresso, shaping the room, and keeping the menu seasonal.
      </p>

      <ul class="m-0 grid list-none gap-6 p-0 md:grid-cols-2 lg:grid-cols-3">
        <li
          v-for="post in posts"
          :key="post.slug"
          class="border border-ink/10 p-6 transition hover:border-ink/25"
        >
          <p class="mb-3 text-xs uppercase tracking-[0.12em] text-leaf">
            {{ formatDate(post.date) }}
          </p>
          <h2 class="mb-3 text-xl">
            <NuxtLink
              :to="localePath(post.path)"
              class="hover:underline"
            >
              {{ post.title }}
            </NuxtLink>
          </h2>
          <p class="mb-4 text-sm text-mute">
            {{ post.description }}
          </p>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in post.tags"
              :key="tag"
              class="rounded-sm bg-mist px-2 py-1 text-[0.7rem] uppercase tracking-wide text-mute"
            >
              {{ tag }}
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
