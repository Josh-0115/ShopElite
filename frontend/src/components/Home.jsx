import React from 'react';
import { CartContext } from './CartContext';
import Header from './Header';
import Footer from './Footer';
import HeroSection from './HeroSection';
import Categories from './Categories';
import NewArrivals from './NewArrivals';
import SpecialOffer from './SpecialOffer';
import Newsletter from './Newsletter';
import { useContext } from 'react';

const Home = () => {
  const { cartCount } = useContext(CartContext);

  return (
    <>
      <Header cartCount={cartCount} />
      <main className="pt-16">
        <HeroSection />
        <Categories />
        <NewArrivals />
        <SpecialOffer />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
};

export default Home;