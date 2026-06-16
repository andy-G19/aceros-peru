import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import DeferredSection from './components/DeferredSection';
import CartToast from './components/CartToast';
import Home from './pages/Home';

const Categories = lazy(() => import('./pages/Categories'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Cart = lazy(() => import('./pages/Cart'));
const Footer = lazy(() => import('./components/Footer'));

function RouteFallback() {
  return <div className="min-h-screen bg-[#0a0a0f]" />;
}

// Wrapper para pasar navigate a los componentes
function AppContent() {
  const navigate = useNavigate();

  const handleNavigate = (page) => {
    navigate(`/${page === 'home' ? '' : page}`);
  };

  return (
    <div className="min-h-screen bg-zinc-900">
      <Header onNavigate={handleNavigate} />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Home onNavigate={handleNavigate} />} />
          <Route path="/categories" element={<Categories onNavigate={handleNavigate} />} />
          <Route path="/product/:id" element={<ProductDetail onNavigate={handleNavigate} />} />
          <Route path="/cart" element={<Cart onNavigate={handleNavigate} />} />
        </Routes>
      </Suspense>
      <CartToast />
      <DeferredSection minHeight={260}>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </DeferredSection>
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
