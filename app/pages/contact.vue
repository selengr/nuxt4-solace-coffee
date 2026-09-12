<script setup lang="ts">
const { info } = useCafe()
const { t } = useI18n()
const localePath = useLocalePath()

useCafeSeo({
  title: () => `${t('contactPage.eyebrow')} — ${info.name}`,
  description: () => t('contactPage.lede'),
})

const igHref = computed(() =>
  `https://instagram.com/${info.instagram.replace('@', '')}`,
)
</script>

<template>
  <div class="section-space">
    <div class="container-site grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <p class="eyebrow">
          {{ t('contactPage.eyebrow') }}
        </p>
        <h1 class="mb-4 max-w-[12ch] text-[clamp(2.4rem,6vw,3.4rem)] leading-snug">
          {{ t('contactPage.title') }}
        </h1>
        <p class="mb-6 max-w-md leading-relaxed text-mute">
          {{ t('contactPage.lede') }}
        </p>

        <div class="mb-8">
          <OpenStatus />
        </div>

        <div class="space-y-5 text-sm">
          <div>
            <p class="mb-1 text-[0.7rem] text-leaf label-meta">
              {{ t('contactPage.email') }}
            </p>
            <a :href="`mailto:${info.email}`">{{ info.email }}</a>
          </div>
          <div>
            <p class="mb-1 text-[0.7rem] text-leaf label-meta">
              {{ t('contactPage.phone') }}
            </p>
            <a :href="`tel:${info.phone.replace(/[^\d+]/g, '')}`">{{ info.phone }}</a>
          </div>
          <div>
            <p class="mb-1 text-[0.7rem] text-leaf label-meta">
              {{ t('contactPage.social') }}
            </p>
            <a
              :href="igHref"
              target="_blank"
              rel="noopener noreferrer"
              class="text-leaf underline-offset-2 hover:underline"
            >{{ info.instagram }}</a>
          </div>
          <div>
            <p class="mb-1 text-[0.7rem] text-leaf label-meta">
              {{ t('visitPage.address') }}
            </p>
            <p>{{ info.address }}</p>
            <p>{{ info.city }}</p>
            <NuxtLink
              :to="localePath('/visit')"
              class="mt-2 inline-block text-leaf underline-offset-2 hover:underline"
            >
              {{ t('contactPage.visitLink') }}
            </NuxtLink>
          </div>
        </div>
      </div>

      <div class="rounded-md border border-ink/10 bg-mist p-6 sm:p-8">
        <ContactForm />
      </div>
    </div>
  </div>
</template>
