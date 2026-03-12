import { useState } from 'react'
import Button from './components/Button'

export default function StockMovement({ products, onClose }) {
  const [movements, setMovements] = useState([
    { id: 1, productId: 1, productName: 'Laptop', type: 'incoming', quantity: 10, date: '2026-02-26', reference: 'PO-001' },
    { id: 2, productId: 2, productName: 'Mouse', type: 'outgoing', quantity: 20, date: '2026-02-26', reference: 'SO-001' },
    { id: 3, productId: 3, productName: 'Keyboard', type: 'incoming', quantity: 5, date: '2026-02-25', reference: 'PO-002' },
  ])

  const [formData, setFormData] = useState({ productId: '', type: 'incoming', quantity: '', reference: '' })

  function handleChange(e) {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: name === 'quantity' ? parseInt(value) || '' : value }))
  }

  function handleAddMovement(e) {
    e.preventDefault()
    if (!formData.productId || !formData.quantity || !formData.reference) {
      alert('Please fill in all fields')
      return
    }
    const product = products.find(p => p.id === parseInt(formData.productId))
    const newMovement = {
      id: movements.length + 1,
      productId: parseInt(formData.productId),
      productName: product.name,
      type: formData.type,
      quantity: formData.quantity,
      date: new Date().toISOString().split('T')[0],
      reference: formData.reference
    }
    setMovements([newMovement, ...movements])
    setFormData({ productId: '', type: 'incoming', quantity: '', reference: '' })
  }

  const inputClass = "w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">

        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-blue-900 text-xl font-bold">📦 Stock Movements</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-2xl bg-transparent border-0 cursor-pointer">✕</button>
        </div>

        <div className="overflow-y-auto px-6 py-5 flex flex-col gap-6">

          {/* Add Movement Form */}
          <div className="bg-blue-50 rounded-xl p-5">
            <h3 className="text-blue-900 font-bold mb-4">Record Stock Movement</h3>
            <form onSubmit={handleAddMovement} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-600 uppercase">Product *</label>
                  <select name="productId" value={formData.productId} onChange={handleChange} className={inputClass}>
                    <option value="">Select Product</option>
                    {products.map(p => (
                      <option key={p.id} value={p.id}>{p.name} ({p.sku})</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-600 uppercase">Type *</label>
                  <select name="type" value={formData.type} onChange={handleChange} className={inputClass}>
                    <option value="incoming">📥 Incoming</option>
                    <option value="outgoing">📤 Outgoing</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-600 uppercase">Quantity *</label>
                  <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="Enter quantity" className={inputClass} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-600 uppercase">Reference *</label>
                  <input type="text" name="reference" value={formData.reference} onChange={handleChange} placeholder="PO-001 or SO-001" className={inputClass} />
                </div>
              </div>
              <div>
                <Button label="Record Movement" type="submit" variant="primary" />
              </div>
            </form>
          </div>

          {/* Movement History */}
          <div>
            <h3 className="text-blue-900 font-bold mb-3">Movement History ({movements.length})</h3>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full border-collapse">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    {['Date', 'Product', 'Type', 'Quantity', 'Reference'].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {movements.map(m => (
                    <tr key={m.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm text-gray-600">{m.date}</td>
                      <td className="px-4 py-3 font-semibold text-gray-800">{m.productName}</td>
                      <td className="px-4 py-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${m.type === 'incoming' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
                          {m.type === 'incoming' ? '📥 Incoming' : '📤 Outgoing'}
                        </span>
                      </td>
                      <td className={`px-4 py-3 font-bold ${m.type === 'incoming' ? 'text-green-600' : 'text-red-500'}`}>
                        {m.type === 'incoming' ? '+' : '-'}{m.quantity}
                      </td>
                      <td className="px-4 py-3 font-mono text-sm text-gray-700">{m.reference}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
          <Button label="Close" onClick={onClose} variant="secondary" />
        </div>
      </div>
    </div>
  )
}
