import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import MatrixBackground from '@/components/MatrixBackground'
import ScanLine from '@/components/ScanLine'
import HomePage from '@/pages/HomePage'
import CategoryPage from '@/pages/CategoryPage'
import ArticlePage from '@/pages/ArticlePage'
import AboutPage from '@/pages/AboutPage'

export default function App() {
  return (
    <Router>
      <div className="relative min-h-screen bg-dark-base text-gray-200">
        <MatrixBackground />
        <ScanLine />
        <Navbar />
        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/article/:id" element={<ArticlePage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}