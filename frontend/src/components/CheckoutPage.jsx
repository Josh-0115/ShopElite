import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';
import Header from './Header';
import Footer from './Footer';

const CheckoutPage = () => {
  const { cartItems, clearCart, user } = useContext(CartContext);
  const navigate = useNavigate();
  const [billingInfo, setBillingInfo] = useState({
    fullName: '', streetAddress: '', apartment: '', city: '', state: '', zipCode: '', country: 'United States', phone: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value });
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handlePlaceOrder = async () => {
    if (!user) {
      setError('Please sign in to place an order');
      return;
    }
    try {
      const response = await fetch('https://shopelite-pcva.onrender.com/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          items: cartItems.map(item => ({
            product: item._id || item.id,
            quantity: item.quantity,
            price: item.price,
          })),
          totalAmount: totalAmount,
        }),
      });
      if (response.ok) {
        setOrderPlaced(true);
        clearCart();
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to place order');
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = cartItems.length === 0 ? 0 : subtotal > 500 ? 0 : 29.99;
  const totalAmount = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} />
      <main className="max-w-7xl mx-auto px-4 py-8 pt-20">
        {orderPlaced ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <div className="relative w-16 h-16 mb-4">
              <svg
                className="w-full h-full text-green-500 animate-pulse"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Order placed successfully</h2>
            <Link
              to="/home"
              className="text-blue-600 hover:text-blue-700 font-medium !rounded-button whitespace-nowrap cursor-pointer"
            >
              Browse more
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              {error && <p className="text-red-500">{error}</p>}
              {!user && (
                <p className="text-gray-600">
                  Please <Link to="/signin" className="text-blue-600 hover:text-blue-700">sign in</Link> to place an order.
                </p>
              )}
              <section className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Billing Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={billingInfo.fullName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Street Address *</label>
                    <input
                      type="text"
                      name="streetAddress"
                      value={billingInfo.streetAddress}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Apartment/Suite (Optional)</label>
                    <input
                      type="text"
                      name="apartment"
                      value={billingInfo.apartment}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={billingInfo.city}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State/Province *</label>
                    <input
                      type="text"
                      name="state"
                      value={billingInfo.state}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ZIP/Postal Code *</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={billingInfo.zipCode}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Country/Region *</label>
                    <select
                      name="country"
                      value={billingInfo.country}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
                      required
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="India">India</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={billingInfo.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
                      required
                    />
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Method</h2>
                <div className="space-y-4 mb-6">
                  <div
                    onClick={() => handlePaymentMethodChange('credit-card')}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${paymentMethod === 'credit-card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          checked={paymentMethod === 'credit-card'}
                          onChange={() => handlePaymentMethodChange('credit-card')}
                          className="mr-3"
                        />
                        <span className="font-medium text-gray-900">Credit/Debit Card</span>
                      </div>
                    </div>
                  </div>
                  <div
                    onClick={() => handlePaymentMethodChange('paypal')}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${paymentMethod === 'paypal' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          checked={paymentMethod === 'paypal'}
                          onChange={() => handlePaymentMethodChange('paypal')}
                          className="mr-3"
                        />
                        <span className="font-medium text-gray-900">PayPal</span>
                      </div>
                    </div>
                  </div>
                  <div
                    onClick={() => handlePaymentMethodChange('apple-pay')}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${paymentMethod === 'apple-pay' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          checked={paymentMethod === 'apple-pay'}
                          onChange={() => handlePaymentMethodChange('apple-pay')}
                          className="mr-3"
                        />
                        <span className="font-medium text-gray-900">Apple Pay / Google Pay</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>
                  <Link
                    to="/cart"
                    className="text-blue-600 hover:text-blue-700 font-medium !rounded-button whitespace-nowrap cursor-pointer"
                  >
                    <i className="fas fa-arrow-left mr-2"></i>Back to Cart
                  </Link>
                </div>
                <div className="space-y-4 mb-6">
                  {cartItems.length === 0 ? (
                    <p className="text-gray-500">Your cart is empty.</p>
                  ) : (
                    cartItems.map(item => (
                      <div key={item._id} className="flex items-center space-x-4">
                        <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                          <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                        </div>
                        <p className="text-sm font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))
                  )}
                </div>
                <div className="space-y-3 border-t pt-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {cartItems.length > 0 && (
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-semibold text-gray-900">
                    <span>Total</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  onClick={handlePlaceOrder}
                  className="mt-6 w-full py-3 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  Place Order - ${totalAmount.toFixed(2)}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;