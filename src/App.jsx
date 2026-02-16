import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Categories from './pages/Categories';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';

// Wrapper para pasar navigate a los componentes
function AppContent() {
  const navigate = useNavigate();

  const handleNavigate = (page) => {
    navigate(`/${page === 'home' ? '' : page}`);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header onNavigate={handleNavigate} />
      <Routes>
        <Route path="/" element={<Home onNavigate={handleNavigate} />} />
        <Route path="/categories" element={<Categories onNavigate={handleNavigate} />} />
        <Route path="/product/:id" element={<ProductDetail onNavigate={handleNavigate} />} />
        <Route path="/cart" element={<Cart onNavigate={handleNavigate} />} />
      </Routes>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
}

export default App;