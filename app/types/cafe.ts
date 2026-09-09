export interface MenuItem {
  id: string
  name: string
  description: string
  price: string
  category: 'espresso' | 'brew' | 'food'
  featured?: boolean
}

export interface DayHours {
  /** 0 = Sunday … 6 = Saturday */
  days: number[]
  open: string
  close: string
  label: string
}

export interface CafeInfo {
  name: string
  tagline: string
  address: string
  city: string
  hours: string[]
  schedule: DayHours[]
  phone: string
  email: string
  instagram: string
  geo: {
    lat: number
    lng: number
  }
}

export interface CafeValue {
  title: string
  description: string
}

export interface ContactPayload {
  name: string
  email: string
  message: string
}

export interface Testimonial {
  id: string
  quote: string
  name: string
  role: string
}

export interface CafeEvent {
  id: string
  title: string
  date: string
  time: string
  description: string
  type: 'cupping' | 'workshop' | 'private'
}
