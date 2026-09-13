<script setup lang="ts">
const props = withDefaults(defineProps<{
  tables?: number[]
}>(), {
  tables: () => [3, 4, 5, 7],
})

const { info } = useCafe()
const { t, locale } = useI18n()
const config = useRuntimeConfig()

const siteOrigin = computed(() => {
  if (import.meta.client) {
    return window.location.origin
  }
  return config.public.siteUrl || 'https://solace.coffee'
})

function orderUrl(table: number) {
  const prefix = locale.value === 'fa' ? '/fa' : ''
  return `${siteOrigin.value}${prefix}/order?table=${table}`
}

function qrSrc(table: number) {
  const data = encodeURIComponent(orderUrl(table))
  return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=8&data=${data}`
}

function printSheet() {
  if (import.meta.client) {
    window.print()
  }
}
</script>

<template>
  <section class="table-qr-sheet mt-10 border border-ink/10 bg-foam p-5 sm:p-6">
    <div class="mb-5 flex flex-wrap items-end justify-between gap-3 no-print">
      <div>
        <p class="mb-1 text-[0.7rem] text-leaf label-meta">
          {{ t('visitPage.qrSheet') }}
        </p>
        <h2 class="font-display text-xl tracking-tight">
          {{ t('visitPage.qrSheetTitle') }}
        </h2>
        <p class="mt-1 max-w-md text-sm text-mute">
          {{ t('visitPage.qrSheetLede') }}
        </p>
      </div>
      <BaseButton
        type="button"
        variant="ink"
        @click="printSheet"
      >
        {{ t('visitPage.qrPrint') }}
      </BaseButton>
    </div>

    <div class="grid gap-4 sm:grid-cols-2">
      <article
        v-for="n in props.tables"
        :key="n"
        class="table-qr-card flex flex-col items-center border border-ink/10 bg-mist/30 p-5 text-center"
      >
        <p class="mb-1 font-display text-2xl tracking-tight">
          {{ info.name }}
        </p>
        <p class="mb-4 text-sm text-mute">
          {{ t('visitPage.tableChip', { n }) }}
        </p>
        <img
          :src="qrSrc(n)"
          :alt="t('visitPage.qrAlt', { n })"
          width="220"
          height="220"
          class="mb-4 bg-foam"
          loading="lazy"
        >
        <p class="text-xs leading-relaxed text-mute break-all">
          {{ orderUrl(n) }}
        </p>
      </article>
    </div>
  </section>
</template>
