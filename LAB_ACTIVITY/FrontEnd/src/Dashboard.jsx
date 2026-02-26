import { useState } from 'react'
import ProductList from './ProductList'
import EditProduct from './EditProduct'
import StockMovement from './StockMovement'
import InventoryReport from './InventoryReport'
import './Dashboard.css'

export default function Dashboard({ user, onLogout }) {
  const [products, setProducts] = useState([
    { id: 1, name: 'Laptop', sku: 'SKU-001', quantity: 45, price: 999.99, category: 'Electronics', status: 'In Stock' },
    { id: 2, name: 'Mouse', sku: 'SKU-002', quantity: 150, price: 29.99, category: 'Accessories', status: 'In Stock' },
    { id: 3, name: 'Keyboard', sku: 'SKU-003', quantity: 5, price: 79.99, category: 'Accessories', status: 'Low Stock' },
    { id: 4, name: 'Monitor 4K', sku: 'SKU-004', quantity: 0, price: 399.99, category: 'Electronics', status: 'Out of Stock' },
    { id: 5, name: 'USB Cable', sku: 'SKU-005', quantity: 500, price: 9.99, category: 'Cables', status: 'In Stock' },
    { id: 6, name: 'HDMI Cable', sku: 'SKU-006', quantity: 200, price: 14.99, category: 'Cables', status: 'In Stock' },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [newProduct, setNewProduct] = useState({ name: '', sku: '', quantity: '', price: '', category: 'Electronics' })
  const [editingProduct, setEditingProduct] = useState(null)
  const [showStockMovement, setShowStockMovement] = useState(false)
  const [showInventoryReport, setShowInventoryReport] = useState(false)

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  )

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

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id))
  }

  const handleEditProduct = (product) => {
    setEditingProduct(product)
  }

  const handleSaveProduct = (updatedProduct) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p))
    setEditingProduct(null)
  }

  const stats = {
    totalProducts: products.length,
    totalValue: products.reduce((sum, p) => sum + (p.quantity * p.price), 0),
    lowStock: products.filter(p => p.status === 'Low Stock').length,
    outOfStock: products.filter(p => p.status === 'Out of Stock').length,
  }

  return (
    <div className="website-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-content">
          <div className="navbar-brand">
            <span className="brand-icon">📦</span>
            <h1>StockTrack</h1>
          </div>
          <div className="navbar-menu">
            <a href="#" className="nav-link">Dashboard</a>
            <a href="#" className="nav-link">Products</a>
            <a href="#" className="nav-link">Reports</a>
            <a href="#" className="nav-link">Settings</a>
          </div>
          <div className="navbar-user">
            <span className="user-avatar">👤</span>
            <span className="user-info">{user}</span>
            <button onClick={onLogout} className="logout-btn">Logout</button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="container">
            <h2>Inventory Dashboard</h2>
            <p>Manage and track your products in real-time</p>
          </div>
        </section>

        {/* Content Section */}
        <section className="content-section">
          <div className="container">
            {/* Stats Grid */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">📊</div>
                <h3>Total Products</h3>
                <p className="stat-value">{stats.totalProducts}</p>
              </div>
              <div className="stat-card">
                <div className="stat-icon">💰</div>
                <h3>Inventory Value</h3>
                <p className="stat-value">${stats.totalValue.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
              </div>
              <div className="stat-card warning">
                <div className="stat-icon">⚠️</div>
                <h3>Low Stock Items</h3>
                <p className="stat-value">{stats.lowStock}</p>
              </div>
              <div className="stat-card danger">
                <div className="stat-icon">❌</div>
                <h3>Out of Stock</h3>
                <p className="stat-value">{stats.outOfStock}</p>
              </div>
            </div>

            {/* Control Bar */}
            <div className="control-bar">
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Search by product name or SKU..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="search-icon">🔍</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button className="btn-add" onClick={() => setShowAddForm(!showAddForm)}>
                  + Add Product
                </button>
                <button className="btn-secondary" onClick={() => setShowStockMovement(true)} title="Track incoming and outgoing stocks">
                  📦 Stock Movement
                </button>
                <button className="btn-secondary" onClick={() => setShowInventoryReport(true)} title="View inventory reports">
                  📊 Reports
                </button>
              </div>
            </div>

            {/* Add Product Form */}
            {showAddForm && (
              <div className="add-product-section">
                <h3>Add New Product</h3>
                <form onSubmit={handleAddProduct}>
                  <div className="form-row">
                    <input
                      type="text"
                      placeholder="Product Name"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="SKU"
                      value={newProduct.sku}
                      onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                    />
                  </div>
                  <div className="form-row">
                    <input
                      type="number"
                      placeholder="Quantity"
                      value={newProduct.quantity}
                      onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                    />
                    <input
                      type="number"
                      step="0.01"
                      placeholder="Price"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    />
                    <select value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}>
                      <option>Electronics</option>
                      <option>Accessories</option>
                      <option>Cables</option>
                      <option>Software</option>
                    </select>
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="btn-submit">Add Product</button>
                    <button type="button" className="btn-cancel" onClick={() => setShowAddForm(false)}>Cancel</button>
                  </div>
                </form>
              </div>
            )}

            {/* Products Table */}
            <ProductList 
              products={filteredProducts} 
              onDelete={handleDeleteProduct}
              onEdit={handleEditProduct}
            />

            {/* Edit Product Modal */}
            {editingProduct && (
              <EditProduct
                product={editingProduct}
                onSave={handleSaveProduct}
                onCancel={() => setEditingProduct(null)}
              />
            )}

            {/* Stock Movement Modal */}
            {showStockMovement && (
              <StockMovement
                products={products}
                onClose={() => setShowStockMovement(false)}
              />
            )}

            {/* Inventory Report Modal */}
            {showInventoryReport && (
              <InventoryReport
                products={products}
                onClose={() => setShowInventoryReport(false)}
              />
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2026 StockTrack - Inventory Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
