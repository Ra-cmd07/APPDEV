import { useState } from 'react'
import './App.css'

export default function InventoryReport({ products, onClose }) {
  const [reportType, setReportType] = useState('summary')

  const stats = {
    totalProducts: products.length,
    totalValue: products.reduce((sum, p) => sum + (p.quantity * p.price), 0),
    lowStock: products.filter(p => p.status === 'Low Stock').length,
    outOfStock: products.filter(p => p.status === 'Out of Stock').length,
    inStock: products.filter(p => p.status === 'In Stock').length,
  }

  function handlePrint() {
    window.print()
  }

  return (
    <div className="modal-overlay-bg">
      <div className="modal-container modal-lg">
        <div className="modal-header">
          <h2>📊 Inventory Reports</h2>
          <button onClick={onClose} className="modal-close">✕</button>
        </div>

        <div className="modal-content reports-container">
          {/* Report Type Selector */}
          <div className="report-tabs">
            <button
              className={`tab ${reportType === 'summary' ? 'active' : ''}`}
              onClick={() => setReportType('summary')}
            >
              📋 Summary
            </button>
            <button
              className={`tab ${reportType === 'detailed' ? 'active' : ''}`}
              onClick={() => setReportType('detailed')}
            >
              📑 Detailed
            </button>
            <button
              className={`tab ${reportType === 'alerts' ? 'active' : ''}`}
              onClick={() => setReportType('alerts')}
            >
              ⚠️ Alerts
            </button>
            <button
              className={`tab ${reportType === 'value' ? 'active' : ''}`}
              onClick={() => setReportType('value')}
            >
              💰 Value Analysis
            </button>
          </div>

          {/* Summary Report */}
          {reportType === 'summary' && (
            <div className="report-section">
              <h3>Inventory Summary Report</h3>
              <p className="report-date">Generated: {new Date().toLocaleString()}</p>
              
              <div className="summary-grid">
                <div className="summary-card">
                  <h4>📦 Total Products</h4>
                  <p className="summary-value">{stats.totalProducts}</p>
                </div>
                <div className="summary-card">
                  <h4>💰 Total Inventory Value</h4>
                  <p className="summary-value">${stats.totalValue.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
                </div>
                <div className="summary-card">
                  <h4>✅ In Stock</h4>
                  <p className="summary-value" style={{color: '#10b981'}}>{stats.inStock}</p>
                </div>
                <div className="summary-card">
                  <h4>⚠️ Low Stock</h4>
                  <p className="summary-value" style={{color: '#f59e0b'}}>{stats.lowStock}</p>
                </div>
                <div className="summary-card">
                  <h4>❌ Out of Stock</h4>
                  <p className="summary-value" style={{color: '#ef4444'}}>{stats.outOfStock}</p>
                </div>
                <div className="summary-card">
                  <h4>📊 Stock Level %</h4>
                  <p className="summary-value">{Math.round((stats.inStock / stats.totalProducts) * 100)}%</p>
                </div>
              </div>
            </div>
          )}

          {/* Detailed Report */}
          {reportType === 'detailed' && (
            <div className="report-section">
              <h3>Detailed Inventory Report</h3>
              <p className="report-date">Generated: {new Date().toLocaleString()}</p>
              
              <div className="report-table">
                <table>
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>SKU</th>
                      <th>Category</th>
                      <th>Quantity</th>
                      <th>Unit Price</th>
                      <th>Total Value</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(p => (
                      <tr key={p.id}>
                        <td><strong>{p.name}</strong></td>
                        <td>{p.sku}</td>
                        <td>{p.category}</td>
                        <td className="qty-cell">{p.quantity}</td>
                        <td>${p.price.toFixed(2)}</td>
                        <td className="value-cell">${(p.quantity * p.price).toFixed(2)}</td>
                        <td>
                          <span className={`status-badge status-${p.status.toLowerCase().replace(' ', '-')}`}>
                            {p.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                    <tr className="totals-row">
                      <td colSpan="4"><strong>TOTALS</strong></td>
                      <td></td>
                      <td className="value-cell"><strong>${products.reduce((sum, p) => sum + (p.quantity * p.price), 0).toFixed(2)}</strong></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Alerts Report */}
          {reportType === 'alerts' && (
            <div className="report-section">
              <h3>Stock Alert Report</h3>
              <p className="report-date">Generated: {new Date().toLocaleString()}</p>
              
              <div className="alerts-section">
                <div className="alert-group">
                  <h4>🔴 Out of Stock ({products.filter(p => p.status === 'Out of Stock').length})</h4>
                  {products.filter(p => p.status === 'Out of Stock').length > 0 ? (
                    <ul>
                      {products.filter(p => p.status === 'Out of Stock').map(p => (
                        <li key={p.id}>{p.name} ({p.sku}) - Requires immediate replenishment</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="no-alerts">✅ No out of stock items</p>
                  )}
                </div>

                <div className="alert-group">
                  <h4>🟡 Low Stock ({products.filter(p => p.status === 'Low Stock').length})</h4>
                  {products.filter(p => p.status === 'Low Stock').length > 0 ? (
                    <ul>
                      {products.filter(p => p.status === 'Low Stock').map(p => (
                        <li key={p.id}>{p.name} ({p.sku}) - Qty: {p.quantity} - Reorder recommended</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="no-alerts">✅ No low stock items</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Value Analysis */}
          {reportType === 'value' && (
            <div className="report-section">
              <h3>Inventory Value Analysis</h3>
              <p className="report-date">Generated: {new Date().toLocaleString()}</p>
              
              <div className="value-analysis">
                <div className="analysis-card">
                  <h4>Top 5 By Value</h4>
                  <ol>
                    {products
                      .map(p => ({ ...p, value: p.quantity * p.price }))
                      .sort((a, b) => b.value - a.value)
                      .slice(0, 5)
                      .map(p => (
                        <li key={p.id}>{p.name} - ${p.value.toFixed(2)}</li>
                      ))
                    }
                  </ol>
                </div>

                <div className="analysis-card">
                  <h4>Value by Category</h4>
                  <ul>
                    {['Electronics', 'Accessories', 'Cables', 'Furniture', 'Office Supplies'].map(cat => {
                      const catValue = products
                        .filter(p => p.category === cat)
                        .reduce((sum, p) => sum + (p.quantity * p.price), 0)
                      return catValue > 0 ? (
                        <li key={cat}><strong>{cat}:</strong> ${catValue.toFixed(2)}</li>
                      ) : null
                    })}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button onClick={handlePrint} className="btn-print">🖨️ Print Report</button>
          <button onClick={onClose} className="btn-cancel">Close</button>
        </div>
      </div>
    </div>
  )
}
