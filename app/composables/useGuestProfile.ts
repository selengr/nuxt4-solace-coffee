export interface GuestProfile {
  name: string
  email: string
  phone: string
}

const GUEST_KEY = 'solace-guest-v1'

export function useGuestProfile() {
  const profile = useState<GuestProfile>('solace-guest', () => ({
    name: '',
    email: '',
    phone: '',
  }))
  const hydrated = useState('solace-guest-hydrated', () => false)

  function hydrate() {
    if (!import.meta.client || hydrated.value) {
      return
    }
    hydrated.value = true
    try {
      const raw = localStorage.getItem(GUEST_KEY)
      if (!raw) {
        return
      }
      const parsed = JSON.parse(raw) as Partial<GuestProfile>
      profile.value = {
        name: typeof parsed.name === 'string' ? parsed.name : '',
        email: typeof parsed.email === 'string' ? parsed.email : '',
        phone: typeof parsed.phone === 'string' ? parsed.phone : '',
      }
    }
    catch {
      // ignore
    }
  }

  function save(next: Partial<GuestProfile>) {
    profile.value = {
      name: next.name?.trim() ?? profile.value.name,
      email: next.email?.trim() ?? profile.value.email,
      phone: next.phone?.trim() ?? profile.value.phone,
    }
    if (!import.meta.client) {
      return
    }
    try {
      localStorage.setItem(GUEST_KEY, JSON.stringify(profile.value))
    }
    catch {
      // ignore
    }
  }

  if (import.meta.client) {
    hydrate()
  }

  return {
    profile,
    save,
  }
}
