<script setup lang="ts">
const { info } = useCafe()
const config = useRuntimeConfig()

const siteUrl = computed(
  () => config.public.siteUrl || 'https://solace.coffee',
)

const jsonLd = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'CafeOrCoffeeShop',
  'name': `${info.name} Coffee`,
  'description': info.tagline.en,
  'url': siteUrl.value,
  'telephone': info.phone,
  'email': info.email,
  'image': 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80',
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': info.address,
    'addressLocality': 'Seattle',
    'addressRegion': 'WA',
    'addressCountry': 'US',
  },
  'geo': {
    '@type': 'GeoCoordinates',
    'latitude': info.geo.lat,
    'longitude': info.geo.lng,
  },
  'openingHoursSpecification': info.schedule.map(entry => ({
    '@type': 'OpeningHoursSpecification',
    'dayOfWeek': entry.days.map((day) => {
      const names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      return names[day]
    }),
    'opens': entry.open,
    'closes': entry.close,
  })),
  'servesCuisine': 'Coffee',
  'priceRange': '$$',
}))

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: () => JSON.stringify(jsonLd.value),
    },
  ],
})
</script>

<template>
  <span class="hidden" />
</template>
