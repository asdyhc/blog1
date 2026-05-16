export interface Article {
  id: string
  title: string
  summary: string
  content: string
  category: 'web' | 'pentest' | 'algorithm'
  tags: string[]
  date: string
  readTime: number
  featured: boolean
}

export interface Category {
  slug: 'web' | 'pentest' | 'algorithm'
  name: string
  description: string
  icon: string
  color: string
  gradient: string
}