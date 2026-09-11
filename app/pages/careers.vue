<script setup lang="ts">
const { info } = useCafe()
const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: () => `${t('careersPage.eyebrow')} — ${info.name}`,
  description: () => t('careersPage.seoDescription'),
})

const roles = computed(() => [
  {
    title: t('careersPage.role1Title'),
    type: t('careersPage.role1Type'),
    body: t('careersPage.role1Body'),
  },
  {
    title: t('careersPage.role2Title'),
    type: t('careersPage.role2Type'),
    body: t('careersPage.role2Body'),
  },
  {
    title: t('careersPage.role3Title'),
    type: t('careersPage.role3Type'),
    body: t('careersPage.role3Body'),
  },
])
</script>

<template>
  <div class="section-space">
    <div class="container-site max-w-4xl">
      <p class="eyebrow">
        {{ t('careersPage.eyebrow') }}
      </p>
      <h1 class="mb-4 max-w-[16ch] text-[clamp(2.4rem,6vw,3.5rem)] leading-snug">
        {{ t('careersPage.title') }}
      </h1>
      <p class="mb-12 max-w-2xl leading-relaxed text-mute">
        {{ t('careersPage.lede') }}
      </p>

      <ul class="mb-12 grid list-none gap-5 p-0">
        <li
          v-for="role in roles"
          :key="role.title"
          class="border border-ink/10 p-6"
        >
          <p class="mb-2 text-[0.7rem] text-leaf label-meta">
            {{ role.type }}
          </p>
          <h2 class="mb-2 text-xl tracking-tight">
            {{ role.title }}
          </h2>
          <p class="text-sm leading-relaxed text-mute">
            {{ role.body }}
          </p>
        </li>
      </ul>

      <BaseButton
        :to="localePath('/contact')"
        variant="ink"
      >
        {{ t('careersPage.cta') }}
      </BaseButton>
    </div>
  </div>
</template>
