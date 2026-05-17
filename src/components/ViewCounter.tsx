import { useState, useEffect } from 'react'
import { Eye, Calendar, BarChart3, Globe } from 'lucide-react'

interface ViewData {
  total: number
  today: number
  todayDate: string
  month: number
  monthDate: string
  year: number
  yearDate: string
}

const getToday = () => new Date().toISOString().split('T')[0]
const getMonth = () => `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`
const getYear = () => `${new Date().getFullYear()}`

export default function ViewCounter({ articleId }: { articleId?: string }) {
  const [views, setViews] = useState<ViewData>({
    total: 0,
    today: 0,
    todayDate: getToday(),
    month: 0,
    monthDate: getMonth(),
    year: 0,
    yearDate: getYear(),
  })

  useEffect(() => {
    const key = articleId ? `views_article_${articleId}` : 'views_site'
    const today = getToday()
    const month = getMonth()
    const year = getYear()

    let data = localStorage.getItem(key)
    let viewData: ViewData

    if (data) {
      viewData = JSON.parse(data)
      
      if (viewData.todayDate !== today) {
        viewData.today = 0
        viewData.todayDate = today
      }
      if (viewData.monthDate !== month) {
        viewData.month = 0
        viewData.monthDate = month
      }
      if (viewData.yearDate !== year) {
        viewData.year = 0
        viewData.yearDate = year
      }
    } else {
      viewData = {
        total: 0,
        today: 0,
        todayDate: today,
        month: 0,
        monthDate: month,
        year: 0,
        yearDate: year,
      }
    }

    const sessionKey = articleId ? `visited_${articleId}` : 'visited_site'
    if (!sessionStorage.getItem(sessionKey)) {
      viewData.total += 1
      viewData.today += 1
      viewData.month += 1
      viewData.year += 1
      sessionStorage.setItem(sessionKey, '1')
      localStorage.setItem(key, JSON.stringify(viewData))
    }

    setViews(viewData)
  }, [articleId])

  const formatNumber = (num: number) => {
    if (num >= 10000) {
      return (num / 10000).toFixed(1) + 'w'
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k'
    }
    return num.toString()
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
      <div className="bg-dark-card border border-neon-cyan/20 rounded-xl p-4 text-center">
        <Eye className="w-5 h-5 text-neon-cyan mx-auto mb-2" />
        <div className="font-mono text-2xl font-bold text-neon-cyan">{formatNumber(views.total)}</div>
        <div className="text-xs text-gray-500 mt-1">总访问量</div>
      </div>
      <div className="bg-dark-card border border-neon-green/20 rounded-xl p-4 text-center">
        <Calendar className="w-5 h-5 text-neon-green mx-auto mb-2" />
        <div className="font-mono text-2xl font-bold text-neon-green">{formatNumber(views.today)}</div>
        <div className="text-xs text-gray-500 mt-1">今日</div>
      </div>
      <div className="bg-dark-card border border-neon-gold/20 rounded-xl p-4 text-center">
        <BarChart3 className="w-5 h-5 text-neon-gold mx-auto mb-2" />
        <div className="font-mono text-2xl font-bold text-neon-gold">{formatNumber(views.month)}</div>
        <div className="text-xs text-gray-500 mt-1">本月</div>
      </div>
      <div className="bg-dark-card border border-neon-magenta/20 rounded-xl p-4 text-center">
        <Globe className="w-5 h-5 text-neon-magenta mx-auto mb-2" />
        <div className="font-mono text-2xl font-bold text-neon-magenta">{formatNumber(views.year)}</div>
        <div className="text-xs text-gray-500 mt-1">本年</div>
      </div>
    </div>
  )
}
