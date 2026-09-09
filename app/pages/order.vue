<script setup lang="ts">
const { info, menu } = useCafe()
const { t, te } = useI18n()
const { tx } = useLocaleText()
const { lines, count, subtotalLabel, addItem, setQty, clear } = useCart()

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
    <div class="container-site">
      <p class="eyebrow">
        {{ t('order.eyebrow') }}
      </p>
      <h1 class="mb-3 text-[clamp(2.4rem,6vw,3.5rem)] leading-snug">
        {{ t('order.title') }}
      </h1>
      <p class="mb-10 max-w-xl leading-relaxed text-mute">
        {{ t('order.lede') }}
      </p>

      <div class="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <section>
          <h2 class="mb-4 text-2xl">
            {{ t('order.menu') }}
          </h2>
          <ul class="m-0 grid list-none gap-3 p-0">
            <li
              v-for="item in menu"
              :key="item.id"
              class="flex flex-wrap items-center justify-between gap-3 border border-ink/10 bg-foam px-4 py-4"
            >
              <div class="min-w-0">
                <p class="font-display text-lg">
                  {{ tx(item.name) }}
                </p>
                <p class="text-sm leading-relaxed text-mute">
                  {{ tx(item.description) }}
                </p>
                <p class="mt-1 text-sm font-medium">
                  {{ item.price }}
                </p>
              </div>
              <BaseButton
                variant="ink"
                type="button"
                @click="addItem(item, tx(item.name))"
              >
                {{ t('order.add') }}
              </BaseButton>
            </li>
          </ul>
        </section>

        <aside class="h-fit rounded-md border border-ink/10 bg-mist p-5 sm:p-6 lg:sticky lg:top-24">
          <h2 class="mb-1 text-2xl">
            {{ t('order.bag') }}
          </h2>
          <p class="mb-5 text-sm text-mute">
            {{ count }} {{ count === 1 ? t('order.item') : t('order.items') }}
          </p>

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
                  @click="setQty(line.id, line.qty - 1)"
                >
                  −
                </button>
                <span class="w-6 text-center text-sm">{{ line.qty }}</span>
                <button
                  type="button"
                  class="h-8 w-8 rounded-sm border border-ink/15"
                  @click="setQty(line.id, line.qty + 1)"
                >
                  +
                </button>
              </div>
            </li>
          </ul>
          <p
            v-else
            class="mb-5 text-sm text-mute"
          >
            {{ t('order.empty') }}
          </p>

          <p class="mb-5 flex justify-between font-medium">
            <span>{{ t('order.subtotal') }}</span>
            <span>{{ subtotalLabel }}</span>
          </p>

          <form
            class="grid gap-3"
            @submit.prevent="submitOrder"
          >
            <input
              v-model="customerName"
              required
              type="text"
              :placeholder="t('order.name')"
              class="rounded-sm border border-ink/15 bg-foam px-3 py-3 text-sm outline-none focus:border-leaf"
            >
            <input
              v-model="customerEmail"
              required
              type="email"
              :placeholder="t('order.email')"
              class="rounded-sm border border-ink/15 bg-foam px-3 py-3 text-sm outline-none focus:border-leaf"
            >
            <input
              v-model="phone"
              type="tel"
              :placeholder="t('order.phone')"
              class="rounded-sm border border-ink/15 bg-foam px-3 py-3 text-sm outline-none focus:border-leaf"
            >
            <textarea
              v-model="notes"
              rows="3"
              :placeholder="t('order.notes')"
              class="rounded-sm border border-ink/15 bg-foam px-3 py-3 text-sm outline-none focus:border-leaf"
            />

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
              :disabled="status === 'loading' || !lines.length"
            >
              {{ status === 'loading' ? t('order.sending') : t('order.place') }}
            </BaseButton>
          </form>
        </aside>
      </div>
    </div>
  </div>
</template>
