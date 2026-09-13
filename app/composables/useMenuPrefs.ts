const FAVORITES_KEY = 'solace-menu-favorites-v1'
const RECENT_KEY = 'solace-menu-recent-v1'
const RECENT_LIMIT = 6

export function useMenuPrefs() {
  const favorites = useState<string[]>('solace-favorites', () => [])
  const recent = useState<string[]>('solace-recent', () => [])
  const hydrated = useState('solace-menu-prefs-hydrated', () => false)
  const watching = useState<'off' | 'on'>('solace-menu-prefs-watching', () => 'off')

  function readList(key: string) {
    try {
      const raw = localStorage.getItem(key)
      if (!raw) {
        return [] as string[]
      }
      const parsed = JSON.parse(raw) as unknown
      return Array.isArray(parsed) ? parsed.filter(item => typeof item === 'string') : []
    }
    catch {
      return [] as string[]
    }
  }

  function writeList(key: string, value: string[]) {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    }
    catch {
      // ignore
    }
  }

  function hydrate() {
    if (!import.meta.client || hydrated.value) {
      return
    }
    hydrated.value = true
    favorites.value = readList(FAVORITES_KEY)
    recent.value = readList(RECENT_KEY)
  }

  if (import.meta.client) {
    hydrate()
    if (watching.value === 'off') {
      watching.value = 'on'
      watch(favorites, value => writeList(FAVORITES_KEY, value), { deep: true })
      watch(recent, value => writeList(RECENT_KEY, value), { deep: true })
    }
  }

  function isFavorite(id: string) {
    return favorites.value.includes(id)
  }

  function toggleFavorite(id: string) {
    if (isFavorite(id)) {
      favorites.value = favorites.value.filter(entry => entry !== id)
      return
    }
    favorites.value = [...favorites.value, id]
  }

  function trackView(id: string) {
    recent.value = [id, ...recent.value.filter(entry => entry !== id)].slice(0, RECENT_LIMIT)
  }

  return {
    favorites,
    recent,
    isFavorite,
    toggleFavorite,
    trackView,
  }
}
