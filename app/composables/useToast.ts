export type ToastTone = 'success' | 'error' | 'info'

export interface ToastItem {
  id: number
  message: string
  tone: ToastTone
}

export function useToast() {
  const toasts = useState<ToastItem[]>('solace-toasts', () => [])

  function dismiss(id: number) {
    toasts.value = toasts.value.filter(toast => toast.id !== id)
  }

  function push(message: string, tone: ToastTone = 'info') {
    const id = Date.now() + Math.floor(Math.random() * 1000)
    toasts.value = [...toasts.value, { id, message, tone }]
    if (import.meta.client) {
      window.setTimeout(() => dismiss(id), 4200)
    }
  }

  return {
    toasts,
    push,
    dismiss,
    success: (message: string) => push(message, 'success'),
    error: (message: string) => push(message, 'error'),
    info: (message: string) => push(message, 'info'),
  }
}
