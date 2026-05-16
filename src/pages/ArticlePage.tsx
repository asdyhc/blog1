import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ArrowLeft, Calendar, Clock, Tag, ChevronRight } from 'lucide-react'
import { articles } from '@/data/articles'
import { cn } from '@/utils/cn'

const catLabelMap: Record<string, string> = {
  web: 'Web 开发',
  pentest: '渗透测试',
  algorithm: '算法',
}

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

function renderContent(content: string) {
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []
  let inCodeBlock = false
  let codeContent: string[] = []
  let codeLang = ''

  lines.forEach((line, i) => {
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        elements.push(
          <div key={`code-${i}`} className="my-6 rounded-xl overflow-hidden border border-dark-border/50">
            <div className="flex items-center justify-between px-4 py-2 bg-dark-base border-b border-dark-border/50">
              <span className="font-mono text-xs text-gray-500">{codeLang || 'code'}</span>
              <span className="font-mono text-[10px] text-gray-600">$ cat snippet.{codeLang || 'txt'}</span>
            </div>
            <pre className="p-4 bg-dark-base overflow-x-auto">
              <code className="font-mono text-sm leading-relaxed text-gray-300">{codeContent.join('\n')}</code>
            </pre>
          </div>
        )
        codeContent = []
        inCodeBlock = false
      } else {
        inCodeBlock = true
        codeLang = line.slice(3).trim()
      }
    } else if (inCodeBlock) {
      codeContent.push(line)
    } else if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="text-2xl font-orbitron font-bold text-white mt-10 mb-4 pb-2 border-b border-dark-border/30">
          <span className="text-neon-cyan">#</span> {line.slice(3)}
        </h2>
      )
    } else if (line.startsWith('### ')) {
      elements.push(
        <h3 key={i} className="text-xl font-bold text-white mt-8 mb-3">{line.slice(4)}</h3>
      )
    } else if (line.startsWith('- ')) {
      elements.push(
        <li key={i} className="text-gray-300 leading-relaxed ml-4 mb-1 font-sans">
          <span className="text-neon-cyan mr-2">›</span>
          {renderInline(line.slice(2))}
        </li>
      )
    } else if (line.startsWith('1. ') || line.match(/^\d+\.\s/)) {
      const num = line.match(/^(\d+)\./)?.[1]
      elements.push(
        <div key={i} className="flex gap-3 mb-2">
          <span className="text-neon-cyan font-mono text-sm mt-0.5 flex-shrink-0">{num}.</span>
          <span className="text-gray-300 leading-relaxed font-sans">{renderInline(line.replace(/^\d+\.\s*/, ''))}</span>
        </div>
      )
    } else if (line.trim() === '') {
      elements.push(<div key={i} className="h-3" />)
    } else {
      elements.push(
        <p key={i} className="text-gray-300 leading-relaxed font-sans mb-2">
          {renderInline(line)}
        </p>
      )
    }
  })

  return elements
}

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(`[^`]+`)/g)
  return parts.map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={i} className="px-1.5 py-0.5 bg-dark-surface border border-dark-border/50 rounded font-mono text-sm text-neon-cyan">
          {part.slice(1, -1)}
        </code>
      )
    }
    const boldParts = part.split(/(\*\*[^*]+\*\*)/g)
    return boldParts.map((bp, j) => {
      if (bp.startsWith('**') && bp.endsWith('**')) {
        return <strong key={`${i}-${j}`} className="text-white font-bold">{bp.slice(2, -2)}</strong>
      }
      return bp
    })
  })
}

export default function ArticlePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [progress, setProgress] = useState(0)

  const article = articles.find((a) => a.id === id)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight > 0) {
        setProgress(Math.min((scrollTop / docHeight) * 100, 100))
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 font-mono mb-4">文章未找到</p>
          <Link to="/" className="text-neon-cyan font-mono text-sm hover:underline">
            &gt; 返回首页
          </Link>
        </div>
      </div>
    )
  }

  const catColor = catColorMap[article.category]
  const catBg = catBgMap[article.category]
  const relatedArticles = articles.filter(
    (a) => a.category === article.category && a.id !== article.id
  ).slice(0, 2)

  return (
    <div className="min-h-screen">
      <div
        className="fixed top-0 left-0 right-0 h-1 z-50 bg-gradient-to-r from-neon-cyan via-neon-magenta to-neon-green"
        style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-gray-500 hover:text-neon-cyan font-mono text-sm mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          返回
        </button>

        <article>
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className={cn('text-xs font-mono px-3 py-1.5 rounded-full border', catBg)}>
                {catLabelMap[article.category]}
              </span>
              {article.featured && (
                <span className="text-xs font-mono px-3 py-1.5 rounded-full bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30">
                  精选
                </span>
              )}
            </div>

            <h1 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-5 text-sm text-gray-500 font-mono mb-6">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-neon-cyan" />
                {article.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-neon-cyan" />
                阅读时间 {article.readTime} 分钟
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1.5 text-xs font-mono px-2.5 py-1.5 rounded-full border border-dark-border/50 text-gray-500"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div className="prose-content border-t border-dark-border/30 pt-8">
            {renderContent(article.content)}
          </div>
        </article>

        {relatedArticles.length > 0 && (
          <div className="mt-20 pt-10 border-t border-dark-border/50">
            <h3 className="font-orbitron text-xl font-bold text-white mb-6">
              <span className="text-neon-cyan">#</span> 相关文章
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {relatedArticles.map((ra) => (
                <Link
                  key={ra.id}
                  to={`/article/${ra.id}`}
                  className="group flex items-center gap-3 p-4 rounded-lg bg-dark-card border border-dark-border/50 hover:border-dark-border transition-all hover:shadow-lg hover:shadow-neon-cyan/5"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-sm text-white truncate group-hover:text-neon-cyan transition-colors">
                      {ra.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{ra.date}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-neon-cyan transition-colors flex-shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}