const DEFAULT_OG_IMAGE
  = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&h=630&q=80'

export function useCafeSeo(options: {
  title: MaybeRefOrGetter<string>
  description: MaybeRefOrGetter<string>
  image?: MaybeRefOrGetter<string | undefined>
  type?: 'website' | 'article'
}) {
  const config = useRuntimeConfig()
  const route = useRoute()

  const siteUrl = computed(() => String(config.public.siteUrl || 'https://solace.coffee').replace(/\/$/, ''))
  const pageUrl = computed(() => `${siteUrl.value}${route.fullPath}`)
  const ogImage = computed(() => toValue(options.image) || DEFAULT_OG_IMAGE)

  useSeoMeta({
    title: () => toValue(options.title),
    description: () => toValue(options.description),
    ogTitle: () => toValue(options.title),
    ogDescription: () => toValue(options.description),
    ogType: options.type || 'website',
    ogUrl: () => pageUrl.value,
    ogImage: () => ogImage.value,
    ogImageAlt: () => toValue(options.title),
    twitterCard: 'summary_large_image',
    twitterTitle: () => toValue(options.title),
    twitterDescription: () => toValue(options.description),
    twitterImage: () => ogImage.value,
  })

  useHead({
    link: [
      {
        rel: 'canonical',
        href: () => pageUrl.value,
      },
    ],
  })
}
