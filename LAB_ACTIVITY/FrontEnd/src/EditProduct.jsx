import { useState } from 'react'
import Button from './components/Button'

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

  const inputClass = "w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-blue-900 text-xl font-bold">Edit Product</h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-700 text-2xl bg-transparent border-0 cursor-pointer leading-none"
          >✕</button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Product Name *</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className={inputClass} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">SKU</label>
              <input type="text" name="sku" value={formData.sku} disabled className={`${inputClass} bg-gray-50 cursor-not-allowed`} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Quantity *</label>
              <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} className={inputClass} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Price *</label>
              <input type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} className={inputClass} />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Category *</label>
            <select name="category" value={formData.category} onChange={handleChange} className={inputClass}>
              <option>Electronics</option>
              <option>Accessories</option>
              <option>Cables</option>
              <option>Furniture</option>
              <option>Office Supplies</option>
            </select>
          </div>

          {error && (
            <div className="px-4 py-2 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded-lg">{error}</div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <Button label="Cancel" onClick={onCancel} variant="secondary" />
            <Button label="Save Changes" type="submit" variant="success" />
          </div>
        </form>

      </div>
    </div>
  )
}
