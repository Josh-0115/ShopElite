import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Newsletter from './Newsletter';
import { useContext } from 'react';
import { CartContext } from './CartContext';
import menbg from '../assets/images/men/men-bg.jpg'

const MensLandingPage = () => {
  const { cartItems, cartCount, handleAddToCart, increaseQuantity, decreaseQuantity, removeItem } = useContext(CartContext);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(null);
  const [activeFilters, setActiveFilters] = useState([]);
  const [filterMenuOpen, setFilterMenuOpen] = useState(null);
  const [sortOption, setSortOption] = useState("Featured");
  const [viewMode, setViewMode] = useState("grid");
  const [menProducts, setMenProducts] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/men")
      .then((res) => res.json())
      .then((data) => setMenProducts(data.map(product => ({ ...product, gender: 'men' }))))
      .catch((error) => console.error("Error fetching men products:", error));
  }, []);

  const toggleFilter = (filter) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(item => item !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const removeFilter = (filter) => {
    setActiveFilters(activeFilters.filter(item => item !== filter));
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
  };

  const toggleFilterMenu = (menu) => {
    setFilterMenuOpen(filterMenuOpen === menu ? null : menu);
  };

  const isPriceMatch = (price) => {
    for (let filter of activeFilters) {
      if (filter === 'Under $100' && price < 100) return true;
      if (filter === '$100 - $200' && price >= 100 && price <= 200) return true;
      if (filter === '$200 - $300' && price >= 200 && price <= 300) return true;
      if (filter === 'Over $300' && price > 300) return true;
    }
    return false;
  };

  let filteredProducts = menProducts.filter(product => {
    return (
      activeFilters.length === 0 ||
      activeFilters.some(filter =>
        product.category === filter ||
        product.subcategory === filter ||
        product.colors.includes(filter) ||
        product.sizes.includes(filter) ||
        isPriceMatch(product.price)
      )
    );
  });

  filteredProducts = filteredProducts.sort((a, b) => {
    if (sortOption === "Price: Low to High") return a.price - b.price;
    if (sortOption === "Price: High to Low") return b.price - a.price;
    if (sortOption === "Newest") return new Date(b.dateAdded || '2025-07-18') - new Date(a.dateAdded || '2025-07-18');
    if (sortOption === "Best Selling") return (b.sales || 0) - (a.sales || 0);
    return 0;
  });

  const newArrivals = menProducts.filter(product => product.isNew);
  const bestSellers = menProducts.filter(product => product.isBestSeller);
  const trending = [menProducts[1], menProducts[3], menProducts[5], menProducts[7]].filter(Boolean);
  const seasonal = [menProducts[0], menProducts[2], menProducts[4], menProducts[6]].filter(Boolean);

  return (
    <div className="min-h-screen bg-white">
      <Header
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
      />
      <main className="pt-16">
        <div className="bg-gray-50 py-3">
          <div className="max-w-7xl mx-auto px-4">
            <nav className="flex text-sm">
              <Link to="/home" className="text-gray-500 hover:text-gray-700">Home</Link>
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Men</span>
            </nav>
          </div>
        </div>

        <div className="relative h-[400px] bg-cover bg-center" style={{
          backgroundImage: `url(${menbg})`
        }}>
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-transparent">
            <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
              <div className="max-w-xl text-white">
                <h1 className="text-4xl font-bold mb-4">Men's Collection</h1>
                <p className="text-lg mb-6">Discover our curated selection of premium Men's fashion. From elegant essentials to statement pieces that define your style.</p>
                <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors cursor-pointer !rounded-button whitespace-nowrap">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="relative">
                  <button
                    onClick={() => toggleFilterMenu('category')}
                    className="flex items-center space-x-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer !rounded-button whitespace-nowrap"
                  >
                    <span>Category</span>
                    <i className={`fas fa-chevron-${filterMenuOpen === 'category' ? 'up' : 'down'} text-xs`}></i>
                  </button>
                  {filterMenuOpen === 'category' && (
                    <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-10">
                      {['clothing', 'shoes', 'accessories'].map((item) => (
                        <label key={item} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
                          <input
                            type="checkbox"
                            className="mr-2"
                            checked={activeFilters.includes(item)}
                            onChange={() => toggleFilter(item)}
                          />
                          <span className="text-sm text-gray-700">{item.charAt(0).toUpperCase() + item.slice(1)}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative">
                  <button
                    onClick={() => toggleFilterMenu('subcategory')}
                    className="flex items-center space-x-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer !rounded-button whitespace-nowrap"
                  >
                    <span>Subcategory</span>
                    <i className={`fas fa-chevron-${filterMenuOpen === 'subcategory' ? 'up' : 'down'} text-xs`}></i>
                  </button>
                  {filterMenuOpen === 'subcategory' && (
                    <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-10">
                      {['outerwear', 'shirts', 'pants', 'knitwear', 'formal', 'belts', 'ties', 'wallets'].map((item) => (
                        <label key={item} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
                          <input
                            type="checkbox"
                            className="mr-2"
                            checked={activeFilters.includes(item)}
                            onChange={() => toggleFilter(item)}
                          />
                          <span className="text-sm text-gray-700">{item.charAt(0).toUpperCase() + item.slice(1)}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative">
                  <button
                    onClick={() => toggleFilterMenu('color')}
                    className="flex items-center space-x-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer !rounded-button whitespace-nowrap"
                  >
                    <span>Color</span>
                    <i className={`fas fa-chevron-${filterMenuOpen === 'color' ? 'up' : 'down'} text-xs`}></i>
                  </button>
                  {filterMenuOpen === 'color' && (
                    <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-10">
                      {['Black', 'Navy', 'Camel', 'White', 'Light Blue', 'Pink', 'Brown', 'Dark Blue', 'Gray', 'Burgundy', 'Red', 'Blue Pattern'].map((item) => (
                        <label key={item} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
                          <input
                            type="checkbox"
                            className="mr-2"
                            checked={activeFilters.includes(item)}
                            onChange={() => toggleFilter(item)}
                          />
                          <span className="text-sm text-gray-700">{item}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative">
                  <button
                    onClick={() => toggleFilterMenu('size')}
                    className="flex items-center space-x-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer !rounded-button whitespace-nowrap"
                  >
                    <span>Size</span>
                    <i className={`fas fa-chevron-${filterMenuOpen === 'size' ? 'up' : 'down'} text-xs`}></i>
                  </button>
                  {filterMenuOpen === 'size' && (
                    <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-10">
                      {['S', 'M', 'L', 'XL', 'XXL', '7', '8', '9', '10', '11', '12', '30', '32', '34', '36', '38', '40', 'One Size'].map((item) => (
                        <label key={item} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
                          <input
                            type="checkbox"
                            className="mr-2"
                            checked={activeFilters.includes(item)}
                            onChange={() => toggleFilter(item)}
                          />
                          <span className="text-sm text-gray-700">{item}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative">
                  <button
                    onClick={() => toggleFilterMenu('price')}
                    className="flex items-center space-x-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer !rounded-button whitespace-nowrap"
                  >
                    <span>Price</span>
                    <i className={`fas fa-chevron-${filterMenuOpen === 'price' ? 'up' : 'down'} text-xs`}></i>
                  </button>
                  {filterMenuOpen === 'price' && (
                    <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-10">
                      {['Under $100', '$100 - $200', '$200 - $300', 'Over $300'].map((item) => (
                        <label key={item} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
                          <input
                            type="checkbox"
                            className="mr-2"
                            checked={activeFilters.includes(item)}
                            onChange={() => toggleFilter(item)}
                          />
                          <span className="text-sm text-gray-700">{item}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative">
                  <button
                    onClick={() => toggleFilterMenu('sort')}
                    className="flex items-center space-x-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer !rounded-button whitespace-nowrap"
                  >
                    <span>Sort: {sortOption}</span>
                    <i className={`fas fa-chevron-${filterMenuOpen === 'sort' ? 'up' : 'down'} text-xs`}></i>
                  </button>
                  {filterMenuOpen === 'sort' && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-10">
                      {['Featured', 'Newest', 'Price: Low to High', 'Price: High to Low', 'Best Selling'].map((item) => (
                        <button
                          key={item}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                          onClick={() => {
                            setSortOption(item);
                            setFilterMenuOpen(null);
                          }}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-gray-100 text-gray-900' : 'bg-white text-gray-500'} cursor-pointer !rounded-button whitespace-nowrap`}
                    onClick={() => setViewMode('grid')}
                  >
                    <i className="fas fa-th-large"></i>
                  </button>
                  <button
                    className={`px-3 py-2 ${viewMode === 'list' ? 'bg-gray-100 text-gray-900' : 'bg-white text-gray-500'} cursor-pointer !rounded-button whitespace-nowrap`}
                    onClick={() => setViewMode('list')}
                  >
                    <i className="fas fa-list"></i>
                  </button>
                </div>
              </div>
            </div>

            {activeFilters.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <span className="text-sm text-gray-500">Active filters:</span>
                {activeFilters.map(filter => (
                  <span key={filter} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {filter}
                    <button
                      onClick={() => removeFilter(filter)}
                      className="ml-1.5 text-gray-500 hover:text-gray-700 cursor-pointer !rounded-button whitespace-nowrap"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </span>
                ))}
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-blue-600 hover:text-blue-800 ml-2 cursor-pointer !rounded-button whitespace-nowrap"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Men's Products</h2>
          <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1'} gap-6`}>
            {filteredProducts.map((product) => (
              <div
                key={`${product.gender}-${product.id}`}
                className={`bg-white rounded-lg shadow-sm overflow-hidden ${viewMode === 'list' ? 'flex' : ''} border border-gray-100 hover:shadow-md transition-shadow`}
                onMouseEnter={() => setShowQuickAdd(product.id)}
                onMouseLeave={() => setShowQuickAdd(null)}
              >
                <div className={`relative ${viewMode === 'list' ? 'w-1/3' : ''}`}>
                  <div className="aspect-w-3 aspect-h-4 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  {product.isNew && (
                    <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">NEW</span>
                  )}
                  {product.isBestSeller && (
                    <span className="absolute top-2 right-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded">BEST SELLER</span>
                  )}
                  {showQuickAdd === product.id && (
                    <div className="absolute inset-0 bg-black/70 bg-opacity-40 flex items-center justify-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                        className="bg-white text-gray-900 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        Quick Add
                      </button>
                    </div>
                  )}
                </div>
                <div className={`p-4 ${viewMode === 'list' ? 'w-2/3' : ''}`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">{product.name}</h3>
                      <p className="text-xl font-bold text-gray-900">${product.price}</p>
                    </div>
                    {viewMode === 'list' && (
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                  {viewMode === 'list' && (
                    <p className="text-gray-600 mt-2 mb-4">
                      {product.category} • {product.subcategory}
                    </p>
                  )}
                  <div className="mt-3 flex items-center">
                    <span className="text-sm text-gray-500 mr-2">Colors:</span>
                    <div className="flex space-x-1">
                      {product.colors.map((color) => (
                        <span
                          key={color}
                          className="w-4 h-4 rounded-full border border-gray-300"
                          style={{ backgroundColor: color.toLowerCase() }}
                        ></span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <button className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors cursor-pointer">
              Load More Products
            </button>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 py-12 bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">New Arrivals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <div
                key={`${product.gender}-${product.id}`}
                className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
                onMouseEnter={() => setShowQuickAdd(product.id)}
                onMouseLeave={() => setShowQuickAdd(null)}
              >
                <div className="relative">
                  <div className="aspect-w-3 aspect-h-4 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  {product.isNew && (
                    <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">NEW</span>
                  )}
                  {showQuickAdd === product.id && (
                    <div className="absolute inset-0 bg-black/70 bg-opacity-40 flex items-center justify-center">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="bg-white text-gray-900 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        Quick Add
                      </button>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-xl font-bold text-gray-900">${product.price}</p>
                  <div className="mt-3 flex items-center">
                    <span className="text-sm text-gray-500 mr-2">Colors:</span>
                    <div className="flex space-x-1">
                      {product.colors.map((color) => (
                        <span
                          key={color}
                          className="w-4 h-4 rounded-full border border-gray-300"
                          style={{ backgroundColor: color.toLowerCase() }}
                        ></span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Trending Now</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {trending.map((product) => (
              <div
                key={`${product.gender}-${product.id}`}
                className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
                onMouseEnter={() => setShowQuickAdd(product.id)}
                onMouseLeave={() => setShowQuickAdd(null)}
              >
                <div className="relative">
                  <div className="aspect-w-3 aspect-h-4 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  {product.isBestSeller && (
                    <span className="absolute top-2 right-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded">BEST SELLER</span>
                  )}
                  {showQuickAdd === product.id && (
                    <div className="absolute inset-0 bg-black/70 bg-opacity-40 flex items-center justify-center">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="bg-white text-gray-900 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        Quick Add
                      </button>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-xl font-bold text-gray-900">${product.price}</p>
                  <div className="mt-3 flex items-center">
                    <span className="text-sm text-gray-500 mr-2">Colors:</span>
                    <div className="flex space-x-1">
                      {product.colors.map((color) => (
                        <span
                          key={color}
                          className="w-4 h-4 rounded-full border border-gray-300"
                          style={{ backgroundColor: color.toLowerCase() }}
                        ></span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 py-12 bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Best Sellers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <div
                key={`${product.gender}-${product.id}`}
                className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
                onMouseEnter={() => setShowQuickAdd(product.id)}
                onMouseLeave={() => setShowQuickAdd(null)}
              >
                <div className="relative">
                  <div className="aspect-w-3 aspect-h-4 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  {product.isBestSeller && (
                    <span className="absolute top-2 right-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded">BEST SELLER</span>
                  )}
                  {showQuickAdd === product.id && (
                    <div className="absolute inset-0 bg-black/70 bg-opacity-40 flex items-center justify-center">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="bg-white text-gray-900 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        Quick Add
                      </button>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-xl font-bold text-gray-900">${product.price}</p>
                  <div className="mt-3 flex items-center">
                    <span className="text-sm text-gray-500 mr-2">Colors:</span>
                    <div className="flex space-x-1">
                      {product.colors.map((color) => (
                        <span
                          key={color}
                          className="w-4 h-4 rounded-full border border-gray-300"
                          style={{ backgroundColor: color.toLowerCase() }}
                        ></span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Seasonal Collection</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {seasonal.map((product) => (
              <div
                key={`${product.gender}-${product.id}`}
                className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
                onMouseEnter={() => setShowQuickAdd(product.id)}
                onMouseLeave={() => setShowQuickAdd(null)}
              >
                <div className="relative">
                  <div className="aspect-w-3 aspect-h-4 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  {product.isNew && (
                    <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">NEW</span>
                  )}
                  {showQuickAdd === product.id && (
                    <div className="absolute inset-0 bg-black/70 bg-opacity-40 flex items-center justify-center">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="bg-white text-gray-900 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        Quick Add
                      </button>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-xl font-bold text-gray-900">${product.price}</p>
                  <div className="mt-3 flex items-center">
                    <span className="text-sm text-gray-500 mr-2">Colors:</span>
                    <div className="flex space-x-1">
                      {product.colors.map((color) => (
                        <span
                          key={color}
                          className="w-4 h-4 rounded-full border border-gray-300"
                          style={{ backgroundColor: color.toLowerCase() }}
                        ></span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Newsletter />
      </main>
      {isCartOpen && (
        <div className="fixed top-0 right-0 w-full sm:w-96 h-full bg-white shadow-lg z-50 flex flex-col">
          <Cart onClose={() => setIsCartOpen(false)} />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default MensLandingPage;