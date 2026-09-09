export function useReveal(options: IntersectionObserverInit = { threshold: 0.16, rootMargin: '0px 0px -8% 0px' }) {
  const el = ref<HTMLElement | null>(null)
  const visible = ref(false)

  onMounted(() => {
    if (!el.value || import.meta.server) {
      return
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      visible.value = true
      return
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        visible.value = true
        observer.disconnect()
      }
    }, options)
    observer.observe(el.value)
    onUnmounted(() => observer.disconnect())
  })

  return { el, visible }
}
