export interface MenuItem {
  id: string
  name: string
  description: string
  price: string
  category: 'espresso' | 'brew' | 'food'
  featured?: boolean
}

export interface CafeInfo {
  name: string
  tagline: string
  address: string
  city: string
  hours: string[]
  phone: string
  email: string
  instagram: string
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
