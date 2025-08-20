import React from 'react';
import EGImg from '/images/home/Electronics&Gadgets.jpg';
import FAImg from '/images/home/Fashion&Accessories.jpg';
import HLImg from '/images/home/Home&Living.jpg';
import SFImg from '/images/home/Sports&Fitness.jpg';

const categories = [
  {
    name: 'Electronics & Gadgets',
    image: EGImg,
  },
  {
    name: 'Fashion & Accessories',
    image: FAImg,
  },
  {
    name: 'Home & Living',
    image: HLImg,
  },
  {
    name: 'Sports & Fitness',
    image: SFImg,
  },
];

const Categories = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Shop by Category</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div
            key={category.name}
            className="relative group overflow-hidden rounded-xl shadow-md transition-all duration-300 hover:shadow-xl"
          >
            <div className="aspect-w-4 aspect-h-3">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent flex items-end">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white drop-shadow-md">
                  {category.name}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
