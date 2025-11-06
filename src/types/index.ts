export type Slide = {
  src: string
  alt: string
}

export type WhyItem = {
  icon: string
  title: string
  description: string
  badges?: string[]
}

export type Testimonial = {
  quote: string
  name: string
}

export type FAQ = {
  q: string
  a: string
}

export type BlogPost = {
  image: string
  title: string
  excerpt: string
  category: string
  href: string
}

export type Service = {
  image: string
  price: number
  title: string
  category: string
  href: string
}

export type Highlight = {
  t: string
  d: string
  icon?: 'sparkles' | 'heart' | 'zap' | 'droplet' | 'scissors'
}

export type PriceItem = {
  category: string
  subcategory: string
  serviceType: string
  name: string
  shortDescription: string
  description: string
  duration: number
  sessions: number
  price: string
  benefits: string[]
  image: string
  images?: string[]
}

export type InstagramPost = {
  id: number
  image: string
  alt: string
  likes: number
  comments?: number
}
