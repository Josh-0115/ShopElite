import React, { useState, useContext } from 'react';
import { CartContext } from './CartContext';
import Header from './Header';
import Footer from './Footer';
import HeroSection from './HeroSection';
import Categories from './Categories';
import NewArrivals from './NewArrivals';
import SpecialOffer from './SpecialOffer';
import Newsletter from './Newsletter';
import Cart from './cart';

const Home = () => {
  const { cartCount } = useContext(CartContext);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <Header cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />
      <main className="pt-16">
        <HeroSection />
        <Categories />
        <NewArrivals />
        <SpecialOffer />
        <Newsletter />
      </main>
      {isCartOpen && (
        <div className="fixed top-0 right-0 w-full sm:w-96 h-full bg-white shadow-lg z-50 flex flex-col">
          <Cart onClose={() => setIsCartOpen(false)} />
        </div>
      )}
      <Footer />
    </>
  );
};

export default Home;