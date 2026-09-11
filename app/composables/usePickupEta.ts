export function usePickupEta() {
  const { count } = useCart()
  const { isOpen, closesSoon, minutesUntilClose } = useCafeHours()
  const { t } = useI18n()

  const etaMinutes = computed(() => {
    if (!isOpen.value) {
      return null
    }
    const base = 8
    const perItem = 2
    let total = base + Math.max(0, count.value) * perItem
    if (closesSoon.value && minutesUntilClose.value !== null) {
      total = Math.min(total, Math.max(5, minutesUntilClose.value - 2))
    }
    return Math.min(35, Math.max(8, total))
  })

  const etaRange = computed(() => {
    const mid = etaMinutes.value
    if (mid === null) {
      return null
    }
    return {
      min: mid,
      max: mid + 6,
    }
  })

  const etaLabel = computed(() => {
    if (!isOpen.value) {
      return t('order.etaClosed')
    }
    const range = etaRange.value
    if (!range || count.value === 0) {
      return t('order.etaEmpty')
    }
    return t('order.etaReady', { min: range.min, max: range.max })
  })

  return {
    etaMinutes,
    etaRange,
    etaLabel,
  }
}
