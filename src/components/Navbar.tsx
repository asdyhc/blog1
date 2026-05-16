import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Terminal, ExternalLink } from 'lucide-react'
import { cn } from '@/utils/cn'

const navLinks = [
  { path: '/', label: '首页', external: false },
  { path: '/category/web', label: 'Web开发', external: false },
  { path: '/category/pentest', label: '渗透测试', external: false },
  { path: '/category/algorithm', label: '算法', external: false },
  { path: 'https://travel.jasper1im.top/', label: '巴蜀文化', external: true },
  { path: '/about', label: '关于', external: false },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'bg-dark-base/80 backdrop-blur-xl border-b border-dark-border/50 shadow-lg shadow-neon-cyan/5'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <Terminal className="w-6 h-6 text-neon-cyan group-hover:animate-glow-pulse" />
            <span className="font-orbitron text-xl font-bold bg-gradient-to-r from-neon-cyan to-neon-cyan/70 bg-clip-text text-transparent">
              CodeX
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              if (link.external) {
                return (
                  <a
                    key={link.path}
                    href={link.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative font-mono text-sm tracking-wider transition-colors duration-300 py-1 text-gray-400 hover:text-white flex items-center gap-1"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )
              }

              const isActive = location.pathname === link.path ||
                (link.path !== '/' && location.pathname.startsWith(link.path))
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    'relative font-mono text-sm tracking-wider transition-colors duration-300 py-1',
                    isActive
                      ? 'text-neon-cyan'
                      : 'text-gray-400 hover:text-white'
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-neon-cyan rounded-full shadow-[0_0_8px_#00f0ff]" />
                  )}
                </Link>
              )
            })}
          </div>

          <button
            className="md:hidden text-gray-400 hover:text-neon-cyan transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden py-4 border-t border-dark-border/50 animate-fade-in-up">
            {navLinks.map((link) => {
              if (link.external) {
                return (
                  <a
                    key={link.path}
                    href={link.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block py-3 px-4 font-mono text-sm transition-colors rounded-lg text-gray-400 hover:text-white hover:bg-dark-surface flex items-center gap-2"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )
              }

              const isActive = location.pathname === link.path
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    'block py-3 px-4 font-mono text-sm transition-colors rounded-lg',
                    isActive
                      ? 'text-neon-cyan bg-neon-cyan/5'
                      : 'text-gray-400 hover:text-white hover:bg-dark-surface'
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </nav>
  )
}
