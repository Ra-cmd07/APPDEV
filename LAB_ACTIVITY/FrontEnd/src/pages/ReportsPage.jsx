import { useState } from 'react'
import Button from '../components/Button'

export default function ReportsPage({ products }) {
  const [reportType, setReportType] = useState('summary')

  const stats = {
    totalProducts: products.length,
    totalValue: products.reduce((sum, p) => sum + (p.quantity * p.price), 0),
    lowStock: products.filter(p => p.status === 'Low Stock').length,
    outOfStock: products.filter(p => p.status === 'Out of Stock').length,
    inStock: products.filter(p => p.status === 'In Stock').length,
    avgPrice: products.length ? products.reduce((s, p) => s + p.price, 0) / products.length : 0,
  }

  const tabs = [
    { key: 'summary', label: '📋 Summary' },
    { key: 'detailed', label: '📑 Detailed' },
    { key: 'alerts', label: '⚠️ Alerts' },
    { key: 'value', label: '💰 Value Analysis' },
  ]

  return (
    <div className="flex flex-col gap-6">

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-blue-900">Reports</h2>
          <p className="text-gray-500 text-sm mt-1">Analyze and export your inventory data</p>
        </div>
        <Button label="🖨️ Print Report" onClick={() => window.print()} variant="secondary" />
      </div>

      {/* Report Tabs */}
      <div className="flex gap-2 flex-wrap">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setReportType(tab.key)}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer border-0
              ${reportType === tab.key
                ? 'bg-blue-800 text-white shadow-md'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 shadow-sm'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <p className="text-xs text-gray-400">Generated: {new Date().toLocaleString()}</p>

      {/* Summary */}
      {reportType === 'summary' && (
        <div className="flex flex-col gap-6">
          <h3 className="text-blue-900 font-bold text-lg">Inventory Summary Report</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: '📦 Total Products', value: stats.totalProducts, color: 'border-blue-300 bg-blue-50 text-blue-900' },
              { label: '💰 Total Value', value: `$${stats.totalValue.toLocaleString('en-US', { maximumFractionDigits: 2 })}`, color: 'border-blue-300 bg-blue-50 text-blue-900' },
              { label: '✅ In Stock', value: stats.inStock, color: 'border-green-300 bg-green-50 text-green-800' },
              { label: '⚠️ Low Stock', value: stats.lowStock, color: 'border-orange-300 bg-orange-50 text-orange-800' },
              { label: '❌ Out of Stock', value: stats.outOfStock, color: 'border-red-300 bg-red-50 text-red-800' },
              { label: '💲 Avg Unit Price', value: `$${stats.avgPrice.toFixed(2)}`, color: 'border-purple-300 bg-purple-50 text-purple-800' },
            ].map(card => (
              <div key={card.label} className={`rounded-2xl border-2 p-5 ${card.color} hover:shadow-md transition-all`}>
                <p className="text-xs font-semibold uppercase tracking-wider opacity-70 mb-2">{card.label}</p>
                <p className="text-3xl font-bold">{card.value}</p>
              </div>
            ))}
          </div>

          {/* Category Breakdown */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <h4 className="text-blue-900 font-bold mb-4">Products by Category</h4>
            <div className="flex flex-col gap-3">
              {['Electronics', 'Accessories', 'Cables', 'Furniture', 'Office Supplies'].map(cat => {
                const count = products.filter(p => p.category === cat).length
                const pct = products.length ? Math.round((count / products.length) * 100) : 0
                return count > 0 ? (
                  <div key={cat} className="flex items-center gap-4">
                    <span className="text-sm text-gray-700 w-36 font-medium">{cat}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-blue-700 to-blue-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-blue-900 w-16 text-right">{count} ({pct}%)</span>
                  </div>
                ) : null
              })}
            </div>
          </div>
        </div>
      )}

      {/* Detailed */}
      {reportType === 'detailed' && (
        <div className="flex flex-col gap-4">
          <h3 className="text-blue-900 font-bold text-lg">Detailed Inventory Report</h3>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    {['Product Name', 'SKU', 'Category', 'Quantity', 'Unit Price', 'Total Value', 'Status'].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-blue-900 text-sm">{p.name}</td>
                      <td className="px-4 py-3 font-mono text-xs bg-gray-50 text-gray-600">{p.sku}</td>
                      <td className="px-4 py-3">
                        <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-semibold">{p.category}</span>
                      </td>
                      <td className="px-4 py-3 font-semibold text-sm text-gray-800">{p.quantity}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">${p.price.toFixed(2)}</td>
                      <td className="px-4 py-3 font-bold text-sm text-blue-900">${(p.quantity * p.price).toFixed(2)}</td>
                      <td className="px-4 py-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold
                          ${p.status === 'In Stock' ? 'bg-green-100 text-green-800' : p.status === 'Low Stock' ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'}`}>
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-blue-50 font-bold border-t-2 border-blue-200">
                    <td colSpan="5" className="px-4 py-3 text-blue-900 text-sm">GRAND TOTAL</td>
                    <td className="px-4 py-3 text-blue-900 text-sm">${products.reduce((s, p) => s + (p.quantity * p.price), 0).toFixed(2)}</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Alerts */}
      {reportType === 'alerts' && (
        <div className="flex flex-col gap-5">
          <h3 className="text-blue-900 font-bold text-lg">Stock Alert Report</h3>
          {[
            { label: '🔴 Out of Stock', filter: 'Out of Stock', bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', badge: 'bg-red-100 text-red-700' },
            { label: '🟡 Low Stock', filter: 'Low Stock', bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-800', badge: 'bg-orange-100 text-orange-700' },
            { label: '🟢 In Stock', filter: 'In Stock', bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800', badge: 'bg-green-100 text-green-700' },
          ].map(group => {
            const items = products.filter(p => p.status === group.filter)
            return (
              <div key={group.label} className={`rounded-2xl border-2 p-5 ${group.bg} ${group.border}`}>
                <div className="flex items-center justify-between mb-3">
                  <h4 className={`font-bold text-base ${group.text}`}>{group.label}</h4>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${group.badge}`}>{items.length} items</span>
                </div>
                {items.length > 0 ? (
                  <div className="flex flex-col gap-2">
                    {items.map(p => (
                      <div key={p.id} className="flex items-center justify-between bg-white rounded-xl px-4 py-2.5 shadow-sm">
                        <div>
                          <span className="font-semibold text-gray-800 text-sm">{p.name}</span>
                          <span className="ml-2 font-mono text-xs text-gray-400">{p.sku}</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-700">Qty: {p.quantity}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm font-medium opacity-70">No items in this category</p>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Value Analysis */}
      {reportType === 'value' && (
        <div className="flex flex-col gap-5">
          <h3 className="text-blue-900 font-bold text-lg">Inventory Value Analysis</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h4 className="font-bold text-blue-900 mb-4">🏆 Top 5 By Value</h4>
              <div className="flex flex-col gap-3">
                {products.map(p => ({ ...p, value: p.quantity * p.price }))
                  .sort((a, b) => b.value - a.value).slice(0, 5)
                  .map((p, i) => (
                    <div key={p.id} className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold
                        ${i === 0 ? 'bg-yellow-100 text-yellow-700' : i === 1 ? 'bg-gray-100 text-gray-600' : 'bg-orange-50 text-orange-600'}`}>
                        {i + 1}
                      </span>
                      <span className="flex-1 text-sm text-gray-700 font-medium">{p.name}</span>
                      <span className="font-bold text-blue-900 text-sm">${p.value.toFixed(2)}</span>
                    </div>
                  ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h4 className="font-bold text-blue-900 mb-4">📂 Value by Category</h4>
              <div className="flex flex-col gap-3">
                {['Electronics', 'Accessories', 'Cables', 'Furniture', 'Office Supplies'].map(cat => {
                  const val = products.filter(p => p.category === cat).reduce((s, p) => s + (p.quantity * p.price), 0)
                  const pct = stats.totalValue ? Math.round((val / stats.totalValue) * 100) : 0
                  return val > 0 ? (
                    <div key={cat} className="flex flex-col gap-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700 font-medium">{cat}</span>
                        <span className="font-bold text-blue-900">${val.toFixed(2)} <span className="text-gray-400 font-normal">({pct}%)</span></span>
                      </div>
                      <div className="bg-gray-100 rounded-full h-2">
                        <div className="bg-gradient-to-r from-blue-700 to-blue-400 h-2 rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  ) : null
                })}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
