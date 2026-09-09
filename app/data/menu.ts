import type { CafeEvent, CafeInfo, CafeValue, MenuItem, Testimonial } from '~/types/cafe'

export const cafeInfo: CafeInfo = {
  name: 'Solace',
  tagline: 'Quiet specialty coffee for people who linger.',
  address: '214 Mercer Street',
  city: 'Seattle, WA',
  hours: [
    'Mon–Fri · 7:00–19:00',
    'Sat–Sun · 8:00–18:00',
  ],
  schedule: [
    { days: [1, 2, 3, 4, 5], open: '07:00', close: '19:00', label: 'Mon–Fri' },
    { days: [0, 6], open: '08:00', close: '18:00', label: 'Sat–Sun' },
  ],
  phone: '+1 (206) 555-0192',
  email: 'hello@solace.coffee',
  instagram: '@solace.coffee',
  geo: {
    lat: 47.6245,
    lng: -122.3362,
  },
}

export const cafeValues: CafeValue[] = [
  {
    title: 'Dialed in',
    description:
      'Every espresso recipe is logged, tasted, and adjusted through the day — not set and forgotten.',
  },
  {
    title: 'Short & seasonal',
    description:
      'A focused menu so quality stays high. Food changes with the season; coffee rotates by lot.',
  },
  {
    title: 'Room to breathe',
    description:
      'Soft light, steady music, and tables meant for conversation — or none at all.',
  },
]

export const testimonials: Testimonial[] = [
  {
    id: 'maya',
    quote: 'The pour-over feels like a small ritual. I come for the coffee and stay for the quiet.',
    name: 'Maya R.',
    role: 'Neighbor · Capitol Hill',
  },
  {
    id: 'jon',
    quote: 'Best flat white in the neighborhood — and the staff actually remembers how you take it.',
    name: 'Jon K.',
    role: 'Regular · mornings',
  },
  {
    id: 'sara',
    quote: 'We hosted a private cupping here. Calm room, sharp tasting notes, zero fuss.',
    name: 'Sara L.',
    role: 'Events guest',
  },
]

export const cafeEvents: CafeEvent[] = [
  {
    id: 'saturday-cupping',
    title: 'Saturday Cupping',
    date: 'Every Saturday',
    time: '10:00',
    description: 'Taste three current lots with our bar lead. Free with any brew bar drink.',
    type: 'cupping',
  },
  {
    id: 'milk-workshop',
    title: 'Home Milk Texture Workshop',
    date: 'First Friday monthly',
    time: '18:30',
    description: 'Learn steaming and pouring basics on our training machines. Limited seats.',
    type: 'workshop',
  },
  {
    id: 'private-morning',
    title: 'Private Morning Hire',
    date: 'By request',
    time: '07:00–09:00',
    description: 'Book the room before public hours for teams, tastings, or quiet kickoffs.',
    type: 'private',
  },
]

export const menuItems: MenuItem[] = [
  {
    id: 'solace-espresso',
    name: 'Solace Espresso',
    description: 'Our house blend — cocoa, dried cherry, syrupy body.',
    price: '$3.75',
    category: 'espresso',
    featured: true,
  },
  {
    id: 'oat-latte',
    name: 'Oat Latte',
    description: 'Double ristretto, steamed oat, microfoam finished by hand.',
    price: '$5.25',
    category: 'espresso',
    featured: true,
  },
  {
    id: 'flat-white',
    name: 'Flat White',
    description: 'Velvety milk over a concentrated double shot.',
    price: '$4.75',
    category: 'espresso',
  },
  {
    id: 'cortado',
    name: 'Cortado',
    description: 'Equal parts espresso and steamed milk in a small glass.',
    price: '$4.25',
    category: 'espresso',
  },
  {
    id: 'pour-over',
    name: 'Single-Origin Pour Over',
    description: 'Rotating microlot. Ask for today’s tasting card.',
    price: '$6.00',
    category: 'brew',
    featured: true,
  },
  {
    id: 'cold-brew',
    name: 'Slow Cold Brew',
    description: '20-hour steep, bright and low-acid, served over ice.',
    price: '$4.75',
    category: 'brew',
  },
  {
    id: 'batch-filter',
    name: 'Batch Filter',
    description: 'Clean house filter, brewed fresh every hour.',
    price: '$3.50',
    category: 'brew',
  },
  {
    id: 'tea',
    name: 'Seasonal Tea',
    description: 'Loose-leaf selection from local importers.',
    price: '$4.00',
    category: 'brew',
  },
  {
    id: 'sourdough',
    name: 'Sourdough Toast',
    description: 'Cultured butter, flaky salt, rotating preserve.',
    price: '$7.00',
    category: 'food',
    featured: true,
  },
  {
    id: 'granola',
    name: 'House Granola Bowl',
    description: 'Greek yogurt, honey, toasted oats, and stone fruit.',
    price: '$9.50',
    category: 'food',
  },
  {
    id: 'croissant',
    name: 'Butter Croissant',
    description: 'Baked daily by our neighborhood bakery partner.',
    price: '$4.50',
    category: 'food',
  },
  {
    id: 'egg-sandwich',
    name: 'Soft Egg Sandwich',
    description: 'Brioche, soft scramble, chives, black pepper aioli.',
    price: '$11.00',
    category: 'food',
  },
]
