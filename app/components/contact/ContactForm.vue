<script setup lang="ts">
const form = reactive({
  name: '',
  email: '',
  message: '',
})

const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const feedback = ref('')
const fieldErrors = ref<string[]>([])

async function onSubmit() {
  status.value = 'loading'
  feedback.value = ''
  fieldErrors.value = []

  try {
    const result = await $fetch<{ ok: boolean, message: string }>('/api/contact', {
      method: 'POST',
      body: { ...form },
    })

    status.value = 'success'
    feedback.value = result.message
    form.name = ''
    form.email = ''
    form.message = ''
  }
  catch (error: unknown) {
    status.value = 'error'
    const err = error as {
      data?: { data?: { errors?: string[] }, errors?: string[], message?: string }
      message?: string
    }
    fieldErrors.value = err.data?.data?.errors ?? err.data?.errors ?? []
    feedback.value = fieldErrors.value.length
      ? 'Please check the form and try again.'
      : 'Something went wrong. Please try again or email us directly.'
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
        <span class="font-medium">Name</span>
        <input
          v-model="form.name"
          type="text"
          name="name"
          autocomplete="name"
          required
          class="rounded-sm border border-ink/15 bg-foam px-3 py-3 outline-none transition focus:border-leaf"
          placeholder="Your name"
        >
      </label>

      <label class="grid gap-2 text-sm">
        <span class="font-medium">Email</span>
        <input
          v-model="form.email"
          type="email"
          name="email"
          autocomplete="email"
          required
          class="rounded-sm border border-ink/15 bg-foam px-3 py-3 outline-none transition focus:border-leaf"
          placeholder="you@email.com"
        >
      </label>
    </div>

    <label class="grid gap-2 text-sm">
      <span class="font-medium">Message</span>
      <textarea
        v-model="form.message"
        name="message"
        rows="6"
        required
        class="resize-y rounded-sm border border-ink/15 bg-foam px-3 py-3 outline-none transition focus:border-leaf"
        placeholder="Private events, catering, feedback, or just hello…"
      />
    </label>

    <ul
      v-if="fieldErrors.length"
      class="list-disc space-y-1 pl-5 text-sm text-red-800"
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
        {{ status === 'loading' ? 'Sending…' : 'Send message' }}
      </BaseButton>
    </div>
  </form>
</template>
