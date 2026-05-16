import { create } from 'zustand'

export type CategorySlug = 'web' | 'pentest' | 'algorithm'

interface BlogState {
  activeCategory: CategorySlug | null
  setActiveCategory: (slug: CategorySlug | null) => void
}

export const useBlogStore = create<BlogState>((set) => ({
  activeCategory: null,
  setActiveCategory: (slug) => set({ activeCategory: slug }),
}))