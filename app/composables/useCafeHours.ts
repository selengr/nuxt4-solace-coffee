import type { DayHours } from '~/types/cafe'

function toMinutes(value: string) {
  const [hours, minutes] = value.split(':').map(Number)
  return hours * 60 + minutes
}

export function useCafeHours() {
  const { info } = useCafe()
  const { t } = useI18n()

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

  const isOpen = computed(() => {
    const schedule = todaySchedule.value
    if (!schedule) {
      return false
    }
    const current = now.value.getHours() * 60 + now.value.getMinutes()
    return current >= toMinutes(schedule.open) && current < toMinutes(schedule.close)
  })

  const statusLabel = computed(() => {
    const schedule = todaySchedule.value
    if (!schedule) {
      return t('hours.unavailable')
    }
    return isOpen.value
      ? t('hours.openNow', { time: schedule.close })
      : t('hours.closed', { time: schedule.open })
  })

  return {
    isOpen,
    statusLabel,
    todaySchedule,
  }
}
