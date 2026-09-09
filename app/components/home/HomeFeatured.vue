<script setup lang="ts">
const { featured } = useCafe()
const { t } = useI18n()
const { tx } = useLocaleText()
const localePath = useLocalePath()
</script>

<template>
  <section class="section-space">
    <div class="container-site">
      <div class="mb-10 flex flex-wrap items-end justify-between gap-5">
        <div>
          <p class="eyebrow">
            {{ t('featured.eyebrow') }}
          </p>
          <h2 class="max-w-[16ch] text-[clamp(2rem,4vw,2.85rem)]">
            {{ t('featured.title') }}
          </h2>
        </div>
        <BaseButton :to="localePath('/menu')">
          {{ t('featured.fullMenu') }}
        </BaseButton>
      </div>

      <ul class="grid list-none gap-x-10 gap-y-0 p-0 md:grid-cols-2">
        <li
          v-for="item in featured"
          :key="item.id"
          class="border-t border-ink/10 py-6"
        >
          <p class="mb-2 text-[0.7rem] text-mute category-label">
            {{ t(`menuPage.${item.category}`) }}
          </p>
          <h3 class="mb-2 text-[1.45rem]">
            {{ tx(item.name) }}
          </h3>
          <p class="mb-3 max-w-md text-[0.95rem] text-mute">
            {{ tx(item.description) }}
          </p>
          <p class="text-[0.95rem] font-medium">
            {{ item.price }}
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>
