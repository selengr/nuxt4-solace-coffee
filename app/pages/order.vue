<script setup lang="ts">
import type { ServiceMode } from '~/composables/useActiveOrder'

const { info } = useCafe()
const { t, te } = useI18n()
const localePath = useLocalePath()
const {
  lines,
  count,
  subtotalLabel,
  setQty,
  setNote,
  removeItem,
  lineTotalLabel,
  clear,
} = useCart()
const { etaLabel, etaRange } = usePickupEta()
const { isOpen, statusLabel } = useCafeHours()
const {
  active,
  start,
  clear: clearActive,
  watchKitchen,
  elapsedLabel,
  remainingLabel,
} = useActiveOrder()
const { profile, save: saveGuest } = useGuestProfile()

const serviceMode = ref<ServiceMode>('table')
const tableNumber = ref('')
const customerName = ref(profile.value.name)
const customerEmail = ref(profile.value.email)
const phone = ref(profile.value.phone)
const notes = ref('')

const toast = useToast()
const status = ref<'idle' | 'loading' | 'error'>('idle')
const feedback = ref('')
const fieldErrors = ref<string[]>([])

useCafeSeo({
  title: () => `${t('order.eyebrow')} — ${info.name}`,
  description: () => t('order.lede'),
})

watch(
  profile,
  (next) => {
    if (!customerName.value && next.name) {
      customerName.value = next.name
    }
    if (!customerEmail.value && next.email) {
      customerEmail.value = next.email
    }
    if (!phone.value && next.phone) {
      phone.value = next.phone
    }
  },
  { deep: true },
)

const showingWait = computed(() => !!active.value)

const step = computed(() => {
  if (showingWait.value) {
    return 3
  }
  if (!lines.value.length) {
    return 1
  }
  return 2
})

const steps = computed(() => [
  { n: 1, label: t('order.stepChoose') },
  { n: 2, label: t('order.stepSend') },
  { n: 3, label: t('order.stepWait') },
])

const kitchenSteps = computed(() => [
  { key: 'received' as const, label: t('order.statusReceived'), hint: t('order.statusReceivedHint') },
  { key: 'preparing' as const, label: t('order.statusPreparing'), hint: t('order.statusPreparingHint') },
  { key: 'ready' as const, label: t('order.statusReady'), hint: t('order.statusReadyHint') },
])

function kitchenIndex(key: string) {
  return kitchenSteps.value.findIndex(s => s.key === key)
}

const waitTitle = computed(() => {
  if (!active.value) {
    return ''
  }
  if (active.value.status === 'ready') {
    return active.value.mode === 'table'
      ? t('order.waitReadyTable')
      : t('order.waitReadyCounter')
  }
  if (active.value.status === 'preparing') {
    return t('order.waitPreparing')
  }
  return t('order.waitReceived')
})

const waitLede = computed(() => {
  if (!active.value) {
    return ''
  }
  if (active.value.status === 'ready') {
    return active.value.mode === 'table'
      ? t('order.waitReadyTableLede')
      : t('order.waitReadyCounterLede')
  }
  if (active.value.mode === 'table') {
    return t('order.waitTableLede', { table: active.value.table || '—' })
  }
  return t('order.waitCounterLede')
})

const progressPct = computed(() => {
  if (!active.value) {
    return 0
  }
  const idx = kitchenIndex(active.value.status)
  if (idx < 0) {
    return 0
  }
  return ((idx + 1) / kitchenSteps.value.length) * 100
})

onMounted(() => {
  watchKitchen()
})

async function submitOrder() {
  if (serviceMode.value === 'table' && !tableNumber.value.trim()) {
    fieldErrors.value = [t('order.tableRequired')]
    status.value = 'error'
    return
  }

  status.value = 'loading'
  feedback.value = ''
  fieldErrors.value = []

  try {
    const result = await $fetch<{
      ok: boolean
      orderId: string
      messageKey: string
      demo?: boolean
    }>('/api/order', {
      method: 'POST',
      body: {
        customerName: customerName.value,
        customerEmail: customerEmail.value,
        phone: phone.value,
        notes: notes.value,
        serviceMode: serviceMode.value,
        tableNumber: tableNumber.value.trim(),
        items: lines.value,
      },
    })

    saveGuest({
      name: customerName.value,
      email: customerEmail.value,
      phone: phone.value,
    })

    start({
      orderId: result.orderId,
      mode: serviceMode.value,
      table: tableNumber.value.trim() || undefined,
      customerName: customerName.value.trim(),
      etaLabel: etaLabel.value,
      etaMaxMinutes: etaRange.value?.max ?? 14,
      status: 'received',
      placedAt: Date.now(),
      items: lines.value.map(line => ({
        name: line.name,
        qty: line.qty,
        note: line.note,
      })),
    })

    toast.success(t('order.sentToast'))
    clear()
    notes.value = ''
    tableNumber.value = ''
    status.value = 'idle'
  }
  catch (error: unknown) {
    status.value = 'error'
    const err = error as {
      data?: { data?: { errors?: string[] }, errors?: string[] }
    }
    fieldErrors.value = (err.data?.data?.errors ?? err.data?.errors ?? []).map((key) => {
      return te(key) ? t(key) : key
    })
    feedback.value = fieldErrors.value.length
      ? t('form.errors.orderCheck')
      : t('form.genericError')
    toast.error(feedback.value)
  }
}

function finishAndOrderAgain() {
  clearActive()
  navigateTo(localePath('/menu'))
}

function dismissTicket() {
  if (!import.meta.client) {
    return
  }
  if (window.confirm(t('order.dismissConfirm'))) {
    clearActive()
  }
}
</script>

<template>
  <div class="section-space">
    <div class="container-site max-w-3xl">
      <header class="mb-8">
        <p class="eyebrow">
          {{ t('order.eyebrow') }}
        </p>
        <h1 class="mb-2 font-display text-[clamp(2.2rem,5vw,3.2rem)] leading-[1.05] tracking-tight">
          {{ showingWait ? t('order.waitTitle') : t('order.title') }}
        </h1>
        <p class="mb-5 max-w-xl text-mute">
          {{ showingWait ? t('order.waitIntro') : t('order.lede') }}
        </p>

        <ol class="m-0 flex list-none items-center gap-0 p-0">
          <template
            v-for="(item, index) in steps"
            :key="item.n"
          >
            <li
              class="flex min-w-0 flex-1 items-center gap-2 rounded-sm border px-3 py-2.5 text-sm transition"
              :class="step >= item.n
                ? 'border-ink/20 bg-mist text-ink'
                : 'border-ink/10 text-mute'"
            >
              <span
                class="grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-medium transition"
                :class="step > item.n
                  ? 'bg-leaf text-foam'
                  : step === item.n
                    ? 'bg-ink text-foam'
                    : 'bg-mist text-mute'"
              >
                <template v-if="step > item.n">
                  ✓
                </template>
                <template v-else>
                  {{ item.n }}
                </template>
              </span>
              <span class="truncate text-xs sm:text-sm">{{ item.label }}</span>
            </li>
            <div
              v-if="index < steps.length - 1"
              class="mx-1 hidden h-px w-4 shrink-0 bg-ink/15 sm:block"
              :class="step > item.n ? '!bg-leaf/50' : ''"
              aria-hidden="true"
            />
          </template>
        </ol>
      </header>

      <!-- Live ticket -->
      <section
        v-if="active"
        class="order-ticket overflow-hidden border border-ink/10 bg-foam"
      >
        <div class="border-b border-ink/10 bg-mist/60 px-5 py-4 sm:px-8 sm:py-5">
          <div class="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p class="mb-1 text-sm font-medium text-leaf">
                {{ t('order.ticket', { id: active.orderId }) }}
              </p>
              <h2 class="font-display text-[clamp(1.55rem,3vw,2.1rem)] tracking-tight">
                {{ waitTitle }}
              </h2>
            </div>
            <div class="rounded-sm border border-ink/10 bg-foam px-3 py-2 text-end">
              <p class="text-xs text-mute">
                {{ elapsedLabel }}
              </p>
              <p class="text-sm font-medium">
                {{ remainingLabel }}
              </p>
            </div>
          </div>
          <p class="mt-3 max-w-lg leading-relaxed text-mute">
            {{ waitLede }}
          </p>
        </div>

        <div class="px-5 py-6 sm:px-8">
          <div
            class="mb-3 h-1.5 overflow-hidden rounded-full bg-ink/10"
            role="progressbar"
            :aria-valuenow="progressPct"
            aria-valuemin="0"
            aria-valuemax="100"
            :aria-label="t('order.ticketLive')"
          >
            <div
              class="h-full rounded-full bg-leaf transition-all duration-700 ease-out"
              :style="{ width: `${progressPct}%` }"
            />
          </div>

          <ol class="mb-8 m-0 grid list-none gap-3 p-0 sm:grid-cols-3">
            <li
              v-for="(item, index) in kitchenSteps"
              :key="item.key"
              class="relative rounded-sm border px-4 py-3 transition duration-500"
              :class="[
                kitchenIndex(active.status) > index
                  ? 'border-leaf/35 bg-leaf/5 text-ink'
                  : kitchenIndex(active.status) === index
                    ? 'border-leaf/50 bg-leaf/10 text-ink ring-1 ring-leaf/20'
                    : 'border-ink/10 text-mute',
                kitchenIndex(active.status) === index && active.status !== 'ready'
                  ? 'order-stage-live'
                  : '',
              ]"
            >
              <p class="text-[0.68rem] uppercase tracking-wide text-mute">
                {{ t('order.stage', { n: index + 1 }) }}
              </p>
              <p class="font-medium">
                {{ item.label }}
              </p>
              <p class="mt-1 text-xs leading-snug text-mute">
                {{ item.hint }}
              </p>
            </li>
          </ol>

          <dl class="mb-8 grid gap-4 border-y border-ink/10 py-5 sm:grid-cols-2">
            <div>
              <dt class="mb-1 text-xs text-mute">
                {{ t('order.forGuest') }}
              </dt>
              <dd class="m-0 font-medium">
                {{ active.customerName }}
              </dd>
            </div>
            <div>
              <dt class="mb-1 text-xs text-mute">
                {{ active.mode === 'table' ? t('order.table') : t('order.serviceCounter') }}
              </dt>
              <dd class="m-0 font-medium">
                {{ active.mode === 'table' ? (active.table || '—') : t('order.counterValue') }}
              </dd>
            </div>
            <div>
              <dt class="mb-1 text-xs text-mute">
                {{ t('order.pickupEta') }}
              </dt>
              <dd class="m-0 font-medium">
                {{ active.etaLabel }}
              </dd>
            </div>
            <div>
              <dt class="mb-1 text-xs text-mute">
                {{ t('order.payNoteTitle') }}
              </dt>
              <dd class="m-0 text-sm text-mute">
                {{ active.mode === 'table' ? t('order.payNoteTable') : t('order.payNote') }}
              </dd>
            </div>
          </dl>

          <p class="mb-2 text-xs font-medium uppercase tracking-wide text-mute">
            {{ t('order.itemsOnTicket') }}
          </p>
          <ul class="mb-8 m-0 list-none space-y-2 border border-ink/10 bg-mist/30 p-4">
            <li
              v-for="(item, index) in active.items"
              :key="`${item.name}-${index}`"
              class="flex justify-between gap-3 text-sm"
            >
              <span>
                <span class="font-medium tabular-nums">{{ item.qty }}×</span>
                {{ item.name }}
                <span
                  v-if="item.note"
                  class="text-mute"
                > — {{ item.note }}</span>
              </span>
            </li>
          </ul>

          <div class="flex flex-wrap items-center gap-3">
            <BaseButton
              v-if="active.status === 'ready'"
              type="button"
              variant="primary"
              @click="finishAndOrderAgain"
            >
              {{ t('order.doneNew') }}
            </BaseButton>
            <BaseButton
              v-else
              type="button"
              variant="ink"
              :to="localePath('/menu')"
            >
              {{ t('order.keepBrowsing') }}
            </BaseButton>
            <button
              type="button"
              class="text-sm text-mute underline-offset-2 hover:text-ink hover:underline"
              @click="dismissTicket"
            >
              {{ t('order.dismissTicket') }}
            </button>
          </div>
        </div>
      </section>

      <template v-else>
        <div class="mb-4 flex flex-wrap items-center justify-between gap-2 text-sm">
          <OpenStatus />
          <p class="text-mute">
            {{ statusLabel }}
          </p>
        </div>

        <section class="mb-6 border border-ink/10 bg-foam">
          <div class="flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 px-4 py-4 sm:px-5">
            <div>
              <h2 class="font-display text-xl tracking-tight">
                {{ t('order.ticketTitle') }}
              </h2>
              <p class="text-sm text-mute">
                {{ count }} {{ count === 1 ? t('order.item') : t('order.items') }}
                <span v-if="lines.length"> · {{ etaLabel }}</span>
              </p>
            </div>
            <BaseButton
              :to="localePath('/menu')"
              variant="ink"
            >
              {{ lines.length ? t('order.addMore') : t('order.browseMenu') }}
            </BaseButton>
          </div>

          <ul
            v-if="lines.length"
            class="m-0 list-none divide-y divide-ink/10 p-0"
          >
            <li
              v-for="line in lines"
              :key="line.id"
              class="px-4 py-4 sm:px-5"
            >
              <div class="flex flex-wrap items-center gap-3">
                <div class="min-w-0 flex-1">
                  <p class="font-medium">
                    {{ line.name }}
                  </p>
                  <p class="text-sm text-mute">
                    {{ line.price }} {{ t('order.each') }}
                  </p>
                </div>

                <div class="flex items-center gap-2">
                  <button
                    type="button"
                    class="grid h-9 w-9 place-items-center rounded-sm border border-ink/15 text-base transition hover:bg-mist"
                    :aria-label="t('order.decrease', { name: line.name })"
                    @click="setQty(line.id, line.qty - 1)"
                  >
                    −
                  </button>
                  <span class="w-6 text-center text-sm font-medium tabular-nums">{{ line.qty }}</span>
                  <button
                    type="button"
                    class="grid h-9 w-9 place-items-center rounded-sm border border-ink/15 text-base transition hover:bg-mist"
                    :aria-label="t('order.increase', { name: line.name })"
                    @click="setQty(line.id, line.qty + 1)"
                  >
                    +
                  </button>
                </div>

                <p class="w-16 text-end text-sm font-medium tabular-nums sm:w-20">
                  {{ lineTotalLabel(line) }}
                </p>

                <button
                  type="button"
                  class="text-xs text-mute underline-offset-2 hover:text-ink hover:underline"
                  @click="removeItem(line.id)"
                >
                  {{ t('order.remove') }}
                </button>
              </div>

              <label class="mt-3 block">
                <span class="sr-only">{{ t('order.lineNote', { name: line.name }) }}</span>
                <input
                  :value="line.note || ''"
                  type="text"
                  maxlength="80"
                  :placeholder="t('order.lineNotePlaceholder')"
                  class="w-full rounded-sm border border-ink/10 bg-mist/30 px-3 py-2 text-sm outline-none transition focus:border-leaf focus:bg-foam"
                  @change="setNote(line.id, ($event.target as HTMLInputElement).value)"
                >
              </label>
            </li>
          </ul>

          <div
            v-else
            class="px-4 py-10 text-center sm:px-5"
          >
            <p class="mb-4 text-mute">
              {{ t('order.empty') }}
            </p>
            <BaseButton
              :to="localePath('/menu')"
              variant="primary"
            >
              {{ t('order.browseMenu') }}
            </BaseButton>
          </div>

          <div
            v-if="lines.length"
            class="flex flex-wrap items-center justify-between gap-3 border-t border-ink/10 bg-mist/50 px-4 py-4 sm:px-5"
          >
            <button
              type="button"
              class="text-sm text-mute underline-offset-2 hover:text-ink hover:underline"
              @click="clear"
            >
              {{ t('order.clearOrder') }}
            </button>
            <p class="text-lg font-medium">
              <span class="me-3 text-sm text-mute">{{ t('order.subtotal') }}</span>
              {{ subtotalLabel }}
            </p>
          </div>
        </section>

        <section
          v-if="lines.length"
          class="border border-ink/10 bg-foam p-4 sm:p-6"
        >
          <h2 class="mb-1 font-display text-xl tracking-tight">
            {{ t('order.detailsTitle') }}
          </h2>
          <p class="mb-5 text-sm text-mute">
            {{ t('order.detailsLede') }}
          </p>

          <div
            class="mb-5 grid gap-2 sm:grid-cols-2"
            role="radiogroup"
            :aria-label="t('order.serviceMode')"
          >
            <button
              type="button"
              class="rounded-sm border px-4 py-3.5 text-start transition"
              :class="serviceMode === 'table'
                ? 'border-ink bg-ink text-foam'
                : 'border-ink/15 hover:border-ink/30'"
              :aria-pressed="serviceMode === 'table'"
              @click="serviceMode = 'table'"
            >
              <span class="block text-sm font-medium">{{ t('order.serviceTable') }}</span>
              <span
                class="mt-1 block text-xs leading-snug"
                :class="serviceMode === 'table' ? 'text-foam/70' : 'text-mute'"
              >{{ t('order.serviceTableHint') }}</span>
            </button>
            <button
              type="button"
              class="rounded-sm border px-4 py-3.5 text-start transition"
              :class="serviceMode === 'counter'
                ? 'border-ink bg-ink text-foam'
                : 'border-ink/15 hover:border-ink/30'"
              :aria-pressed="serviceMode === 'counter'"
              @click="serviceMode = 'counter'"
            >
              <span class="block text-sm font-medium">{{ t('order.serviceCounter') }}</span>
              <span
                class="mt-1 block text-xs leading-snug"
                :class="serviceMode === 'counter' ? 'text-foam/70' : 'text-mute'"
              >{{ t('order.serviceCounterHint') }}</span>
            </button>
          </div>

          <form
            class="grid gap-3"
            @submit.prevent="submitOrder"
          >
            <label
              v-if="serviceMode === 'table'"
              class="grid gap-1.5 text-sm"
            >
              <span class="font-medium">{{ t('order.table') }}</span>
              <input
                v-model="tableNumber"
                required
                type="text"
                inputmode="numeric"
                :placeholder="t('order.tablePlaceholder')"
                class="rounded-sm border border-ink/15 bg-mist/40 px-3 py-3 text-sm outline-none focus:border-leaf focus:bg-foam"
              >
            </label>

            <div class="grid gap-3 sm:grid-cols-2">
              <label class="grid gap-1.5 text-sm">
                <span class="font-medium">{{ t('order.name') }}</span>
                <input
                  v-model="customerName"
                  required
                  type="text"
                  autocomplete="name"
                  class="rounded-sm border border-ink/15 bg-mist/40 px-3 py-3 text-sm outline-none focus:border-leaf focus:bg-foam"
                >
              </label>
              <label class="grid gap-1.5 text-sm">
                <span class="font-medium">{{ t('order.email') }}</span>
                <input
                  v-model="customerEmail"
                  required
                  type="email"
                  autocomplete="email"
                  class="rounded-sm border border-ink/15 bg-mist/40 px-3 py-3 text-sm outline-none focus:border-leaf focus:bg-foam"
                >
              </label>
            </div>
            <label class="grid gap-1.5 text-sm">
              <span class="font-medium">{{ t('order.phone') }}</span>
              <input
                v-model="phone"
                type="tel"
                autocomplete="tel"
                class="rounded-sm border border-ink/15 bg-mist/40 px-3 py-3 text-sm outline-none focus:border-leaf focus:bg-foam"
              >
            </label>
            <label class="grid gap-1.5 text-sm">
              <span class="font-medium">{{ t('order.notes') }}</span>
              <textarea
                v-model="notes"
                rows="3"
                :placeholder="t('order.notesPlaceholder')"
                class="rounded-sm border border-ink/15 bg-mist/40 px-3 py-3 text-sm outline-none focus:border-leaf focus:bg-foam"
              />
            </label>

            <p
              v-if="profile.name"
              class="text-xs text-mute"
            >
              {{ t('order.savedGuest') }}
            </p>

            <ul
              v-if="fieldErrors.length"
              class="list-disc space-y-1 pe-5 ps-5 text-sm text-red-800"
            >
              <li
                v-for="error in fieldErrors"
                :key="error"
              >
                {{ error }}
              </li>
            </ul>

            <p
              v-if="feedback && status === 'error'"
              class="text-sm text-mute"
            >
              {{ feedback }}
            </p>

            <div class="mt-2 rounded-sm border border-ink/10 bg-mist/40 px-4 py-3 text-sm leading-relaxed text-mute">
              {{ serviceMode === 'table' ? t('order.payNoteTable') : t('order.payNote') }}
            </div>

            <BaseButton
              type="submit"
              variant="primary"
              class="mt-1"
              :disabled="status === 'loading' || !isOpen"
            >
              {{ status === 'loading' ? t('order.sending') : t('order.place') }}
            </BaseButton>
            <p
              v-if="!isOpen"
              class="text-xs text-mute"
            >
              {{ t('order.etaClosedHint') }}
            </p>
          </form>
        </section>
      </template>
    </div>
  </div>
</template>
