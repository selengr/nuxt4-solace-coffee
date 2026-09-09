<script setup lang="ts">
const { info } = useCafe()

useSeoMeta({
  title: `Contact — ${info.name}`,
  description: 'Write to Solace Coffee for events, catering, or general questions.',
})
</script>

<template>
  <div class="section-space">
    <div class="container-site grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <p class="eyebrow">
          Contact
        </p>
        <h1 class="mb-4 max-w-[12ch] text-[clamp(2.4rem,6vw,3.4rem)]">
          Say hello.
        </h1>
        <p class="mb-8 max-w-md text-mute">
          Questions about the café, private mornings, or wholesale beans —
          send a note and we’ll get back within one or two business days.
        </p>

        <div class="space-y-5 text-sm">
          <div>
            <p class="mb-1 text-[0.7rem] uppercase tracking-[0.12em] text-leaf">
              Email
            </p>
            <a :href="`mailto:${info.email}`">{{ info.email }}</a>
          </div>
          <div>
            <p class="mb-1 text-[0.7rem] uppercase tracking-[0.12em] text-leaf">
              Phone
            </p>
            <p>{{ info.phone }}</p>
          </div>
          <div>
            <p class="mb-1 text-[0.7rem] uppercase tracking-[0.12em] text-leaf">
              Social
            </p>
            <p>{{ info.instagram }}</p>
          </div>
        </div>
      </div>

      <div class="rounded-md border border-ink/10 bg-mist p-6 sm:p-8">
        <ContactForm />
      </div>
    </div>
  </div>
</template>
