import type { Category } from '@/types'

export const categories: Category[] = [
  {
    slug: 'web',
    name: 'Web 开发',
    description: '前端与后端技术探索，从零到一构建现代 Web 应用',
    icon: 'Globe',
    color: '#ffaa00',
    gradient: 'from-yellow-500/20 to-orange-600/20',
  },
  {
    slug: 'pentest',
    name: '渗透测试',
    description: '网络安全与漏洞挖掘，守护数字世界的边界',
    icon: 'Shield',
    color: '#ff00aa',
    gradient: 'from-pink-500/20 to-fuchsia-600/20',
  },
  {
    slug: 'algorithm',
    name: '算法',
    description: '数据结构与算法精进，提升编程核心能力',
    icon: 'Binary',
    color: '#00ff88',
    gradient: 'from-emerald-400/20 to-green-500/20',
  },
]