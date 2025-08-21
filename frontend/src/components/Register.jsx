import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';
import Header from './Header';
import Footer from './Footer';

const Register = () => {
  const { setUser } = useContext(CartContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://shopelite-pcva.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        localStorage.setItem('token', data.token);
        navigate('/account');
      } else {
        setError(data.message || 'Failed to register');
      }
    } catch (err) {
      console.error('Register error:', err);
      setError('Network error, please try again');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartCount={useContext(CartContext).cartCount} />
      <main className="max-w-md mx-auto px-4 py-8 pt-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Register</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Register
            </button>
          </form>
          <p className="text-sm text-gray-600 mt-4">
            Already have an account?{' '}
            <a href="/signin" className="text-blue-600 hover:text-blue-700">Sign In</a>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;