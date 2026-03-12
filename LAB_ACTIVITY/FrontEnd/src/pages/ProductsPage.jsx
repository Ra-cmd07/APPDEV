import { useState } from 'react'
import Button from '../components/Button'
import ProductList from '../ProductList'
import EditProduct from '../EditProduct'
import StockMovement from '../StockMovement'

export default function ProductsPage({ products, setProducts }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [newProduct, setNewProduct] = useState({ name: '', sku: '', quantity: '', price: '', category: 'Electronics' })
  const [editingProduct, setEditingProduct] = useState(null)
  const [showStockMovement, setShowStockMovement] = useState(false)
  const [filterCategory, setFilterCategory] = useState('All')
  const [filterStatus, setFilterStatus] = useState('All')

  const categories = ['All', 'Electronics', 'Accessories', 'Cables', 'Furniture', 'Office Supplies']
  const statuses = ['All', 'In Stock', 'Low Stock', 'Out of Stock']

  const filteredProducts = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchCat = filterCategory === 'All' || p.category === filterCategory
    const matchStatus = filterStatus === 'All' || p.status === filterStatus
    return matchSearch && matchCat && matchStatus
  })

  const handleAddProduct = (e) => {
    e.preventDefault()
    if (!newProduct.name || !newProduct.sku || !newProduct.quantity || !newProduct.price) {
      alert('Please fill in all fields')
      return
    }
    const product = {
      id: products.length + 1,
      ...newProduct,
      quantity: parseInt(newProduct.quantity),
      price: parseFloat(newProduct.price),
      status: parseInt(newProduct.quantity) > 20 ? 'In Stock' : parseInt(newProduct.quantity) > 0 ? 'Low Stock' : 'Out of Stock'
    }
    setProducts([...products, product])
    setNewProduct({ name: '', sku: '', quantity: '', price: '', category: 'Electronics' })
    setShowAddForm(false)
  }

  const inputClass = "px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all w-full"

  return (
    <div className="flex flex-col gap-6">

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-blue-900">Products</h2>
          <p className="text-gray-500 text-sm mt-1">Manage your entire product inventory</p>
        </div>
        <div className="flex gap-2">
          <Button label="📦 Stock Movement" onClick={() => setShowStockMovement(true)} variant="secondary" />
          <Button label="+ Add Product" onClick={() => setShowAddForm(!showAddForm)} variant="primary" />
        </div>
      </div>

      {/* Summary Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: products.length, color: 'bg-blue-50 text-blue-800 border-blue-200' },
          { label: 'In Stock', value: products.filter(p => p.status === 'In Stock').length, color: 'bg-green-50 text-green-800 border-green-200' },
          { label: 'Low Stock', value: products.filter(p => p.status === 'Low Stock').length, color: 'bg-orange-50 text-orange-800 border-orange-200' },
          { label: 'Out of Stock', value: products.filter(p => p.status === 'Out of Stock').length, color: 'bg-red-50 text-red-800 border-red-200' },
        ].map(s => (
          <div key={s.label} className={`rounded-xl border px-4 py-3 ${s.color}`}>
            <p className="text-xs font-semibold uppercase tracking-wider opacity-70">{s.label}</p>
            <p className="text-2xl font-bold mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search by product name or SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pr-10 border-2 border-blue-100 rounded-xl bg-white text-blue-900 font-medium text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
        </div>
        <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className="px-4 py-3 border-2 border-blue-100 rounded-xl bg-white text-sm font-medium text-blue-900 focus:outline-none focus:border-blue-500 transition-all">
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="px-4 py-3 border-2 border-blue-100 rounded-xl bg-white text-sm font-medium text-blue-900 focus:outline-none focus:border-blue-500 transition-all">
          {statuses.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Add Product Form */}
      {showAddForm && (
        <div className="bg-white rounded-2xl shadow-sm p-6 border-l-4 border-l-green-500">
          <h3 className="text-blue-900 font-bold text-lg mb-4">Add New Product</h3>
          <form onSubmit={handleAddProduct} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" placeholder="Product Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} className={inputClass} />
              <input type="text" placeholder="SKU" value={newProduct.sku} onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })} className={inputClass} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input type="number" placeholder="Quantity" value={newProduct.quantity} onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })} className={inputClass} />
              <input type="number" step="0.01" placeholder="Price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} className={inputClass} />
              <select value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} className={inputClass}>
                <option>Electronics</option>
                <option>Accessories</option>
                <option>Cables</option>
                <option>Furniture</option>
                <option>Office Supplies</option>
              </select>
            </div>
            <div className="flex gap-3">
              <Button label="Add Product" type="submit" variant="success" />
              <Button label="Cancel" onClick={() => setShowAddForm(false)} variant="secondary" />
            </div>
          </form>
        </div>
      )}

      {/* Results count */}
      <p className="text-sm text-gray-500">Showing <span className="font-semibold text-blue-900">{filteredProducts.length}</span> of {products.length} products</p>

      {/* Products Table */}
      <ProductList
        products={filteredProducts}
        onDelete={(id) => setProducts(products.filter(p => p.id !== id))}
        onEdit={(product) => setEditingProduct(product)}
      />

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
