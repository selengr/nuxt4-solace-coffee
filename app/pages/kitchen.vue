<script setup lang="ts">
definePageMeta({
  layout: false,
})

const { info } = useCafe()
const { t } = useI18n()
const localePath = useLocalePath()
const {
  active,
  advanceStatus,
  setStatus,
  clear,
  elapsedLabel,
  remainingLabel,
  statusLabel,
  watchKitchen,
} = useActiveOrder()

useCafeSeo({
  title: () => `${t('kitchen.eyebrow')} — ${info.name}`,
  description: () => t('kitchen.lede'),
})

onMounted(() => {
  watchKitchen()
})

const itemCount = computed(() =>
  active.value?.items.reduce((sum, item) => sum + item.qty, 0) ?? 0,
)
</script>

<template>
  <div class="min-h-screen bg-[#1a1613] px-4 py-8 text-foam sm:px-8">
    <div class="mx-auto max-w-3xl">
      <header class="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-foam/10 pb-6">
        <div>
          <p class="mb-1 text-xs uppercase tracking-[0.18em] text-brass">
            {{ t('kitchen.eyebrow') }}
          </p>
          <h1 class="font-display text-[clamp(1.8rem,4vw,2.6rem)] tracking-tight">
            {{ info.name }} · {{ t('kitchen.title') }}
          </h1>
          <p class="mt-2 max-w-md text-sm text-foam/60">
            {{ t('kitchen.lede') }}
          </p>
        </div>
        <NuxtLink
          :to="localePath('/')"
          class="text-sm text-foam/55 underline-offset-2 hover:text-foam hover:underline"
        >
          {{ t('kitchen.backSite') }}
        </NuxtLink>
      </header>

      <section
        v-if="active"
        class="border border-foam/15 bg-foam/[0.04] p-5 sm:p-8"
      >
        <div class="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p class="text-sm text-brass">
              {{ t('order.ticket', { id: active.orderId }) }}
            </p>
            <h2 class="mt-1 font-display text-2xl tracking-tight">
              {{ active.customerName }}
            </h2>
            <p class="mt-2 text-foam/65">
              {{ active.mode === 'table'
                ? t('kitchen.table', { table: active.table || '—' })
                : t('kitchen.counter') }}
              · {{ itemCount }} {{ t('order.items') }}
            </p>
          </div>
          <div class="rounded-sm border border-foam/15 px-3 py-2 text-end text-sm">
            <p class="text-foam/55">
              {{ elapsedLabel }}
            </p>
            <p class="font-medium">
              {{ remainingLabel }}
            </p>
          </div>
        </div>

        <p class="mb-4 text-sm font-medium text-leaf">
          {{ t('kitchen.now', { status: statusLabel(active.status) }) }}
        </p>

        <ul class="mb-8 m-0 list-none space-y-2 border border-foam/10 bg-ink/40 p-4">
          <li
            v-for="(item, index) in active.items"
            :key="`${item.name}-${index}`"
            class="flex justify-between gap-3 text-sm"
          >
            <span>
              <span class="font-medium tabular-nums text-brass">{{ item.qty }}×</span>
              {{ item.name }}
              <span
                v-if="item.note"
                class="text-foam/50"
              > — {{ item.note }}</span>
            </span>
          </li>
        </ul>

        <div class="flex flex-wrap gap-3">
          <BaseButton
            v-if="active.status === 'received'"
            type="button"
            variant="primary"
            @click="setStatus('preparing')"
          >
            {{ t('kitchen.markPreparing') }}
          </BaseButton>
          <BaseButton
            v-if="active.status === 'preparing'"
            type="button"
            variant="primary"
            @click="setStatus('ready')"
          >
            {{ t('kitchen.markReady') }}
          </BaseButton>
          <BaseButton
            v-if="active.status !== 'ready'"
            type="button"
            variant="ghost"
            @click="advanceStatus()"
          >
            {{ t('kitchen.advance') }}
          </BaseButton>
          <button
            type="button"
            class="text-sm text-foam/50 underline-offset-2 hover:text-foam hover:underline"
            @click="clear"
          >
            {{ t('kitchen.clear') }}
          </button>
        </div>
      </section>

      <section
        v-else
        class="border border-dashed border-foam/20 px-5 py-16 text-center"
      >
        <p class="mb-2 font-display text-xl tracking-tight">
          {{ t('kitchen.emptyTitle') }}
        </p>
        <p class="mx-auto max-w-md text-sm text-foam/55">
          {{ t('kitchen.emptyLede') }}
        </p>
      </section>
    </div>
    <ToastHost />
  </div>
</template>
