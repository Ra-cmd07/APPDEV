import { useState } from 'react'
import './App.css'

export default function EditProduct({ product, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: product.name,
    sku: product.sku,
    quantity: product.quantity,
    price: product.price,
    category: product.category,
  })
  const [error, setError] = useState('')

  function handleChange(e) {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'quantity' || name === 'price' ? parseFloat(value) : value
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!formData.name || !formData.sku || !formData.quantity || !formData.price) {
      setError('Please fill in all required fields')
      return
    }

    onSave({
      ...product,
      ...formData,
      status: formData.quantity > 20 ? 'In Stock' : formData.quantity > 0 ? 'Low Stock' : 'Out of Stock'
    })
  }

  return (
    <div className="modal-overlay-bg">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Edit Product</h2>
          <button onClick={onCancel} className="modal-close">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-row">
            <div className="form-group">
              <label>Product Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>SKU *</label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                disabled
                className="form-input disabled"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Quantity *</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Price *</label>
              <input
                type="number"
                step="0.01"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Category *</label>
            <select name="category" value={formData.category} onChange={handleChange} className="form-input">
              <option>Electronics</option>
              <option>Accessories</option>
              <option>Cables</option>
              <option>Furniture</option>
              <option>Office Supplies</option>
            </select>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="modal-actions">
            <button type="button" onClick={onCancel} className="btn-cancel">Cancel</button>
            <button type="submit" className="btn-save">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  )
}
