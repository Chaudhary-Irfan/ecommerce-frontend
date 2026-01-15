const Cart = ({ cart, onRemoveFromCart, onCheckout }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="content-container">
      <div style={{ textAlign: 'center', marginBottom: '2rem', padding: '0 2rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#2c3e50' }}>Shopping Cart</h2>
        <p style={{ color: '#7f8c8d' }}>Review your items and proceed to checkout</p>
        
      </div>
      {cart.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#7f8c8d' }}>
          <h3>Your cart is empty</h3>
          <p>Add some products to get started!</p>
        </div>
      ) : (
        <div>
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <div>
                <h3>{item.name}</h3>
                <p style={{ margin: '0.5rem 0', color: '#27ae60', fontWeight: '600' }}>
                  ${item.price} × {item.quantity}
                </p>
              </div>
              <button
                className="btn-secondary"
                onClick={() => onRemoveFromCart(item.id)}
                style={{ padding: '0.5rem 1rem' }}
              >
                Remove
              </button>
            </div>
          ))}
          <div className="cart-total">
            Total: ${total.toFixed(2)}
          </div>
          <button className="btn-primary" onClick={onCheckout} style={{ width: '100%', padding: '1rem' }}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;