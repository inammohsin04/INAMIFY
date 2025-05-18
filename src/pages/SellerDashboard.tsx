import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Users, Package, BarChart2, Plus, LogOut, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface SellerProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  shopName: string;
  createdAt: string;
}

const SellerDashboard: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('products');
  const [sellerName, setSellerName] = useState('');
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [sellerProducts, setSellerProducts] = useState<SellerProduct[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // If no user, redirect to login
    if (!currentUser) {
      navigate('/seller-login');
      return;
    }

    // Check if seller name was already set
    const savedName = localStorage.getItem(`inamify_seller_name_${currentUser.id}`);
    if (savedName) {
      setSellerName(savedName);
    } else {
      setShowNamePrompt(true);
    }

    // Load seller products from localStorage
    const productsFromStorage = localStorage.getItem(`inamify_seller_products_${currentUser.id}`);
    if (productsFromStorage) {
      setSellerProducts(JSON.parse(productsFromStorage));
    }
  }, [currentUser, navigate]);

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (sellerName.trim() && currentUser) {
      localStorage.setItem(`inamify_seller_name_${currentUser.id}`, sellerName);
      setShowNamePrompt(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'customers':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Recent Customers</h3>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap" colSpan={4}>
                      <p className="text-gray-500 text-center">No customer data available yet.</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'products':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Listed Products</h3>
              <button 
                className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                onClick={() => navigate('/list-product')}
              >
                <Plus size={16} />
                <span>List a Product</span>
              </button>
            </div>
            
            {sellerProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sellerProducts.map(product => (
                  <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-medium">{product.name}</h4>
                      <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold">₹{product.price.toLocaleString()}</span>
                        <span className="text-xs text-gray-500">{new Date(product.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <div className="mb-4 text-indigo-600">
                  <ShoppingBag size={48} className="mx-auto" />
                </div>
                <h4 className="text-xl font-medium mb-2">No Products Listed Yet</h4>
                <p className="text-gray-600 mb-6">
                  Start selling by listing your first product.
                </p>
                <button 
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
                  onClick={() => navigate('/list-product')}
                >
                  List a Product
                </button>
              </div>
            )}
          </div>
        );
      case 'add-product':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">List a New Product</h3>
            <p className="text-gray-600">
              Click the button below to list a new product for sale.
            </p>
            <button 
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
              onClick={() => navigate('/list-product')}
            >
              <Plus size={16} />
              <span>List a Product</span>
            </button>
          </div>
        );
      case 'analytics':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Analytics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg shadow p-6">
                <h4 className="text-gray-500 text-sm mb-2">Total Sales</h4>
                <p className="text-3xl font-bold">₹0</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h4 className="text-gray-500 text-sm mb-2">Products</h4>
                <p className="text-3xl font-bold">{sellerProducts.length}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h4 className="text-gray-500 text-sm mb-2">Orders</h4>
                <p className="text-3xl font-bold">0</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h4 className="text-lg font-medium mb-4">Sales Overview</h4>
              <div className="flex h-64 items-end justify-between">
                <div className="w-1/12 h-0 bg-indigo-600 rounded-t"></div>
                <div className="w-1/12 h-0 bg-indigo-600 rounded-t"></div>
                <div className="w-1/12 h-0 bg-indigo-600 rounded-t"></div>
                <div className="w-1/12 h-0 bg-indigo-600 rounded-t"></div>
                <div className="w-1/12 h-0 bg-indigo-600 rounded-t"></div>
                <div className="w-1/12 h-0 bg-indigo-600 rounded-t"></div>
                <div className="w-1/12 h-0 bg-indigo-600 rounded-t"></div>
                <div className="w-1/12 h-0 bg-indigo-600 rounded-t"></div>
                <div className="w-1/12 h-0 bg-indigo-600 rounded-t"></div>
                <div className="w-1/12 h-0 bg-indigo-600 rounded-t"></div>
                <div className="w-1/12 h-0 bg-indigo-600 rounded-t"></div>
                <div className="w-1/12 h-0 bg-indigo-600 rounded-t"></div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
                <span>Aug</span>
                <span>Sep</span>
                <span>Oct</span>
                <span>Nov</span>
                <span>Dec</span>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (!currentUser) {
    return null; // Will redirect in useEffect
  }

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
              <h2 className="text-2xl font-bold mb-4">Welcome, Seller!</h2>
              <p className="mb-4">Please enter your name to continue:</p>
              <form onSubmit={handleNameSubmit}>
                <input
                  type="text"
                  value={sellerName}
                  onChange={(e) => setSellerName(e.target.value)}
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
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {sellerName || currentUser.fullName}
                  </h2>
                  <p className="text-gray-600 mt-2">
                    {currentUser.shopName ? currentUser.shopName : 'Your Shop'}
                  </p>
                </div>
                
                <div className="bg-white rounded-lg shadow">
                  <button
                    className={`w-full text-left px-6 py-3 flex items-center gap-3 ${activeTab === 'customers' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-700'}`}
                    onClick={() => setActiveTab('customers')}
                  >
                    <Users size={20} />
                    <span>Recent Customers</span>
                  </button>
                  <button
                    className={`w-full text-left px-6 py-3 flex items-center gap-3 ${activeTab === 'products' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-700'}`}
                    onClick={() => setActiveTab('products')}
                  >
                    <Package size={20} />
                    <span>Listed Products</span>
                  </button>
                  <button
                    className={`w-full text-left px-6 py-3 flex items-center gap-3 ${activeTab === 'add-product' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-700'}`}
                    onClick={() => setActiveTab('add-product')}
                  >
                    <Plus size={20} />
                    <span>List a Product</span>
                  </button>
                  <button
                    className={`w-full text-left px-6 py-3 flex items-center gap-3 ${activeTab === 'analytics' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-700'}`}
                    onClick={() => setActiveTab('analytics')}
                  >
                    <BarChart2 size={20} />
                    <span>Analytics</span>
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

export default SellerDashboard;