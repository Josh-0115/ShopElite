import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import WomensLandingPage from './components/WomensLandingPage';
import MensLandingPage from './components/MensLandingPage';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import SignIn from './components/SignIn';
import Register from './components/Register';
import Account from './components/Account';
import { CartProvider } from './components/CartContext';

const App = () => {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/women" element={<WomensLandingPage />} />
            <Route path="/men" element={<MensLandingPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;