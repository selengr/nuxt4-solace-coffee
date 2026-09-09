import { cafeEvents, cafeInfo, cafeValues, menuItems, testimonials } from '~/data/menu'
import type { MenuItem } from '~/types/cafe'

export function useCafe() {
  const featured = computed(() =>
    menuItems.filter((item: MenuItem) => item.featured),
  )

  const byCategory = (category: MenuItem['category']) =>
    menuItems.filter((item: MenuItem) => item.category === category)

  return {
    info: cafeInfo,
    values: cafeValues,
    menu: menuItems,
    testimonials,
    events: cafeEvents,
    featured,
    byCategory,
  }
}
