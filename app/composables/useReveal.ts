export function useReveal(options: IntersectionObserverInit = { threshold: 0.12, rootMargin: '0px 0px -4% 0px' }) {
  const el = ref<HTMLElement | null>(null)
  const visible = ref(false)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!import.meta.client || !el.value) {
      visible.value = true
      return
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      visible.value = true
      return
    }

    const markVisible = () => {
      visible.value = true
      observer?.disconnect()
      observer = null
    }

    observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        markVisible()
      }
    }, options)
    observer.observe(el.value)

    // If already in (or near) the viewport on mount, reveal immediately.
    const rect = el.value.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
      markVisible()
    }
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return { el, visible }
}
