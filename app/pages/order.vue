<script setup lang="ts">
const { info } = useCafe()
const { t, te } = useI18n()
const localePath = useLocalePath()
const { lines, count, subtotalLabel, setQty, clear } = useCart()
const { etaLabel } = usePickupEta()
const { isOpen } = useCafeHours()

const customerName = ref('')
const customerEmail = ref('')
const phone = ref('')
const notes = ref('')

const toast = useToast()
const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const feedback = ref('')
const fieldErrors = ref<string[]>([])
const orderId = ref('')

useSeoMeta({
  title: () => `${t('order.eyebrow')} — ${info.name}`,
  description: () => t('order.lede'),
})

async function submitOrder() {
  status.value = 'loading'
  feedback.value = ''
  fieldErrors.value = []
  orderId.value = ''

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
        items: lines.value,
      },
    })

    status.value = 'success'
    feedback.value = t(result.messageKey, { orderId: result.orderId })
    orderId.value = result.orderId
    toast.success(feedback.value)
    clear()
    customerName.value = ''
    customerEmail.value = ''
    phone.value = ''
    notes.value = ''
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
</script>

<template>
  <div class="section-space">
    <div class="container-site max-w-2xl">
      <p class="eyebrow">
        {{ t('order.eyebrow') }}
      </p>
      <h1 class="mb-3 text-[clamp(2.4rem,6vw,3.5rem)] leading-snug">
        {{ t('order.title') }}
      </h1>
      <p class="mb-8 max-w-xl leading-relaxed text-mute">
        {{ t('order.lede') }}
      </p>

      <div class="rounded-md border border-ink/10 bg-mist p-5 sm:p-6">
        <div class="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 class="mb-1 text-2xl">
              {{ t('order.bag') }}
            </h2>
            <p class="text-sm text-mute">
              {{ count }} {{ count === 1 ? t('order.item') : t('order.items') }}
              <span
                v-if="lines.length"
                class="ms-1"
              >· {{ etaLabel }}</span>
            </p>
          </div>
          <BaseButton
            :to="localePath('/menu')"
            variant="ink"
          >
            {{ t('order.browseMenu') }}
          </BaseButton>
        </div>

        <ul
          v-if="lines.length"
          class="mb-5 space-y-3"
        >
          <li
            v-for="line in lines"
            :key="line.id"
            class="flex items-center justify-between gap-3 border-b border-ink/10 pb-3"
          >
            <div>
              <p class="font-medium">
                {{ line.name }}
              </p>
              <p class="text-sm text-mute">
                {{ line.price }}
              </p>
            </div>
            <div class="flex items-center gap-2">
              <button
                type="button"
                class="h-8 w-8 rounded-sm border border-ink/15"
                :aria-label="t('order.decrease', { name: line.name })"
                @click="setQty(line.id, line.qty - 1)"
              >
                −
              </button>
              <span
                class="w-6 text-center text-sm"
                :aria-label="t('order.quantity', { name: line.name, qty: line.qty })"
              >{{ line.qty }}</span>
              <button
                type="button"
                class="h-8 w-8 rounded-sm border border-ink/15"
                :aria-label="t('order.increase', { name: line.name })"
                @click="setQty(line.id, line.qty + 1)"
              >
                +
              </button>
            </div>
          </li>
        </ul>
        <div
          v-else
          class="mb-5 rounded-sm border border-dashed border-ink/15 bg-foam/70 px-4 py-8 text-center"
        >
          <p class="mb-4 text-sm leading-relaxed text-mute">
            {{ t('order.empty') }}
          </p>
          <BaseButton
            :to="localePath('/menu')"
            variant="primary"
          >
            {{ t('order.browseMenu') }}
          </BaseButton>
        </div>

        <template v-if="lines.length">
          <p class="mb-5 flex justify-between font-medium">
            <span>{{ t('order.subtotal') }}</span>
            <span>{{ subtotalLabel }}</span>
          </p>

          <form
            class="grid gap-3"
            @submit.prevent="submitOrder"
          >
            <label class="grid gap-1.5 text-sm">
              <span class="font-medium">{{ t('order.name') }}</span>
              <input
                v-model="customerName"
                required
                type="text"
                autocomplete="name"
                class="rounded-sm border border-ink/15 bg-foam px-3 py-3 text-sm outline-none focus:border-leaf"
              >
            </label>
            <label class="grid gap-1.5 text-sm">
              <span class="font-medium">{{ t('order.email') }}</span>
              <input
                v-model="customerEmail"
                required
                type="email"
                autocomplete="email"
                class="rounded-sm border border-ink/15 bg-foam px-3 py-3 text-sm outline-none focus:border-leaf"
              >
            </label>
            <label class="grid gap-1.5 text-sm">
              <span class="font-medium">{{ t('order.phone') }}</span>
              <input
                v-model="phone"
                type="tel"
                autocomplete="tel"
                class="rounded-sm border border-ink/15 bg-foam px-3 py-3 text-sm outline-none focus:border-leaf"
              >
            </label>
            <label class="grid gap-1.5 text-sm">
              <span class="font-medium">{{ t('order.notes') }}</span>
              <textarea
                v-model="notes"
                rows="3"
                class="rounded-sm border border-ink/15 bg-foam px-3 py-3 text-sm outline-none focus:border-leaf"
              />
            </label>

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
              v-if="feedback"
              class="text-sm"
              :class="status === 'success' ? 'text-leaf' : 'text-mute'"
            >
              {{ feedback }}
              <span
                v-if="orderId"
                class="mt-1 block font-medium"
              >{{ orderId }}</span>
            </p>

            <BaseButton
              type="submit"
              variant="primary"
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
        </template>
      </div>
    </div>
  </div>
</template>
