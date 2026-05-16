import { Link } from 'react-router-dom'
import { ChevronDown, Globe, Shield, Binary } from 'lucide-react'
import Typewriter from '@/components/Typewriter'
import GlowButton from '@/components/GlowButton'
import ArticleCard from '@/components/ArticleCard'
import ScrollReveal from '@/components/ScrollReveal'
import { articles } from '@/data/articles'
import { categories } from '@/data/categories'
import { cn } from '@/utils/cn'

import type { LucideIcon } from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  Globe,
  Shield,
  Binary,
}

const featuredArticles = articles.filter((a) => a.featured)
const recentArticles = articles.slice(0, 6)

export default function HomePage() {
  return (
    <div>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="mb-6">
            <p className="font-mono text-neon-cyan text-sm tracking-[0.3em] mb-4 animate-neon-flicker">
              &gt; SYSTEM ONLINE
            </p>
          </div>

          <h1 className="font-orbitron text-4xl sm:text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            <Typewriter
              texts={['Web 开发', '渗透测试', '算法研究']}
              className="bg-gradient-to-r from-neon-cyan to-neon-magenta bg-clip-text text-transparent"
              speed={100}
            />
          </h1>

          <p className="text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-sans font-light">
            探索现代 Web 技术、网络安全攻防与算法之美<br />
            一个开发者的技术笔记本
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/category/web">
              <GlowButton color="#ffaa00">
                &gt; 探索文章
              </GlowButton>
            </Link>
            <Link to="/about">
              <GlowButton color="#00f0ff">
                &gt; 关于我
              </GlowButton>
            </Link>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
            <ChevronDown className="w-6 h-6 text-neon-cyan/60" />
          </div>
        </div>
      </section>

      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white mb-4">
              <span className="text-neon-cyan">&lt;</span>
              技术领域
              <span className="text-neon-cyan"> /&gt;</span>
            </h2>
            <p className="text-gray-400 font-mono text-sm">选择一个方向，开始探索</p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((cat, index) => {
            const Icon = iconMap[cat.icon]
            return (
              <ScrollReveal key={cat.slug} delay={index * 150}>
                <Link
                  to={`/category/${cat.slug}`}
                  className="group block p-8 rounded-2xl bg-dark-card border border-dark-border/50 hover:border-current transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
                  style={{ '--hover-color': cat.color } as React.CSSProperties}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = cat.color
                    e.currentTarget.style.boxShadow = `0 0 30px ${cat.color}22`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = ''
                    e.currentTarget.style.boxShadow = ''
                  }}
                >
                  <div className={cn(
                    'absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500',
                    cat.gradient
                  )} />

                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 border" style={{ borderColor: cat.color + '33' }}>
                      {Icon && <Icon className="w-7 h-7" color={cat.color} />}
                    </div>

                    <h3 className="font-orbitron text-xl font-bold text-white mb-3 group-hover:text-[var(--hover-color)] transition-colors">
                      {cat.name}
                    </h3>

                    <p className="text-gray-400 text-sm leading-relaxed font-sans mb-5">
                      {cat.description}
                    </p>

                    <span
                      className="font-mono text-xs inline-flex items-center gap-1 transition-colors"
                      style={{ color: cat.color }}
                    >
                      浏览文章 →
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            )
          })}
        </div>
      </section>

      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white mb-4">
              <span className="text-neon-cyan">#</span> 精选文章
            </h2>
            <p className="text-gray-400 font-mono text-sm">FEATURED ARTICLES</p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-10">
          {featuredArticles.map((article, index) => (
            <ScrollReveal key={article.id} delay={index * 100}>
              <ArticleCard article={article} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white mb-4">
              <span className="text-neon-magenta">#</span> 最新发布
            </h2>
            <p className="text-gray-400 font-mono text-sm">LATEST POSTS</p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {recentArticles.map((article, index) => (
            <ScrollReveal key={article.id} delay={index * 80}>
              <ArticleCard article={article} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      <footer className="relative z-10 border-t border-dark-border/50 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="font-mono text-xs text-gray-600">
            &copy; {new Date().getFullYear()} CodeX Blog. Powered by React + TypeScript.
          </p>
          <p className="font-mono text-xs text-gray-700 mt-2">
            &lt;system&gt; All systems operational &lt;/system&gt;
          </p>
        </div>
      </footer>
    </div>
  )
}