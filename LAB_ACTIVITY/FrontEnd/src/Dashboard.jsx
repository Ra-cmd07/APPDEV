import { useState } from 'react'
import Header from './components/Header'
import SystemFeatures from './components/SystemFeatures'
import Button from './components/Button'
import ProductList from './ProductList'
import EditProduct from './EditProduct'
import StockMovement from './StockMovement'
import InventoryReport from './InventoryReport'
import ProductsPage from './pages/ProductsPage'
import ReportsPage from './pages/ReportsPage'
import SettingsPage from './pages/SettingsPage'

export default function Dashboard({ user, onLogout }) {
  const [products, setProducts] = useState([
    { id: 1, name: 'Laptop', sku: 'SKU-001', quantity: 45, price: 999.99, category: 'Electronics', status: 'In Stock' },
    { id: 2, name: 'Mouse', sku: 'SKU-002', quantity: 150, price: 29.99, category: 'Accessories', status: 'In Stock' },
    { id: 3, name: 'Keyboard', sku: 'SKU-003', quantity: 5, price: 79.99, category: 'Accessories', status: 'Low Stock' },
    { id: 4, name: 'Monitor 4K', sku: 'SKU-004', quantity: 0, price: 399.99, category: 'Electronics', status: 'Out of Stock' },
    { id: 5, name: 'USB Cable', sku: 'SKU-005', quantity: 500, price: 9.99, category: 'Cables', status: 'In Stock' },
    { id: 6, name: 'HDMI Cable', sku: 'SKU-006', quantity: 200, price: 14.99, category: 'Cables', status: 'In Stock' },
  ])

  const [editingProduct, setEditingProduct] = useState(null)
  const [showStockMovement, setShowStockMovement] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')

  const stats = [
    { icon: '📊', label: 'Total Products', value: products.length, color: 'border-l-blue-600' },
    { icon: '💰', label: 'Inventory Value', value: `$${products.reduce((s, p) => s + p.quantity * p.price, 0).toLocaleString('en-US', { maximumFractionDigits: 2 })}`, color: 'border-l-blue-600' },
    { icon: '⚠️', label: 'Low Stock', value: products.filter(p => p.status === 'Low Stock').length, color: 'border-l-orange-400' },
    { icon: '❌', label: 'Out of Stock', value: products.filter(p => p.status === 'Out of Stock').length, color: 'border-l-red-500' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">

      {/* Reusable Header Component */}
      <Header user={user} onLogout={onLogout} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Hero Banner — changes per tab */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-10 px-6 text-center">
        {activeTab === 'dashboard' && <><h2 className="text-3xl font-bold mb-1">Inventory Dashboard</h2><p className="text-blue-200 text-sm">Manage and track your products in real-time</p></>}
        {activeTab === 'products' && <><h2 className="text-3xl font-bold mb-1">Products</h2><p className="text-blue-200 text-sm">View, add, and manage your product inventory</p></>}
        {activeTab === 'reports' && <><h2 className="text-3xl font-bold mb-1">Reports</h2><p className="text-blue-200 text-sm">Analyze inventory data and generate reports</p></>}
        {activeTab === 'settings' && <><h2 className="text-3xl font-bold mb-1">Settings</h2><p className="text-blue-200 text-sm">Configure your account and system preferences</p></>}
      </section>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">

        {/* DASHBOARD PAGE */}
        {activeTab === 'dashboard' && (
          <div className="flex flex-col gap-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {stats.map((s) => (
                <div key={s.label} className={`bg-white rounded-2xl shadow-sm p-5 flex items-center gap-4 border-l-4 ${s.color} hover:shadow-md hover:-translate-y-1 transition-all duration-300`}>
                  <span className="text-4xl">{s.icon}</span>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">{s.label}</p>
                    <p className="text-2xl font-bold text-blue-900 mt-1">{s.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* System Features */}
            <SystemFeatures />

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-blue-900 font-bold text-base mb-4">Quick Actions</h3>
              <div className="flex gap-3 flex-wrap">
                <Button label="+ Add Product" onClick={() => setActiveTab('products')} variant="primary" />
                <Button label="📦 Stock Movement" onClick={() => setShowStockMovement(true)} variant="secondary" />
                <Button label="📊 View Reports" onClick={() => setActiveTab('reports')} variant="secondary" />
                <Button label="⚙️ Settings" onClick={() => setActiveTab('settings')} variant="secondary" />
              </div>
            </div>

            {/* Recent Products Preview */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-blue-900 font-bold text-base">Recent Products</h3>
                <button onClick={() => setActiveTab('products')} className="text-blue-600 text-sm font-medium hover:underline bg-transparent border-0 cursor-pointer">
                  View all →
                </button>
              </div>
              <ProductList
                products={products.slice(0, 4)}
                onDelete={(id) => setProducts(products.filter(p => p.id !== id))}
                onEdit={(product) => setEditingProduct(product)}
              />
            </div>
          </div>
        )}

        {/* PRODUCTS PAGE */}
        {activeTab === 'products' && (
          <ProductsPage products={products} setProducts={setProducts} />
        )}

        {/* REPORTS PAGE */}
        {activeTab === 'reports' && (
          <ReportsPage products={products} />
        )}

        {/* SETTINGS PAGE */}
        {activeTab === 'settings' && (
          <SettingsPage user={user} />
        )}

      </main>

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-200 text-center py-5 text-xs text-gray-500">
        © 2026 StockTrack — Inventory Management System. All rights reserved.
      </footer>

      {/* Modals */}
      {editingProduct && (
        <EditProduct
          product={editingProduct}
          onSave={(updated) => { setProducts(products.map(p => p.id === updated.id ? updated : p)); setEditingProduct(null) }}
          onCancel={() => setEditingProduct(null)}
        />
      )}
      {showStockMovement && <StockMovement products={products} onClose={() => setShowStockMovement(false)} />}
    </div>
  )
}
