import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from './CartContext';

const Header = ({ cartCount, onCartClick }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/home" className="text-2xl font-bold text-gray-800">
              ShopElite
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            {['New Arrivals', 'Women', 'Men', 'Electronics', 'Home', 'Sale'].map((item) => (
              <Link
                key={item}
                to={
                  item === 'New Arrivals' ? '' :
                  item === 'Women' ? '/women' :
                  item === 'Men' ? '/men' :
                  item === 'Electronics' ? '' :
                  item === 'Home' ? '/home' :
                  item === 'Sale' ? '' : '/'
                }
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                {item}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-6">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-64 pl-10 pr-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm bg-gray-50"
              />
              <i className="fas fa-search absolute left-3 bottom-1 transform -translate-y-1/2 text-blue-400 text-sm"></i>
            </div>

            {/* User Icon */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="text-gray-600 hover:text-gray-900"
              >
                <i className="fas fa-user text-lg"></i>
              </button>
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                  {[
                    { label: 'My Account', iconClass: 'fa-solid fa-user', onClick: () => navigate('/account') },
                    { label: 'Orders', iconClass: 'fa-solid fa-box-open' },
                    { label: 'Wishlist', iconClass: 'fa-solid fa-heart' },
                    { label: 'Settings', iconClass: 'fa-solid fa-cog' },
                    {
                      label: 'Sign Out',
                      iconClass: 'fa-solid fa-right-from-bracket',
                      onClick: () => navigate('/signin'),
                    },
                  ].map(({ label, iconClass, onClick }) => (
                    <button
                      key={label}
                      onClick={onClick || (() => {})}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <i className={`${iconClass} text-gray-500 w-4 mr-5`}></i>
                      <span>{label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Icon */}
            <button
              onClick={onCartClick}
              className="relative text-gray-600 hover:text-gray-900"
            >
              <i className="fas fa-shopping-cart text-lg"></i>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
