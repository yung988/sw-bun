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
}

export type PriceItem = {
  CategoryId: string
  CategoryName: string
  PackageName: string
  Price: string
  Sessions: string
  Description: string
}

export type InstagramPost = {
  id: number
  image: string
  alt: string
  likes: number
  comments?: number
}
