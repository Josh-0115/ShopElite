import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import SignIn from './components/SignIn';
import Home from './components/Home';
import WomensLandingPage from './components/WomensLandingPage';
import MensLandingPage from './components/MensLandingPage';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import { CartProvider } from './components/CartContext';

const App = () => {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/" element={<SignIn />} />     SignIn shown first */}
            <Route path="/home" element={<Home />} />   {/* Home shown after login */}
            <Route path="/women" element={<WomensLandingPage />} />
            <Route path="/men" element={<MensLandingPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />

          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
