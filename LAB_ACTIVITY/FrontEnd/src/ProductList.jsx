export default function ProductList({ products, onDelete, onEdit }) {
  return (
    <div className="products-container">
      <table className="products-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>SKU</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total Value</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id} className={`status-${product.status.toLowerCase().replace(' ', '-')}`}>
              <td className="product-name">{product.name}</td>
              <td className="sku">{product.sku}</td>
              <td className="category">{product.category}</td>
              <td className="quantity">{product.quantity}</td>
              <td className="price">${product.price.toFixed(2)}</td>
              <td className="total-value">${(product.quantity * product.price).toFixed(2)}</td>
              <td>
                <span className={`status-badge status-${product.status.toLowerCase().replace(' ', '-')}`}>
                  {product.status}
                </span>
              </td>
              <td className="action">
                <button 
                  className="btn-edit"
                  onClick={() => onEdit(product)}
                  title="Edit product"
                >
                  ✏️
                </button>
                <button 
                  className="btn-delete" 
                  onClick={() => onDelete(product.id)}
                  title="Delete product"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {products.length === 0 && (
        <div className="no-products">
          <p>No products found. Try adjusting your search.</p>
        </div>
      )}
    </div>
  )
}
