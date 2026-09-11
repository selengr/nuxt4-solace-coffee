const CONSENT_KEY = 'solace-consent-v1'

export function useConsent() {
  const accepted = useState<boolean | null>('solace-consent', () => null)

  function hydrate() {
    if (!import.meta.client || accepted.value !== null) {
      return
    }
    try {
      accepted.value = localStorage.getItem(CONSENT_KEY) === '1'
    }
    catch {
      accepted.value = false
    }
  }

  function accept() {
    accepted.value = true
    if (import.meta.client) {
      try {
        localStorage.setItem(CONSENT_KEY, '1')
      }
      catch {
        // ignore
      }
    }
  }

  if (import.meta.client) {
    hydrate()
  }

  const showBanner = computed(() => accepted.value === false)

  return {
    accepted,
    showBanner,
    accept,
    hydrate,
  }
}
