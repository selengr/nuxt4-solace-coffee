import type { CafeInfo, MenuItem } from '~/types/cafe'

export const cafeInfo: CafeInfo = {
  name: 'Northroom',
  tagline: 'Specialty coffee, slow mornings, honest space.',
  address: '48 Harbor Lane',
  city: 'Portland, OR',
  hours: [
    'Mon–Fri · 7:00–18:00',
    'Sat–Sun · 8:00–17:00',
  ],
  phone: '+1 (503) 555-0148',
  email: 'hello@northroom.cafe',
}

export const menuItems: MenuItem[] = [
  {
    id: 'house-espresso',
    name: 'House Espresso',
    description: 'Chocolate, hazelnut, clean finish — our daily blend.',
    price: '$3.50',
    category: 'espresso',
    featured: true,
  },
  {
    id: 'oat-latte',
    name: 'Oat Latte',
    description: 'Silky oat milk over a double shot, lightly sweet.',
    price: '$4.75',
    category: 'espresso',
    featured: true,
  },
  {
    id: 'pour-over',
    name: 'Single-Origin Pour Over',
    description: 'Rotating microlot. Ask for today’s origin card.',
    price: '$5.50',
    category: 'brew',
    featured: true,
  },
  {
    id: 'cold-brew',
    name: 'Slow Cold Brew',
    description: '18-hour steep, bright and low-acid.',
    price: '$4.50',
    category: 'brew',
  },
  {
    id: 'filter-batch',
    name: 'Batch Filter',
    description: 'Easy drinking house filter, always fresh.',
    price: '$3.25',
    category: 'brew',
  },
  {
    id: 'cortado',
    name: 'Cortado',
    description: 'Equal parts espresso and steamed milk.',
    price: '$4.00',
    category: 'espresso',
  },
  {
    id: 'sourdough',
    name: 'Sourdough Toast',
    description: 'Cultured butter, sea salt, seasonal preserve.',
    price: '$6.00',
    category: 'food',
    featured: true,
  },
  {
    id: 'granola',
    name: 'House Granola Bowl',
    description: 'Yogurt, honey, toasted oats, and fruit.',
    price: '$8.50',
    category: 'food',
  },
]
