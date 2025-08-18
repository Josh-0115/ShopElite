import React from 'react';


const Footer = () => {
  return (
    <footer className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">About Us</h3>
            <ul className="space-y-2">
              {['Our Story', 'Careers', 'Press', 'Blog'].map((item) => (
                <li key={item}>
                  <button className="text-gray-600 hover:text-gray-900">{item}</button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Customer Service</h3>
            <ul className="space-y-2">
              {['Contact Us', 'Shipping & Returns', 'FAQ', 'Size Guide'].map((item) => (
                <li key={item}>
                  <button className="text-gray-600 hover:text-gray-900">{item}</button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {['facebook', 'twitter', 'instagram', 'youtube'].map((social) => (
                <button key={social} className="text-gray-600 hover:text-gray-900">
                  <i className={`fab fa-${social} text-xl`}></i>
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Payment Methods</h3>
            <div className="flex space-x-4">
              {['cc-visa', 'cc-mastercard', 'cc-amex', 'cc-paypal'].map((payment) => (
                <i key={payment} className={`fab fa-${payment} text-2xl text-gray-600`}></i>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-600">
          <p>&copy; 2025 ShopElite. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};


export default Footer;