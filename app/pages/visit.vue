<script setup lang="ts">
const { info } = useCafe()
const localePath = useLocalePath()

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
                :to="localePath('/contact')"
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

      <VisitMap />
    </div>
  </div>
</template>
