import { useState } from 'react'
import Button from './components/Button'

export default function InventoryReport({ products, onClose }) {
  const [reportType, setReportType] = useState('summary')

  const stats = {
    totalProducts: products.length,
    totalValue: products.reduce((sum, p) => sum + (p.quantity * p.price), 0),
    lowStock: products.filter(p => p.status === 'Low Stock').length,
    outOfStock: products.filter(p => p.status === 'Out of Stock').length,
    inStock: products.filter(p => p.status === 'In Stock').length,
  }

  const tabs = [
    { key: 'summary', label: '📋 Summary' },
    { key: 'detailed', label: '📑 Detailed' },
    { key: 'alerts', label: '⚠️ Alerts' },
    { key: 'value', label: '💰 Value Analysis' },
  ]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">

        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-blue-900 text-xl font-bold">📊 Inventory Reports</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-2xl bg-transparent border-0 cursor-pointer">✕</button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-6 pt-4">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setReportType(tab.key)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer border-0
                ${reportType === tab.key ? 'bg-blue-800 text-white shadow' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="overflow-y-auto px-6 py-5 flex-1">
          <p className="text-xs text-gray-400 mb-4">Generated: {new Date().toLocaleString()}</p>

          {/* Summary */}
          {reportType === 'summary' && (
            <div>
              <h3 className="text-blue-900 font-bold text-lg mb-4">Inventory Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { label: '📦 Total Products', value: stats.totalProducts, color: 'text-blue-900' },
                  { label: '💰 Total Value', value: `$${stats.totalValue.toLocaleString('en-US', { maximumFractionDigits: 2 })}`, color: 'text-blue-900' },
                  { label: '✅ In Stock', value: stats.inStock, color: 'text-green-600' },
                  { label: '⚠️ Low Stock', value: stats.lowStock, color: 'text-orange-500' },
                  { label: '❌ Out of Stock', value: stats.outOfStock, color: 'text-red-600' },
                  { label: '📊 Stock Level', value: `${Math.round((stats.inStock / stats.totalProducts) * 100)}%`, color: 'text-blue-900' },
                ].map(card => (
                  <div key={card.label} className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all">
                    <p className="text-xs text-gray-500 font-medium mb-1">{card.label}</p>
                    <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Detailed */}
          {reportType === 'detailed' && (
            <div>
              <h3 className="text-blue-900 font-bold text-lg mb-4">Detailed Inventory</h3>
              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full border-collapse">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      {['Product', 'SKU', 'Category', 'Qty', 'Unit Price', 'Total', 'Status'].map(h => (
                        <th key={h} className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(p => (
                      <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-3 py-2 font-semibold text-blue-900 text-sm">{p.name}</td>
                        <td className="px-3 py-2 font-mono text-xs text-gray-600">{p.sku}</td>
                        <td className="px-3 py-2 text-sm text-gray-600">{p.category}</td>
                        <td className="px-3 py-2 font-semibold text-sm">{p.quantity}</td>
                        <td className="px-3 py-2 text-sm">${p.price.toFixed(2)}</td>
                        <td className="px-3 py-2 font-semibold text-sm">${(p.quantity * p.price).toFixed(2)}</td>
                        <td className="px-3 py-2">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold
                            ${p.status === 'In Stock' ? 'bg-green-100 text-green-800' : p.status === 'Low Stock' ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'}`}>
                            {p.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-gray-100 font-bold">
                      <td colSpan="5" className="px-3 py-2 text-sm">TOTAL</td>
                      <td className="px-3 py-2 text-sm">${products.reduce((s, p) => s + (p.quantity * p.price), 0).toFixed(2)}</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Alerts */}
          {reportType === 'alerts' && (
            <div className="flex flex-col gap-6">
              <h3 className="text-blue-900 font-bold text-lg">Stock Alerts</h3>
              {[
                { label: '🔴 Out of Stock', filter: 'Out of Stock', bg: 'bg-red-50', border: 'border-red-200' },
                { label: '🟡 Low Stock', filter: 'Low Stock', bg: 'bg-orange-50', border: 'border-orange-200' },
              ].map(group => {
                const items = products.filter(p => p.status === group.filter)
                return (
                  <div key={group.label} className={`rounded-xl p-4 border ${group.bg} ${group.border}`}>
                    <h4 className="font-bold text-gray-800 mb-2">{group.label} ({items.length})</h4>
                    {items.length > 0 ? (
                      <ul className="flex flex-col gap-1 list-none p-0 m-0">
                        {items.map(p => (
                          <li key={p.id} className="text-sm text-gray-700">• {p.name} ({p.sku}) — Qty: {p.quantity}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-green-600 font-medium">✅ No items in this category</p>
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {/* Value Analysis */}
          {reportType === 'value' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <h4 className="font-bold text-blue-900 mb-3">Top 5 By Value</h4>
                <ol className="flex flex-col gap-2 list-none p-0 m-0">
                  {products.map(p => ({ ...p, value: p.quantity * p.price }))
                    .sort((a, b) => b.value - a.value).slice(0, 5)
                    .map((p, i) => (
                      <li key={p.id} className="flex justify-between text-sm">
                        <span className="text-gray-700">{i + 1}. {p.name}</span>
                        <span className="font-semibold text-blue-900">${p.value.toFixed(2)}</span>
                      </li>
                    ))}
                </ol>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <h4 className="font-bold text-blue-900 mb-3">Value by Category</h4>
                <ul className="flex flex-col gap-2 list-none p-0 m-0">
                  {['Electronics', 'Accessories', 'Cables', 'Furniture', 'Office Supplies'].map(cat => {
                    const val = products.filter(p => p.category === cat).reduce((s, p) => s + (p.quantity * p.price), 0)
                    return val > 0 ? (
                      <li key={cat} className="flex justify-between text-sm">
                        <span className="text-gray-700">{cat}</span>
                        <span className="font-semibold text-blue-900">${val.toFixed(2)}</span>
                      </li>
                    ) : null
                  })}
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-gray-100 flex justify-between">
          <Button label="🖨️ Print Report" onClick={() => window.print()} variant="secondary" />
          <Button label="Close" onClick={onClose} variant="secondary" />
        </div>
      </div>
    </div>
  )
}
