import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SellerLogin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [registerData, setRegisterData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    password: '',
    shopName: '',
  });
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginData.email || !loginData.password) {
      setError('Please enter both email and password');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      // Check "database" (localStorage)
      const users = JSON.parse(localStorage.getItem('inamify_users') || '[]');
      const user = users.find((u: any) => 
        u.email === loginData.email && 
        u.password === loginData.password && 
        u.type === 'seller'
      );
      
      if (user) {
        login(user);
        setIsLoading(false);
        navigate('/seller-dashboard');
      } else {
        setError('Invalid email or password');
        setIsLoading(false);
      }
    }, 1000);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!registerData.fullName || !registerData.email || !registerData.password) {
      setError('Please fill all required fields');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      // Create new seller account
      const newUser = {
        id: Date.now().toString(),
        ...registerData,
        type: 'seller'
      };
      
      // Save to "database" (localStorage)
      const users = JSON.parse(localStorage.getItem('inamify_users') || '[]');
      users.push(newUser);
      localStorage.setItem('inamify_users', JSON.stringify(users));
      
      // Log in the user
      login(newUser);
      
      setIsLoading(false);
      navigate('/seller-dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <motion.div 
          className="max-w-md w-full bg-white p-8 rounded-xl shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6">
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
              Seller Portal
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Sell your products on UrbanEdge
            </p>
          </div>
          
          <div className="flex border-b mb-6">
            <button
              className={`flex-1 py-2 text-center ${
                activeTab === 'login' 
                  ? 'text-indigo-600 border-b-2 border-indigo-600 font-medium' 
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('login')}
            >
              Login
            </button>
            <button
              className={`flex-1 py-2 text-center ${
                activeTab === 'register' 
                  ? 'text-indigo-600 border-b-2 border-indigo-600 font-medium' 
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('register')}
            >
              Register
            </button>
          </div>
          
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
          
          {activeTab === 'login' ? (
            <form onSubmit={handleLoginSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="reg-fullName" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    id="reg-fullName"
                    name="fullName"
                    type="text"
                    value={registerData.fullName}
                    onChange={handleRegisterChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="reg-mobileNumber" className="block text-sm font-medium text-gray-700">
                    Mobile Number
                  </label>
                  <input
                    id="reg-mobileNumber"
                    name="mobileNumber"
                    type="tel"
                    value={registerData.mobileNumber}
                    onChange={handleRegisterChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="reg-email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    id="reg-email"
                    name="email"
                    type="email"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="reg-password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    id="reg-password"
                    name="password"
                    type="password"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="shopName" className="block text-sm font-medium text-gray-700">
                    Shop Name
                  </label>
                  <input
                    id="shopName"
                    name="shopName"
                    type="text"
                    value={registerData.shopName}
                    onChange={handleRegisterChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SellerLogin;