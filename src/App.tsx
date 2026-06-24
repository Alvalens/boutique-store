import { Routes, Route } from 'react-router-dom'
import { Header } from '@/components/Header'
import { CartDrawer } from '@/components/CartDrawer'
import { ProductListPage } from '@/pages/ProductListPage'
import { Toaster } from '@/components/ui/sonner'

function App() {
  return (
    <div className="min-h-svh bg-brand-page">
      <Header />

      <Routes>
        <Route path="/" element={<ProductListPage />} />
      </Routes>

      <CartDrawer />
      <Toaster richColors position="top-center" />
    </div>
  )
}

export default App
