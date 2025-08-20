import React from 'react';
import homebg from '/images/home/Homebg.jpg'

const HeroSection = () => {
  return (
    <div className="relative h-[600px] bg-cover bg-center" style={{
      backgroundImage: `url(${homebg})`
    }}>
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="max-w-xl text-white">
            <h2 className="text-5xl font-bold mb-6">Discover Your Style</h2>
            <p className="text-xl mb-8">Explore our new collection of premium products curated just for you. Up to 40% off on selected items.</p>
            <button className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default HeroSection;