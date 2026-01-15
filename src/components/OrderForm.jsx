import { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const OrderForm = ({ cart, onOrderSuccess, onBack }) => {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const orderData = {
      customer_name: customerName,
      customer_email: customerEmail,
      status: 'pending',
      items: cart.map(item => ({
        product_id: item.id,
        quantity: item.quantity,
        price: item.price
      }))
    };

    try {
      await axios.post(`${API_BASE_URL}/orders`, orderData);
      onOrderSuccess();
    } catch (err) {
      setError('Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="content-container">
      <button className="btn-secondary" onClick={onBack}>← Back to Cart</button>
      <div style={{ textAlign: 'center', marginBottom: '2rem', padding: '0 2rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#2c3e50' }}>Complete Your Order</h2>
        <p style={{ color: '#7f8c8d' }}>Please provide your details to finalize the purchase</p>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name:</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="form-group">
            <label>Email Address:</label>
            <input
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              placeholder="Enter your email address"
              required
            />
          </div>

          <div className="order-summary">
            <h3>Order Summary</h3>
            {cart.map(item => (
              <div key={item.id} className="order-item">
                <span>{item.name} × {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="order-item" style={{ borderTop: '2px solid #667eea', marginTop: '1rem', paddingTop: '1rem' }}>
              <span style={{ fontWeight: '700' }}>Total Amount</span>
              <span style={{ fontWeight: '700', color: '#27ae60' }}>
                ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}
          >
            {loading ? 'Processing Order...' : 'Place Order'}
          </button>
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default OrderForm;