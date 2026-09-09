<script setup lang="ts">
const { info, events } = useCafe()
const localePath = useLocalePath()
const toast = useToast()

useSeoMeta({
  title: `Events — ${info.name}`,
  description: 'Cuppings, workshops, and private morning hire at Solace Coffee.',
})

const inquiry = reactive({
  name: '',
  email: '',
  message: '',
})

const status = ref<'idle' | 'loading'>('idle')

async function submitInquiry() {
  status.value = 'loading'
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: inquiry.name,
        email: inquiry.email,
        message: `[Events inquiry]\n${inquiry.message}`,
      },
    })
    toast.success('Thanks — we received your events inquiry.')
    inquiry.name = ''
    inquiry.email = ''
    inquiry.message = ''
  }
  catch {
    toast.error('Could not send inquiry. Try again or email us.')
  }
  finally {
    status.value = 'idle'
  }
}
</script>

<template>
  <div class="section-space">
    <div class="container-site">
      <p class="eyebrow">
        Events
      </p>
      <h1 class="mb-3 max-w-[14ch] text-[clamp(2.4rem,6vw,3.5rem)]">
        Cuppings, workshops, quiet mornings.
      </h1>
      <p class="mb-12 max-w-xl text-mute">
        Public tastings and private hire — keep the room calm, keep the coffee sharp.
      </p>

      <ul class="mb-16 grid list-none gap-6 p-0 md:grid-cols-3">
        <li
          v-for="event in events"
          :key="event.id"
          class="border border-ink/10 p-6"
        >
          <p class="mb-3 text-[0.7rem] uppercase tracking-[0.12em] text-leaf">
            {{ event.type }}
          </p>
          <h2 class="mb-2 text-xl">
            {{ event.title }}
          </h2>
          <p class="mb-1 text-sm font-medium">
            {{ event.date }} · {{ event.time }}
          </p>
          <p class="text-sm text-mute">
            {{ event.description }}
          </p>
        </li>
      </ul>

      <div class="grid gap-10 rounded-md bg-mist p-6 sm:p-8 lg:grid-cols-2">
        <div>
          <h2 class="mb-3 text-2xl">
            Book the room
          </h2>
          <p class="mb-4 text-mute">
            Tell us about your group size, date, and whether you want a tasting flight or just the space.
          </p>
          <BaseButton :to="localePath('/contact')">
            Or use the contact page
          </BaseButton>
        </div>

        <form
          class="grid gap-3"
          @submit.prevent="submitInquiry"
        >
          <input
            v-model="inquiry.name"
            required
            type="text"
            placeholder="Your name"
            class="rounded-sm border border-ink/15 bg-foam px-3 py-3 text-sm outline-none focus:border-leaf"
          >
          <input
            v-model="inquiry.email"
            required
            type="email"
            placeholder="Email"
            class="rounded-sm border border-ink/15 bg-foam px-3 py-3 text-sm outline-none focus:border-leaf"
          >
          <textarea
            v-model="inquiry.message"
            required
            rows="5"
            placeholder="Event details…"
            class="rounded-sm border border-ink/15 bg-foam px-3 py-3 text-sm outline-none focus:border-leaf"
          />
          <BaseButton
            type="submit"
            variant="ink"
            :disabled="status === 'loading'"
          >
            {{ status === 'loading' ? 'Sending…' : 'Send inquiry' }}
          </BaseButton>
        </form>
      </div>
    </div>
  </div>
</template>
