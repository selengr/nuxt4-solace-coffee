import type { DayHours } from '~/types/cafe'

function toMinutes(value: string) {
  const [hours, minutes] = value.split(':').map(Number)
  return hours * 60 + minutes
}

export function useCafeHours() {
  const { info } = useCafe()
  const { t } = useI18n()
  const { tx } = useLocaleText()

  const now = useState('cafe-now', () => new Date())

  if (import.meta.client) {
    onMounted(() => {
      now.value = new Date()
      const timer = window.setInterval(() => {
        now.value = new Date()
      }, 60_000)
      onUnmounted(() => window.clearInterval(timer))
    })
  }

  const todaySchedule = computed<DayHours | undefined>(() => {
    const day = now.value.getDay()
    return info.schedule.find(entry => entry.days.includes(day))
  })

  const currentMinutes = computed(() =>
    now.value.getHours() * 60 + now.value.getMinutes(),
  )

  const isOpen = computed(() => {
    const schedule = todaySchedule.value
    if (!schedule) {
      return false
    }
    return (
      currentMinutes.value >= toMinutes(schedule.open)
      && currentMinutes.value < toMinutes(schedule.close)
    )
  })

  const minutesUntilClose = computed(() => {
    const schedule = todaySchedule.value
    if (!schedule || !isOpen.value) {
      return null
    }
    return toMinutes(schedule.close) - currentMinutes.value
  })

  const closesSoon = computed(() => {
    const remaining = minutesUntilClose.value
    return remaining !== null && remaining > 0 && remaining <= 60
  })

  const nextOpenSchedule = computed<DayHours | undefined>(() => {
    if (isOpen.value) {
      return todaySchedule.value
    }
    const today = now.value.getDay()
    const schedule = todaySchedule.value
    if (schedule && currentMinutes.value < toMinutes(schedule.open)) {
      return schedule
    }
    for (let offset = 1; offset <= 7; offset += 1) {
      const day = (today + offset) % 7
      const entry = info.schedule.find(item => item.days.includes(day))
      if (entry) {
        return entry
      }
    }
    return undefined
  })

  const nextOpenLabel = computed(() => {
    const schedule = nextOpenSchedule.value
    if (!schedule) {
      return t('hours.unavailable')
    }
    const opensToday = todaySchedule.value === schedule
      && currentMinutes.value < toMinutes(schedule.open)
    if (opensToday) {
      return t('hours.opensToday', { time: schedule.open })
    }
    return t('hours.opensNext', {
      day: tx(schedule.label),
      time: schedule.open,
    })
  })

  const statusLabel = computed(() => {
    const schedule = todaySchedule.value
    if (!schedule) {
      return t('hours.unavailable')
    }
    if (isOpen.value) {
      if (closesSoon.value && minutesUntilClose.value !== null) {
        return t('hours.closesSoon', { minutes: minutesUntilClose.value })
      }
      return t('hours.openNow', { time: schedule.close })
    }
    return t('hours.closed', { time: schedule.open })
  })

  const weekRows = computed(() =>
    info.schedule.map(entry => ({
      label: tx(entry.label),
      range: `${entry.open}–${entry.close}`,
      isToday: entry.days.includes(now.value.getDay()),
    })),
  )

  const todayRangeLabel = computed(() => {
    const schedule = todaySchedule.value
    if (!schedule) {
      return t('hours.unavailable')
    }
    return `${t('hours.today')} · ${schedule.open}–${schedule.close}`
  })

  return {
    isOpen,
    statusLabel,
    todaySchedule,
    closesSoon,
    minutesUntilClose,
    nextOpenLabel,
    weekRows,
    todayRangeLabel,
  }
}
