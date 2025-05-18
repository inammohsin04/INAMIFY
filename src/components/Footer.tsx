import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ShoppingBag } from 'lucide-react';

const Footer: React.FC = () => {
  const redirectToCustomerLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = '/login';
  };

  const redirectToEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = 'mailto:inammohsin04@gmail.com';
  };

  const redirectToTrackOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open('/track-order', '_blank');
  };

  return (
    <footer className="bg-gray-800 text-white pt-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-8">
          <ShoppingBag size={32} className="text-indigo-400 mr-2" />
          <span className="text-3xl font-bold">InAmify</span>
        </div>
        
        <p className="text-center text-gray-300 max-w-2xl mx-auto mb-12">
          Your one-stop destination for electronics, clothing, home goods and more. Shop with confidence and enjoy seamless shopping experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Shop By Category */}
          <div>
            <h3 className="text-xl font-bold mb-4">Shop By Category</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" onClick={redirectToCustomerLogin} className="text-gray-300 hover:text-white transition duration-300">
                  Electronics
                </a>
              </li>
              <li>
                <a href="#" onClick={redirectToCustomerLogin} className="text-gray-300 hover:text-white transition duration-300">
                  Clothes
                </a>
              </li>
              <li>
                <a href="#" onClick={redirectToCustomerLogin} className="text-gray-300 hover:text-white transition duration-300">
                  Homeware
                </a>
              </li>
              <li>
                <a href="#" onClick={redirectToCustomerLogin} className="text-gray-300 hover:text-white transition duration-300">
                  Kitchenware
                </a>
              </li>
              <li>
                <a href="#" onClick={redirectToCustomerLogin} className="text-gray-300 hover:text-white transition duration-300">
                  Mobile Phones
                </a>
              </li>
              <li>
                <a href="#" onClick={redirectToCustomerLogin} className="text-gray-300 hover:text-white transition duration-300">
                  Supplements
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: More Categories */}
          <div>
            <h3 className="text-xl font-bold mb-4">More Categories</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" onClick={redirectToCustomerLogin} className="text-gray-300 hover:text-white transition duration-300">
                  Electronics
                </a>
              </li>
              <li>
                <a href="#" onClick={redirectToCustomerLogin} className="text-gray-300 hover:text-white transition duration-300">
                  Clothes
                </a>
              </li>
              <li>
                <a href="#" onClick={redirectToCustomerLogin} className="text-gray-300 hover:text-white transition duration-300">
                  Homeware
                </a>
              </li>
              <li>
                <a href="#" onClick={redirectToCustomerLogin} className="text-gray-300 hover:text-white transition duration-300">
                  Kitchenware
                </a>
              </li>
              <li>
                <a href="#" onClick={redirectToCustomerLogin} className="text-gray-300 hover:text-white transition duration-300">
                  Mobile Phones
                </a>
              </li>
              <li>
                <a href="#" onClick={redirectToCustomerLogin} className="text-gray-300 hover:text-white transition duration-300">
                  Supplements
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Service */}
          <div>
            <h3 className="text-xl font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" onClick={redirectToEmail} className="text-gray-300 hover:text-white transition duration-300">
                  Customer Service
                </a>
              </li>
              <li>
                <a href="#" onClick={redirectToTrackOrder} className="text-gray-300 hover:text-white transition duration-300">
                  Track Your Order
                </a>
              </li>
              <li>
                <Link to="/signup" className="text-gray-300 hover:text-white transition duration-300">
                  My Account
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-gray-300 hover:text-white transition duration-300">
                  Wishlist
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition duration-300">
                  Return Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition duration-300">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 mt-1 text-indigo-400" />
                <span className="text-gray-300">New Delhi, Delhi, India - 110025</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 text-indigo-400" />
                <span className="text-gray-300">+91 7290069254</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 text-indigo-400" />
                <a href="mailto:inammohsin04@gmail.com" className="text-gray-300 hover:text-white transition duration-300">
                  inammohsin04@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer Section */}
        <div className="border-t border-gray-700 pt-6 pb-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; 2025 InAmify. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition duration-300">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition duration-300">
                Refund Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;