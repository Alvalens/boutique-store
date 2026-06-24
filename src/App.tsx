import { Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner'

/** Temporary landing view until the product list is built (Milestone 4). */
function HomePlaceholder() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <p className="text-muted-foreground">商品列表建置中…</p>
    </main>
  )
}

function App() {
  return (
    <div className="min-h-svh bg-brand-page">
      <header className="bg-brand-header text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5">
          <h1 className="text-2xl font-bold">精品商店</h1>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<HomePlaceholder />} />
      </Routes>

      <Toaster richColors position="top-center" />
    </div>
  )
}

export default App
