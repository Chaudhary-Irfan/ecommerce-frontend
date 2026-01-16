import { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0, 0, 0, 0.45)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999999,
};

const modalStyle = {
  width: '95%',
  maxWidth: '720px',
  background: 'white',
  borderRadius: '16px',
  boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
  overflow: 'hidden',
};

const headerStyle = {
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  padding: '1.25rem 1.5rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const bodyStyle = {
  padding: '1.5rem',
  color: 'white',
};

const footerStyle = {
  padding: '1rem 1.5rem',
  background: '#f8f9fa',
  display: 'flex',
  gap: '0.75rem',
  justifyContent: 'flex-end',
};

const inputGroupStyle = {
  marginBottom: '1rem',
};

const labelStyle = {
  display: 'block',
  marginBottom: '0.5rem',
  fontWeight: 600,
  color: '#2c3e50',
};

const inputStyle = {
  width: '95%',
  padding: '0.85rem',
  border: '2px solid #e1e8ed',
  borderRadius: '8px',
  fontSize: '1rem',
};

const OrderModal = ({ cart, onClose, onOrderSuccess }) => {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cart || cart.length === 0) return;

    setLoading(true);
    setError(null);

    const orderData = {
      customer_name: customerName,
      customer_email: customerEmail,
      status: 'pending',
      items: cart.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    try {
      await axios.post(`${API_BASE_URL}/orders`, orderData);
      onOrderSuccess && onOrderSuccess();
    } catch (err) {
      if (err.response?.data?.errors) {
        const messages = Object.values(err.response.data.errors).flat().join(' ');
        setError(messages || 'Failed to place order');
      } else {
        setError('Failed to place order');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle} role="dialog" aria-modal="true" aria-labelledby="checkout-title">
        <div style={headerStyle}>
          <h3 id="checkout-title" style={{ margin: 0 }}>Secure Checkout</h3>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              background: 'transparent',
              color: 'white',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
            }}
          >
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={bodyStyle}>
            <div
              style={{
                background: '#f8f9fa',
                padding: '1rem',
                borderRadius: '12px',
                marginBottom: '1rem',
                border: '1px solid #e1e8ed',
              }}
            >
              <h4 style={{ margin: '0 0 0.75rem 0', color: '#2c3e50' }}>Order Summary</h4>
              {cart.map((item) => (
                <div key={item.id} style={{ display: 'flex', color: 'black', justifyContent: 'space-between', padding: '0.25rem 0' }}>
                  <span>{item.name} × {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between',color: 'black', marginTop: '0.75rem', borderTop: '2px solid #667eea', paddingTop: '0.75rem', fontWeight: 700 }}>
                <span>Total</span>
                <span style={{ color: '#27ae60' }}>${total.toFixed(2)}</span>
              </div>
            </div>

            <div style={inputGroupStyle}>
              <label style={labelStyle}>Full Name</label>
              <input
                style={inputStyle}
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div style={inputGroupStyle}>
              <label style={labelStyle}>Email Address</label>
              <input
                style={inputStyle}
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            {error && (
              <div className="error" role="alert">{error}</div>
            )}
          </div>

          <div style={footerStyle}>
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
              style={{ padding: '0.75rem 1.25rem' }}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              style={{ padding: '0.75rem 1.25rem' }}
              disabled={loading}
            >
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderModal;
