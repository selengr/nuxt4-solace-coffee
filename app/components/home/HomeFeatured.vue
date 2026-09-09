<script setup lang="ts">
const { featured } = useCafe()
</script>

<template>
  <section class="section-space">
    <div class="container-site">
      <div class="mb-10 flex flex-wrap items-end justify-between gap-5">
        <div>
          <p class="eyebrow">
            On the bar
          </p>
          <h2 class="max-w-[14ch] text-[clamp(2rem,4vw,2.85rem)]">
            Featured pours & plates
          </h2>
        </div>
        <BaseButton to="/menu">
          Full menu
        </BaseButton>
      </div>

      <ul class="grid list-none gap-x-10 gap-y-0 p-0 md:grid-cols-2">
        <li
          v-for="item in featured"
          :key="item.id"
          class="border-t border-ink/10 py-6"
        >
          <p class="mb-2 text-[0.7rem] uppercase tracking-[0.12em] text-mute">
            {{ item.category }}
          </p>
          <h3 class="mb-2 text-[1.45rem]">
            {{ item.name }}
          </h3>
          <p class="mb-3 max-w-md text-[0.95rem] text-mute">
            {{ item.description }}
          </p>
          <p class="text-[0.95rem] font-medium">
            {{ item.price }}
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>
