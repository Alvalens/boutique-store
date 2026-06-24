import { Routes, Route } from 'react-router-dom'
import { Header } from '@/components/Header'
import { CartDrawer } from '@/components/CartDrawer'
import { ProductListPage } from '@/pages/ProductListPage'
import { ProductDetailPage } from '@/pages/ProductDetailPage'
import { Toaster } from '@/components/ui/sonner'

function App() {
  return (
    <div className="min-h-svh bg-brand-page">
      <Header />

      <Routes>
        <Route path="/" element={<ProductListPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
      </Routes>

      <CartDrawer />
      <Toaster richColors position="top-center" />
    </div>
  )
}

export default App
