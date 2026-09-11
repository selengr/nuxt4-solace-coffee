<script setup lang="ts">
const { info } = useCafe()
const { t } = useI18n()
const localePath = useLocalePath()
const { weekRows, statusLabel, isOpen } = useCafeHours()

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
        <p class="mb-6 max-w-md leading-relaxed text-mute">
          {{ t('visitPage.lede') }}
        </p>

        <div class="mb-8">
          <OpenStatus detailed />
        </div>

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
              {{ t('hours.weekTitle') }}
            </dt>
            <dd class="m-0">
              <ul class="m-0 list-none space-y-2 p-0">
                <li
                  v-for="row in weekRows"
                  :key="row.label"
                  class="flex justify-between gap-4 text-sm"
                  :class="row.isToday ? 'font-medium text-ink' : 'text-mute'"
                >
                  <span>{{ row.label }}</span>
                  <span class="tabular-nums">{{ row.range }}</span>
                </li>
              </ul>
              <p class="mt-3 text-xs text-mute">
                {{ isOpen ? statusLabel : statusLabel }}
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
