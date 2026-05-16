import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Search, Tag } from 'lucide-react'
import { useState, useMemo } from 'react'
import ArticleCard from '@/components/ArticleCard'
import ScrollReveal from '@/components/ScrollReveal'
import { articles } from '@/data/articles'
import { categories } from '@/data/categories'
import { cn } from '@/utils/cn'

const catColorMap: Record<string, string> = {
  web: 'text-neon-gold border-neon-gold',
  pentest: 'text-neon-magenta border-neon-magenta',
  algorithm: 'text-neon-green border-neon-green',
}

const catBgMap: Record<string, string> = {
  web: 'bg-neon-gold/10 border-neon-gold/30 text-neon-gold',
  pentest: 'bg-neon-magenta/10 border-neon-magenta/30 text-neon-magenta',
  algorithm: 'bg-neon-green/10 border-neon-green/30 text-neon-green',
}

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>()
  const [search, setSearch] = useState('')

  const category = categories.find((c) => c.slug === slug)

  const filteredArticles = useMemo(() => {
    let result = slug ? articles.filter((a) => a.category === slug) : articles
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.summary.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q))
      )
    }
    return result
  }, [slug, search])

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 font-mono mb-4">分类未找到</p>
          <Link to="/" className="text-neon-cyan font-mono text-sm hover:underline">
            &gt; 返回首页
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-neon-cyan font-mono text-sm mb-10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          返回首页
        </Link>

        <ScrollReveal>
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <span className={cn('text-xs font-mono px-3 py-1.5 rounded-full border', catBgMap[category.slug])}>
                {category.name}
              </span>
            </div>
            <h1 className="font-orbitron text-4xl md:text-5xl font-bold text-white mb-4">
              {category.name}
            </h1>
            <p className="text-gray-400 font-sans text-lg max-w-2xl">
              {category.description}
            </p>
          </div>
        </ScrollReveal>

        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Link
              to="/category/web"
              className={cn(
                'flex-shrink-0 font-mono text-xs px-4 py-2 rounded-full border transition-all',
                slug === 'web' ? catBgMap.web + ' shadow-lg' : 'border-dark-border text-gray-500 hover:text-white hover:border-dark-border/70'
              )}
            >
              Web 开发
            </Link>
            <Link
              to="/category/pentest"
              className={cn(
                'flex-shrink-0 font-mono text-xs px-4 py-2 rounded-full border transition-all',
                slug === 'pentest' ? catBgMap.pentest + ' shadow-lg' : 'border-dark-border text-gray-500 hover:text-white hover:border-dark-border/70'
              )}
            >
              渗透测试
            </Link>
            <Link
              to="/category/algorithm"
              className={cn(
                'flex-shrink-0 font-mono text-xs px-4 py-2 rounded-full border transition-all',
                slug === 'algorithm' ? catBgMap.algorithm + ' shadow-lg' : 'border-dark-border text-gray-500 hover:text-white hover:border-dark-border/70'
              )}
            >
              算法
            </Link>
          </div>

          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="搜索文章..."
              className="w-full pl-10 pr-4 py-2.5 bg-dark-card border border-dark-border rounded-lg font-mono text-sm text-white placeholder-gray-600 focus:outline-none focus:border-neon-cyan/50 transition-colors"
            />
          </div>
        </div>

        {filteredArticles.length === 0 ? (
          <div className="text-center py-20">
            <Tag className="w-12 h-12 text-gray-700 mx-auto mb-4" />
            <p className="text-gray-500 font-mono">没有找到匹配的文章</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredArticles.map((article, index) => (
              <ScrollReveal key={article.id} delay={index * 80}>
                <ArticleCard article={article} />
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}