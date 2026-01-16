import { useState } from 'react';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import OrderForm from './components/OrderForm';
import OrderModal from './components/OrderModal';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('products');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [notification, setNotification] = useState('');

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      const newQuantity = existingItem.quantity + 1;
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: newQuantity } : item
      ));
      setNotification(`${product.name} added to cart (count ${newQuantity})`);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
      setNotification(`${product.name} added to cart`);
    }
    setTimeout(() => setNotification(''), 3000);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setCurrentView('productDetail');
  };

  const handleBackToProducts = () => {
    setCurrentView('products');
    setSelectedProduct(null);
  };

  const handleViewCart = () => {
    setCurrentView('cart');
  };

  const handleCheckout = () => {
    // Open modal for order details instead of navigating to a form page
    setShowOrderModal(true);
  };

  const handleOrderSuccess = () => {
    setCart([]);
    setShowOrderModal(false);
    setCurrentView('orderSuccess');
  };

  const renderView = () => {
    switch (currentView) {
      case 'products':
        return <ProductList onViewProduct={handleViewProduct} onAddToCart={addToCart} />;
      case 'productDetail':
        return <ProductDetail product={selectedProduct} onAddToCart={addToCart} onBack={handleBackToProducts} />;
      case 'cart':
        return <Cart cart={cart} onRemoveFromCart={removeFromCart} onCheckout={handleCheckout} />;
      case 'orderForm':
        return <OrderForm cart={cart} onOrderSuccess={handleOrderSuccess} onBack={() => setCurrentView('cart')} />;
      case 'orderSuccess':
        return (
          <div className="content-container">
            <div className="success">
              <h2>🎉 Order Placed Successfully!</h2>
              <p>Thank you for your purchase. Your order has been received and is being processed.</p>
              <button className="btn-primary" onClick={() => setCurrentView('products')}>
                Continue Shopping
              </button>
            </div>
          </div>
        );
      default:
        return <ProductList onViewProduct={handleViewProduct} onAddToCart={addToCart} />;
    }
  };

  return (
    <div className="app">
      <header>
        <h1>E-Commerce Store</h1>
        <div className="nav-buttons">
          <button onClick={() => setCurrentView('products')}>🏠 Products</button>
          <button onClick={handleViewCart}>🛒 Cart ({cart.length})</button>
        </div>
      </header>
      {notification && <div className="notification">{notification}</div>}
      <main>
        {renderView()}
        {showOrderModal && (
          <OrderModal
            cart={cart}
            onClose={() => setShowOrderModal(false)}
            onOrderSuccess={handleOrderSuccess}
          />
        )}
      </main>
      <footer>
        <p>&copy; 2024 E-Commerce Store. Built with React & Laravel.</p>
      </footer>
    </div>
  );
}

export default App;
