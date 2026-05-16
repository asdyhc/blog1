import { Link } from 'react-router-dom'
import { Calendar, Clock, Tag } from 'lucide-react'
import type { Article } from '@/types'
import { cn } from '@/utils/cn'

const catColorMap: Record<string, string> = {
  web: 'border-neon-gold text-neon-gold',
  pentest: 'border-neon-magenta text-neon-magenta',
  algorithm: 'border-neon-green text-neon-green',
}

const catLabelMap: Record<string, string> = {
  web: 'Web',
  pentest: '渗透',
  algorithm: '算法',
}

export default function ArticleCard({ article }: { article: Article }) {
  const colorClass = catColorMap[article.category] || catColorMap.web

  return (
    <Link
      to={`/article/${article.id}`}
      className="group block bg-dark-card border border-dark-border/50 rounded-xl overflow-hidden hover:border-dark-border transition-all duration-500 hover:shadow-lg hover:shadow-neon-cyan/5 hover:-translate-y-1"
    >
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className={cn(
            'text-xs font-mono px-2.5 py-1 rounded-full border',
            colorClass
          )}>
            {catLabelMap[article.category]}
          </span>
          {article.featured && (
            <span className="text-xs font-mono px-2 py-1 rounded-full bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30">
              精选
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-neon-cyan transition-colors duration-300">
          {article.title}
        </h3>

        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
          {article.summary}
        </p>

        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 font-mono">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {article.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {article.readTime} 分钟
          </span>
        </div>

        {article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-dark-border/50">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 text-xs text-gray-500 font-mono"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}