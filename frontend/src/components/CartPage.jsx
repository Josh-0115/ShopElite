import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';
import Header from './Header';
import Footer from './Footer';
import BPImg from '/images/suggestion/BluetoothSpeaker.jpg';
import TMImg from '/images/suggestion/TravelMug.jpg';
import PCImg from '/images/suggestion/PhoneCase.jpg';
import WCImg from '/images/suggestion/WirelessCharger.jpg';

const CartPage = () => {
    const { cartItems, increaseQuantity, decreaseQuantity, removeItem, handleAddToCart } = useContext(CartContext);
    const [discountCode, setDiscountCode] = useState("");
    const [discount, setDiscount] = useState(0);

    const handleApplyDiscount = () => {
        if (discountCode.toLowerCase() === "save10") {
            setDiscount(0.1);
        } else if (discountCode.toLowerCase() === "welcome20") {
            setDiscount(0.2);
        } else {
            setDiscount(0);
        }
    };

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal > 500 ? 0 : 29.99;
    const discountAmount = subtotal * discount;
    const total = subtotal + shipping - discountAmount;

    // Dummy product data for the "You might also like" section
    const recommendedProducts = [
        {
            _id: 1001,
            name: "Bluetooth Speaker",
            price: 89.99,
            gender: 'electronics',
            image: BPImg
        },
        {
            _id: 1002,
            name: "Travel Mug",
            price: 129.99,
            gender: 'electronics',
            image: TMImg
        },
        {
            _id: 1003,
            name: "Phone Case",
            price: 349.99,
            gender: 'electronics',
            image: PCImg
        },
        {
            _id: 1004,
            name: "Wireless Charger",
            price: 59.99,
            gender: 'electronics',
            image: WCImg
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="pt-20 pb-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
                        <Link to="/home" className="hover:text-gray-700 cursor-pointer">Home</Link>
                        <i className="fas fa-chevron-right text-xs"></i>
                        <span className="text-gray-900">Shopping Cart</span>
                    </div>
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Your Shopping Cart ({cartItems.length} items)</h1>
                        <Link to="/home" className="text-blue-600 hover:text-blue-700 font-medium !rounded-button whitespace-nowrap cursor-pointer">
                            <i className="fas fa-arrow-left mr-2"></i>Continue Shopping
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-lg shadow-sm">
                                {cartItems.map((item, index) => (
                                    <div key={`${item.id}-${item.gender}`}>
                                        <div className="p-6 flex items-center space-x-4">
                                            <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-lg font-medium text-gray-900 mb-1">{item.name}</h3>
                                                <p className="text-sm text-gray-500">In Stock</p>
                                                <p className="text-lg font-semibold text-gray-900 mt-2">${item.price.toFixed(2)}</p>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <button onClick={() => decreaseQuantity(item.id, item.gender)} className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 !rounded-button whitespace-nowrap cursor-pointer">
                                                    <i className="fas fa-minus text-xs"></i>
                                                </button>
                                                <span className="w-12 text-center font-medium">{item.quantity}</span>
                                                <button onClick={() => increaseQuantity(item.id, item.gender)} className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 !rounded-button whitespace-nowrap cursor-pointer">
                                                    <i className="fas fa-plus text-xs"></i>
                                                </button>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                                                <button onClick={() => removeItem(item.id, item.gender)} className="text-red-500 hover:text-red-700 text-sm mt-2 !rounded-button whitespace-nowrap cursor-pointer">
                                                    <i className="fas fa-trash mr-1"></i>Remove
                                                </button>
                                            </div>
                                        </div>
                                        {index < cartItems.length - 1 && <hr className="border-gray-200" />}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Discount Code</label>
                                    <div className="flex space-x-2">
                                        <input type="text" placeholder="Enter code" value={discountCode} onChange={e => setDiscountCode(e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm" />
                                        <button onClick={handleApplyDiscount} className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 text-sm font-medium !rounded-button whitespace-nowrap cursor-pointer">Apply</button>
                                    </div>
                                </div>
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Shipping</span>
                                        <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                                    </div>
                                    {discount > 0 && (
                                        <div className="flex justify-between text-green-600">
                                            <span>Discount ({(discount * 100).toFixed(0)}%)</span>
                                            <span>-${discountAmount.toFixed(2)}</span>
                                        </div>
                                    )}
                                    <hr className="border-gray-200" />
                                    <div className="flex justify-between text-xl font-semibold text-gray-900">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>
                                <Link to="/checkout" className="block w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-4 text-center !rounded-button whitespace-nowrap cursor-pointer">
                                    Proceed to Checkout
                                </Link>
                                <div className="text-center">
                                    <p className="text-sm text-gray-500 mb-3">We accept</p>
                                    <div className="flex justify-center space-x-3">
                                        <i className="fab fa-cc-visa text-2xl text-gray-400"></i>
                                        <i className="fab fa-cc-mastercard text-2xl text-gray-400"></i>
                                        <i className="fab fa-cc-amex text-2xl text-gray-400"></i>
                                        <i className="fab fa-cc-paypal text-2xl text-gray-400"></i>
                                    </div>
                                </div>
                                <div className="mt-6 p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <i className="fas fa-lock mr-2 text-green-500"></i>
                                        <span>Secure checkout with SSL encryption</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-16">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8">You might also like</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {recommendedProducts.map(product => (
                                <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                                    <div className="aspect-w-1 aspect-h-1">
                                        <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">{product.name}</h3>
                                        <p className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
                                        <button onClick={() => handleAddToCart(product)} className="w-full mt-3 bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition-colors !rounded-button whitespace-nowrap cursor-pointer">Add to Cart</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default CartPage;