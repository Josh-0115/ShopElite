import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from './CartContext';
import Header from './Header';
import Footer from './Footer';

const Account = () => {
  const { user, cartCount } = useContext(CartContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('https://shopelite-pcva.onrender.com/api/orders', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const data = await response.json();
        if (response.ok) {
          setOrders(data);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError('Failed to fetch orders');
      }
      setLoading(false);
    };
    fetchOrders();
  }, []);

  if (!user) return <div className="text-center py-16">Please sign in to view your account.</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartCount={cartCount} />
      <main className="max-w-7xl mx-auto px-4 py-8 pt-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">My Account</h2>
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Details</h3>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button
            onClick={() => {
              localStorage.removeItem('token');
              useContext(CartContext).setUser(null);
            }}
            className="mt-4 text-red-500 hover:text-red-700 font-medium"
          >
            Sign Out
          </button>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Order History</h3>
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {orders.length === 0 && !loading && <p>No orders found.</p>}
          {orders.map(order => (
            <div key={order._id} className="border-b border-gray-200 py-4">
              <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
              <p><strong>Total:</strong> ${order.totalAmount.toFixed(2)}</p>
              <div className="mt-2">
                {order.items && order.items.map((item) => (
                  item?.product ? (
                    <div key={item._id || Math.random()} className="flex items-center space-x-4">
                      <img
                        src={item.product.image || "/images/placeholder.png"}
                        alt={item.product.name || "Unnamed product"}
                        className="w-16 h-16 object-cover"
                      />
                      <div>
                        <p>{item.product.name || "Unnamed product"}</p>
                        <p>
                          Qty: {item.quantity || 0} @ $
                          {item.price ? item.price.toFixed(2) : "0.00"}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div key={item._id || Math.random()} className="text-gray-500 italic">
                      Invalid item data
                    </div>
                  )
                ))}

              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Account;