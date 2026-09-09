<script setup lang="ts">
const { info } = useCafe()
const { t } = useI18n()
const { txList } = useLocaleText()
const localePath = useLocalePath()

useSeoMeta({
  title: () => `${t('visitPage.eyebrow')} — ${info.name}`,
  description: () => t('visitPage.lede'),
})
</script>

<template>
  <div class="section-space">
    <div class="container-site grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
      <div>
        <p class="eyebrow">
          {{ t('visitPage.eyebrow') }}
        </p>
        <h1 class="mb-4 max-w-[16ch] text-[clamp(2.4rem,6vw,3.4rem)] leading-snug">
          {{ t('visitPage.title') }}
        </h1>
        <p class="mb-8 max-w-md leading-relaxed text-mute">
          {{ t('visitPage.lede') }}
        </p>

        <dl class="grid gap-6">
          <div>
            <dt class="mb-1 text-[0.7rem] text-leaf label-meta">
              {{ t('visitPage.address') }}
            </dt>
            <dd class="m-0 leading-relaxed">
              {{ info.address }}<br>{{ info.city }}
            </dd>
          </div>
          <div>
            <dt class="mb-1 text-[0.7rem] text-leaf label-meta">
              {{ t('visitPage.hours') }}
            </dt>
            <dd class="m-0">
              <p
                v-for="line in txList(info.hours)"
                :key="line"
              >
                {{ line }}
              </p>
            </dd>
          </div>
          <div>
            <dt class="mb-1 text-[0.7rem] text-leaf label-meta">
              {{ t('visitPage.contact') }}
            </dt>
            <dd class="m-0 leading-relaxed">
              <NuxtLink
                :to="localePath('/contact')"
                class="text-leaf underline-offset-2 hover:underline"
              >
                {{ t('visitPage.message') }}
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
