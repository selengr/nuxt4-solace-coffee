<script setup lang="ts">
const { info } = useCafe()
const { t } = useI18n()
const localePath = useLocalePath()
const toast = useToast()

useSeoMeta({
  title: () => `${t('wifiPage.eyebrow')} — ${info.name}`,
  description: () => t('wifiPage.seoDescription'),
})

const revealed = ref(false)
const password = 'linger-quietly'

async function reveal() {
  revealed.value = true
  if (import.meta.client && navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(password)
      toast.success(t('wifiPage.copied'))
    }
    catch {
      toast.success(t('wifiPage.revealed'))
    }
  }
  else {
    toast.success(t('wifiPage.revealed'))
  }
}
</script>

<template>
  <div class="section-space">
    <div class="container-site max-w-2xl">
      <p class="eyebrow">
        {{ t('wifiPage.eyebrow') }}
      </p>
      <h1 class="mb-4 max-w-[14ch] text-[clamp(2.4rem,6vw,3.5rem)] leading-snug">
        {{ t('wifiPage.title') }}
      </h1>
      <p class="mb-10 max-w-xl leading-relaxed text-mute">
        {{ t('wifiPage.lede') }}
      </p>

      <div class="mb-8 border border-ink/10 bg-mist p-6 sm:p-8">
        <p class="mb-2 text-[0.7rem] text-leaf label-meta">
          {{ t('wifiPage.network') }}
        </p>
        <p class="mb-6 font-display text-2xl tracking-tight">
          Solace Guest
        </p>

        <p class="mb-2 text-[0.7rem] text-leaf label-meta">
          {{ t('wifiPage.password') }}
        </p>
        <p class="mb-6 font-mono text-xl tracking-wide">
          {{ revealed ? password : '••••••••••••' }}
        </p>

        <BaseButton
          type="button"
          variant="ink"
          @click="reveal"
        >
          {{ revealed ? t('wifiPage.copyAgain') : t('wifiPage.reveal') }}
        </BaseButton>
      </div>

      <p class="mb-6 text-sm leading-relaxed text-mute">
        {{ t('wifiPage.note') }}
      </p>

      <NuxtLink
        :to="localePath('/faq')"
        class="text-sm text-leaf underline-offset-2 hover:underline"
      >
        {{ t('wifiPage.faqLink') }}
      </NuxtLink>
    </div>
  </div>
</template>
