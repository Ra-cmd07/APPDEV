import { useState } from 'react'
import './App.css'

export default function StockMovement({ products, onClose }) {
  const [movements, setMovements] = useState([
    { id: 1, productId: 1, productName: 'Laptop', type: 'incoming', quantity: 10, date: '2026-02-26', reference: 'PO-001' },
    { id: 2, productId: 2, productName: 'Mouse', type: 'outgoing', quantity: 20, date: '2026-02-26', reference: 'SO-001' },
    { id: 3, productId: 3, productName: 'Keyboard', type: 'incoming', quantity: 5, date: '2026-02-25', reference: 'PO-002' },
  ])

  const [formData, setFormData] = useState({
    productId: '',
    type: 'incoming',
    quantity: '',
    reference: ''
  })

  function handleChange(e) {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || '' : value
    }))
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

  return (
    <div className="modal-overlay-bg">
      <div className="modal-container modal-lg">
        <div className="modal-header">
          <h2>📦 Stock Movements - Incoming & Outgoing</h2>
          <button onClick={onClose} className="modal-close">✕</button>
        </div>

        <div className="modal-content">
          {/* Add Movement Form */}
          <div className="section add-movement">
            <h3>Record Stock Movement</h3>
            <form onSubmit={handleAddMovement} className="movement-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Product *</label>
                  <select
                    name="productId"
                    value={formData.productId}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="">Select Product</option>
                    {products.map(p => (
                      <option key={p.id} value={p.id}>{p.name} ({p.sku})</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Type *</label>
                  <select name="type" value={formData.type} onChange={handleChange} className="form-input">
                    <option value="incoming">📥 Incoming</option>
                    <option value="outgoing">📤 Outgoing</option>
                  </select>
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
                    placeholder="Enter quantity"
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Reference *</label>
                  <input
                    type="text"
                    name="reference"
                    value={formData.reference}
                    onChange={handleChange}
                    placeholder="PO-001 or SO-001"
                    className="form-input"
                  />
                </div>
              </div>

              <button type="submit" className="btn-save">Record Movement</button>
            </form>
          </div>

          {/* Movements History */}
          <div className="section movements-history">
            <h3>Movement History ({movements.length})</h3>
            <div className="movements-table">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Product</th>
                    <th>Type</th>
                    <th>Quantity</th>
                    <th>Reference</th>
                  </tr>
                </thead>
                <tbody>
                  {movements.map(m => (
                    <tr key={m.id} className={`movement-${m.type}`}>
                      <td>{m.date}</td>
                      <td><strong>{m.productName}</strong></td>
                      <td>
                        <span className={`movement-badge ${m.type}`}>
                          {m.type === 'incoming' ? '📥 Incoming' : '📤 Outgoing'}
                        </span>
                      </td>
                      <td className={m.type === 'incoming' ? 'text-green' : 'text-red'}>
                        {m.type === 'incoming' ? '+' : '-'}{m.quantity}
                      </td>
                      <td>{m.reference}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="btn-cancel">Close</button>
        </div>
      </div>
    </div>
  )
}
