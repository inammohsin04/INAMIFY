import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-indigo-600">INAMIFY</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {currentUser ? (
              <>
                <span className="text-gray-700">
                  Welcome, {currentUser.fullName}
                </span>
                <Link 
                  to={currentUser.type === 'customer' ? '/customer-dashboard' : '/seller-dashboard'} 
                  className="text-gray-700 hover:text-indigo-600"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-gray-700 hover:text-indigo-600"
                >
                  <LogOut size={18} className="mr-1" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-indigo-600">Login</Link>
                <Link to="/signup" className="text-gray-700 hover:text-indigo-600">Sign Up</Link>
              </>
            )}
            
            {currentUser?.type === 'customer' && (
              <>
                <Link to="/wishlist" className="relative text-gray-700 hover:text-indigo-600">
                  <Heart size={20} />
                </Link>
                <Link to="/checkout" className="relative text-gray-700 hover:text-indigo-600">
                  <ShoppingCart size={20} />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-indigo-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  )}
                </Link>
              </>
            )}
          </div>

          {/* Mobile Navigation Toggle */}
          <button 
            className="md:hidden text-gray-700"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3">
            {currentUser ? (
              <>
                <div className="px-4 py-2 text-gray-700">
                  Welcome, {currentUser.fullName}
                </div>
                <Link 
                  to={currentUser.type === 'customer' ? '/customer-dashboard' : '/seller-dashboard'} 
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={toggleMenu}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="flex items-center w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                >
                  <LogOut size={18} className="mr-2" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={toggleMenu}
                >
                  Sign Up
                </Link>
              </>
            )}
            
            {currentUser?.type === 'customer' && (
              <>
                <Link 
                  to="/wishlist" 
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={toggleMenu}
                >
                  <Heart size={18} className="mr-2" />
                  <span>Wishlist</span>
                </Link>
                <Link 
                  to="/checkout" 
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={toggleMenu}
                >
                  <ShoppingCart size={18} className="mr-2" />
                  <span>Cart ({cartItems.length})</span>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;