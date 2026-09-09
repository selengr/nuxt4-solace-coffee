<script setup lang="ts">
const { info } = useCafe()

useSeoMeta({
  title: `Visit — ${info.name}`,
  description: `Hours and location for ${info.name} Coffee in Seattle.`,
})
</script>

<template>
  <div class="section-space">
    <div class="container-site grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
      <div>
        <p class="eyebrow">
          Visit
        </p>
        <h1 class="mb-4 max-w-[14ch] text-[clamp(2.4rem,6vw,3.4rem)]">
          We’re open when you need a pause.
        </h1>
        <p class="mb-8 max-w-md text-mute">
          No reservations — just walk in. Laptops welcome until the afternoon
          rush. Dogs on the patio when the weather cooperates.
        </p>

        <dl class="grid gap-6">
          <div>
            <dt class="mb-1 text-[0.7rem] uppercase tracking-[0.12em] text-leaf">
              Address
            </dt>
            <dd class="m-0">
              {{ info.address }}<br>{{ info.city }}
            </dd>
          </div>
          <div>
            <dt class="mb-1 text-[0.7rem] uppercase tracking-[0.12em] text-leaf">
              Hours
            </dt>
            <dd class="m-0">
              <p
                v-for="line in info.hours"
                :key="line"
              >
                {{ line }}
              </p>
            </dd>
          </div>
          <div>
            <dt class="mb-1 text-[0.7rem] uppercase tracking-[0.12em] text-leaf">
              Contact
            </dt>
            <dd class="m-0">
              <NuxtLink
                to="/contact"
                class="text-leaf underline-offset-2 hover:underline"
              >
                Send a message
              </NuxtLink><br>
              <a :href="`mailto:${info.email}`">{{ info.email }}</a><br>
              {{ info.phone }}
            </dd>
          </div>
        </dl>
      </div>

      <div
        class="grid min-h-[22rem] place-content-center gap-1 rounded-md bg-gradient-to-br from-stone to-mist p-8 text-center"
        aria-label="Map placeholder for café location"
      >
        <p class="font-display text-2xl">
          {{ info.address }}
        </p>
        <p>{{ info.city }}</p>
        <p class="mt-3 text-sm text-mute">
          Replace this panel with Google Maps or Mapbox in production.
        </p>
      </div>
    </div>
  </div>
</template>
