<script setup lang="ts">
const { info } = useCafe()
</script>

<template>
  <section class="section-space">
    <div class="container-site grid gap-8 rounded-md bg-roast p-[clamp(2.5rem,6vw,4rem)] text-foam md:grid-cols-[1.2fr_1fr_auto] md:items-end">
      <div>
        <p class="eyebrow !text-brass">
          Come by
        </p>
        <h2 class="mb-3 text-[clamp(2rem,4vw,2.8rem)]">
          Find {{ info.name }}
        </h2>
        <p class="max-w-md text-foam/70">
          Walk in, take a seat by the window, and stay as long as the cup lasts.
        </p>
      </div>

      <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
        <div>
          <p class="mb-2 text-[0.7rem] uppercase tracking-[0.12em] text-brass">
            Address
          </p>
          <p>{{ info.address }}</p>
          <p>{{ info.city }}</p>
        </div>
        <div>
          <p class="mb-2 text-[0.7rem] uppercase tracking-[0.12em] text-brass">
            Hours
          </p>
          <p
            v-for="line in info.hours"
            :key="line"
          >
            {{ line }}
          </p>
        </div>
      </div>

      <BaseButton
        to="/visit"
        variant="light"
      >
        Plan your visit
      </BaseButton>
    </div>
  </section>
</template>
