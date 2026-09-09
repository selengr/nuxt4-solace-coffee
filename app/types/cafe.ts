export type AppLocale = 'en' | 'fa'

export type LocalizedText = string | Record<AppLocale, string>

export interface MenuItem {
  id: string
  name: Record<AppLocale, string>
  description: Record<AppLocale, string>
  price: string
  category: 'espresso' | 'brew' | 'food'
  featured?: boolean
}

export interface DayHours {
  /** 0 = Sunday … 6 = Saturday */
  days: number[]
  open: string
  close: string
  label: Record<AppLocale, string>
}

export interface CafeInfo {
  name: string
  tagline: Record<AppLocale, string>
  address: string
  city: string
  hours: Record<AppLocale, string[]>
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
  title: Record<AppLocale, string>
  description: Record<AppLocale, string>
}

export interface ContactPayload {
  name: string
  email: string
  message: string
}

export interface Testimonial {
  id: string
  quote: Record<AppLocale, string>
  name: string
  role: Record<AppLocale, string>
}

export interface CafeEvent {
  id: string
  title: Record<AppLocale, string>
  date: Record<AppLocale, string>
  time: string
  description: Record<AppLocale, string>
  type: 'cupping' | 'workshop' | 'private'
}
