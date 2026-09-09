<script setup lang="ts">
const { t, te } = useI18n()
const form = reactive({
  name: '',
  email: '',
  message: '',
})

const toast = useToast()
const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const feedback = ref('')
const fieldErrors = ref<string[]>([])

function translateKey(key: string) {
  return te(key) ? t(key) : key
}

async function onSubmit() {
  status.value = 'loading'
  feedback.value = ''
  fieldErrors.value = []

  try {
    const result = await $fetch<{ ok: boolean, messageKey: string }>('/api/contact', {
      method: 'POST',
      body: { ...form },
    })

    status.value = 'success'
    feedback.value = t(result.messageKey)
    toast.success(feedback.value)
    form.name = ''
    form.email = ''
    form.message = ''
  }
  catch (error: unknown) {
    status.value = 'error'
    const err = error as {
      data?: { data?: { errors?: string[] }, errors?: string[] }
    }
    const keys = err.data?.data?.errors ?? err.data?.errors ?? []
    fieldErrors.value = keys.map(translateKey)
    feedback.value = fieldErrors.value.length
      ? t('form.checkForm')
      : t('form.genericError')
    toast.error(feedback.value)
  }
}
</script>

<template>
  <form
    class="grid gap-5"
    @submit.prevent="onSubmit"
  >
    <div class="grid gap-5 sm:grid-cols-2">
      <label class="grid gap-2 text-sm">
        <span class="font-medium">{{ t('form.name') }}</span>
        <input
          v-model="form.name"
          type="text"
          name="name"
          autocomplete="name"
          required
          class="rounded-sm border border-ink/15 bg-foam px-3 py-3 outline-none transition focus:border-leaf"
          :placeholder="t('form.namePlaceholder')"
        >
      </label>

      <label class="grid gap-2 text-sm">
        <span class="font-medium">{{ t('form.email') }}</span>
        <input
          v-model="form.email"
          type="email"
          name="email"
          autocomplete="email"
          required
          class="rounded-sm border border-ink/15 bg-foam px-3 py-3 outline-none transition focus:border-leaf"
          :placeholder="t('form.emailPlaceholder')"
        >
      </label>
    </div>

    <label class="grid gap-2 text-sm">
      <span class="font-medium">{{ t('form.message') }}</span>
      <textarea
        v-model="form.message"
        name="message"
        rows="6"
        required
        class="resize-y rounded-sm border border-ink/15 bg-foam px-3 py-3 outline-none transition focus:border-leaf"
        :placeholder="t('form.messagePlaceholder')"
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
      role="status"
    >
      {{ feedback }}
    </p>

    <div>
      <BaseButton
        type="submit"
        variant="ink"
        :disabled="status === 'loading'"
      >
        {{ status === 'loading' ? t('form.sending') : t('form.send') }}
      </BaseButton>
    </div>
  </form>
</template>
