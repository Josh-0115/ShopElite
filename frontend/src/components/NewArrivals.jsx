import React, { useState, useContext } from 'react';
import { CartContext } from './CartContext'; // Import CartContext
import PWHImg from '/images/newarrival/Headphones.jpg';
import SFWImg from '/images/newarrival/Watch.jpg';
import DLBImg from '/images/newarrival/Bag.jpg';
import PCMImg from '/images/newarrival/Coffee.jpg';

const newArrivals = [
  {
    id: 2001,
    name: 'Premium Wireless Headphones',
    price: 299.99,
    image: PWHImg,
    gender: 'electronics' // Add gender for cart uniqueness
  },
  {
    id: 2002,
    name: 'Smart Fitness Watch',
    price: 199.99,
    image: SFWImg,
    gender: 'electronics'
  },
  {
    id: 2003,
    name: 'Designer Leather Bag',
    price: 449.99,
    image: DLBImg,
    gender: 'accessories'
  },
  {
    id: 2004,
    name: 'Premium Coffee Maker',
    price: 179.99,
    image: PCMImg,
    gender: 'home'
  }
];

const NewArrivals = () => {
  const { handleAddToCart } = useContext(CartContext); // Access handleAddToCart
  const [showQuickAdd, setShowQuickAdd] = useState(null);

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">New Arrivals</h2>
        <button className="text-blue-600 hover:text-blue-700 font-medium">
          View All <i className="fas fa-arrow-right ml-2"></i>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {newArrivals.map((product) => (
          <div
            key={`${product.gender}-${product.id}`} // Unique key including gender
            className="bg-white rounded-lg shadow-lg overflow-hidden"
            onMouseEnter={() => setShowQuickAdd(product.id)}
            onMouseLeave={() => setShowQuickAdd(null)}
          >
            <div className="relative aspect-w-1 aspect-h-1">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              {showQuickAdd === product.id && (
                <div className="absolute inset-0 bg-black/70 bg-opacity-40 flex items-center justify-center">
                  <button
                    onClick={() => handleAddToCart(product)} // Call handleAddToCart
                    className="bg-white text-gray-900 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                  >
                    Quick Add
                  </button>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">{product.name}</h3>
              <p className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;