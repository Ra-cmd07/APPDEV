import Button from './components/Button'

export default function ProductList({ products, onDelete, onEdit }) {
  const statusStyles = {
    'In Stock': 'bg-green-100 text-green-800',
    'Low Stock': 'bg-orange-100 text-orange-800',
    'Out of Stock': 'bg-red-100 text-red-800',
  }

  const rowBorder = {
    'In Stock': 'border-l-4 border-l-green-500',
    'Low Stock': 'border-l-4 border-l-orange-400',
    'Out of Stock': 'border-l-4 border-l-red-500',
  }

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              {['Product Name', 'SKU', 'Category', 'Quantity', 'Price', 'Total Value', 'Status', 'Action'].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className={`hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 ${rowBorder[product.status] || ''}`}
              >
                <td className="px-4 py-3 font-semibold text-blue-900">{product.name}</td>
                <td className="px-4 py-3">
                  <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-sm">{product.sku}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="bg-blue-100 text-blue-700 px-3 py-0.5 rounded-full text-xs font-semibold">{product.category}</span>
                </td>
                <td className="px-4 py-3 font-semibold text-gray-800">{product.quantity}</td>
                <td className="px-4 py-3 font-semibold text-gray-800">${product.price.toFixed(2)}</td>
                <td className="px-4 py-3 font-semibold text-gray-800">${(product.quantity * product.price).toFixed(2)}</td>
                <td className="px-4 py-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[product.status] || ''}`}>
                    {product.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(product)}
                      title="Edit"
                      className="text-xl hover:scale-125 transition-transform duration-200 bg-transparent border-0 cursor-pointer p-1"
                    >✏️</button>
                    <button
                      onClick={() => onDelete(product.id)}
                      title="Delete"
                      className="text-xl hover:scale-125 hover:rotate-12 transition-all duration-200 bg-transparent border-0 cursor-pointer p-1"
                    >🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {products.length === 0 && (
        <div className="py-16 text-center text-gray-400">
          <p className="text-lg">No products found. Try adjusting your search.</p>
        </div>
      )}
    </div>
  )
}
