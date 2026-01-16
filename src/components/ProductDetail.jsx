const ProductDetail = ({ product, onAddToCart, onBack }) => {
  if (!product) return <div className="error">Product not found</div>;

  return (
    <div className="content-container">
      <button className="btn-secondary" onClick={onBack}>← Back to Products</button>
      <div className="product-card" style={{ maxWidth: '600px',color: 'black', margin: '2rem auto' }}>
        <h2>{product.name}</h2>
        <p style={{ fontSize: '1.1rem',color: 'black', margin: '1rem 0' }}>{product.description}</p>
        <div style={{ display: 'flex', color: 'black', justifyContent: 'space-between', alignItems: 'center', margin: '1rem 0' }}>
          <span className="product-price">${product.price}</span>
          {product.is_active ? (
            <span style={{ color: '#27ae60', fontWeight: 600 }}>Available</span>
          ) : (
            <span style={{ color: '#e74c3c', fontWeight: 600 }}>Unavailable</span>
          )}
        </div>
        <button className="btn-primary" onClick={() => onAddToCart(product)}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetail;