import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingBag, Heart, Package, Ticket, Home, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const CustomerDashboard: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('home');
  const [customerName, setCustomerName] = useState('');
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // If no user, redirect to login
    if (!currentUser) {
      navigate('/login');
      return;
    }

    // Check if customer name was already set
    const savedName = localStorage.getItem(`inamify_customer_name_${currentUser.id}`);
    if (savedName) {
      setCustomerName(savedName);
    } else {
      setShowNamePrompt(true);
    }
  }, [currentUser, navigate]);

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customerName.trim() && currentUser) {
      localStorage.setItem(`inamify_customer_name_${currentUser.id}`, customerName);
      setShowNamePrompt(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Simulate some orders for display
  const orders = [
    { id: 'ORD00123', date: '2025-05-01', status: 'Delivered', items: 2, total: 3698 },
    { id: 'ORD00124', date: '2025-05-05', status: 'Processing', items: 1, total: 1499 },
  ];

  if (!currentUser) {
    return null; // Will redirect in useEffect
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Available Products</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products.slice(0, 6).map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        );
      case 'wishlist':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">My Wishlist</h3>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-500 text-center py-8">No items in your wishlist yet.</p>
            </div>
          </div>
        );
      case 'orders':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Order Tracking</h3>
            {orders.length > 0 ? (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Items
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                          {order.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            order.status === 'Delivered' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.items}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ₹{order.total.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-500 text-center py-8">No orders found.</p>
              </div>
            )}
          </div>
        );
      case 'coupons':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Discount Coupons</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg shadow p-6 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-semibold">NEW USER</p>
                    <h4 className="text-2xl font-bold mt-1">WELCOME20</h4>
                    <p className="mt-4 text-sm opacity-90">20% off on your first order</p>
                  </div>
                  <div className="text-xl font-bold">20%</div>
                </div>
                <div className="mt-4 pt-4 border-t border-white border-opacity-20 flex justify-between">
                  <p className="text-xs opacity-90">Valid until: 31/12/2025</p>
                  <button className="text-xs font-semibold">Copy Code</button>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg shadow p-6 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-semibold">EXCLUSIVE</p>
                    <h4 className="text-2xl font-bold mt-1">SUMMER25</h4>
                    <p className="mt-4 text-sm opacity-90">25% off on summer collection</p>
                  </div>
                  <div className="text-xl font-bold">25%</div>
                </div>
                <div className="mt-4 pt-4 border-t border-white border-opacity-20 flex justify-between">
                  <p className="text-xs opacity-90">Valid until: 30/06/2025</p>
                  <button className="text-xs font-semibold">Copy Code</button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'sell':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Sell a Product</h3>
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <h4 className="text-lg font-medium mb-4">Become a Seller on InAmify</h4>
              <p className="text-gray-600 mb-6">
                Want to list your products and start selling? Join our seller community!
              </p>
              <button 
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
                onClick={() => navigate('/seller-login')}
              >
                Go to Seller Login
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-20 bg-gray-50">
        {showNamePrompt ? (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div 
              className="bg-white rounded-lg p-8 max-w-md w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <h2 className="text-2xl font-bold mb-4">Welcome!</h2>
              <p className="mb-4">Please enter your name to continue:</p>
              <form onSubmit={handleNameSubmit}>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2 mb-4"
                  placeholder="Your name"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
                >
                  Continue
                </button>
              </form>
            </motion.div>
          </div>
        ) : (
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Sidebar */}
              <div className="md:w-1/4 space-y-4">
                <div className="bg-white rounded-lg shadow p-6 text-center">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Welcome, {customerName || currentUser.fullName}
                  </h2>
                  <p className="text-gray-600 mt-2">{currentUser.email}</p>
                </div>
                
                <div className="bg-white rounded-lg shadow">
                  <button
                    className={`w-full text-left px-6 py-3 flex items-center gap-3 ${activeTab === 'home' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-700'}`}
                    onClick={() => setActiveTab('home')}
                  >
                    <Home size={20} />
                    <span>Home</span>
                  </button>
                  <button
                    className={`w-full text-left px-6 py-3 flex items-center gap-3 ${activeTab === 'wishlist' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-700'}`}
                    onClick={() => setActiveTab('wishlist')}
                  >
                    <Heart size={20} />
                    <span>Wishlist</span>
                  </button>
                  <button
                    className={`w-full text-left px-6 py-3 flex items-center gap-3 ${activeTab === 'orders' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-700'}`}
                    onClick={() => setActiveTab('orders')}
                  >
                    <Package size={20} />
                    <span>Order Tracking</span>
                  </button>
                  <button
                    className={`w-full text-left px-6 py-3 flex items-center gap-3 ${activeTab === 'coupons' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-700'}`}
                    onClick={() => setActiveTab('coupons')}
                  >
                    <Ticket size={20} />
                    <span>Discount Coupons</span>
                  </button>
                  <button
                    className={`w-full text-left px-6 py-3 flex items-center gap-3 ${activeTab === 'sell' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-700'}`}
                    onClick={() => setActiveTab('sell')}
                  >
                    <ShoppingBag size={20} />
                    <span>Sell a Product</span>
                  </button>
                  
                  <button
                    className="w-full text-left px-6 py-3 flex items-center gap-3 text-red-600 hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
              
              {/* Main Content */}
              <div className="md:w-3/4">
                <div className="bg-white rounded-lg shadow p-6">
                  {renderTabContent()}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default CustomerDashboard;