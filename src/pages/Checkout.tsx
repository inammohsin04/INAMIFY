import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Checkout: React.FC = () => {
  const { currentUser } = useAuth();
  const { cartItems, removeFromCart, getCartTotal } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    pincode: '',
    mobileNumber: '',
    paymentMethod: 'cod',
  });
  
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
    // Pre-fill form data if available
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        fullName: currentUser.fullName || '',
        mobileNumber: currentUser.mobileNumber || '',
      }));
    }
  }, [currentUser, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }
    
    if (!formData.address.trim()) {
      errors.address = 'Address is required';
    }
    
    if (!formData.city.trim()) {
      errors.city = 'City is required';
    }
    
    if (!formData.pincode.trim()) {
      errors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      errors.pincode = 'Please enter a valid 6-digit pincode';
    }
    
    if (!formData.mobileNumber.trim()) {
      errors.mobileNumber = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
      errors.mobileNumber = 'Please enter a valid 10-digit mobile number';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCheckout = () => {
    if (validateForm()) {
      // Save order data
      const orderData = {
        id: `ORD${Date.now().toString().slice(-6)}`,
        customer: {
          fullName: formData.fullName,
          address: formData.address,
          city: formData.city,
          pincode: formData.pincode,
          mobileNumber: formData.mobileNumber,
        },
        items: cartItems,
        total: getCartTotal() + 50, // Add delivery charge
        paymentMethod: formData.paymentMethod,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
      
      // Save to localStorage
      const existingOrders = JSON.parse(localStorage.getItem('inamify_orders') || '[]');
      existingOrders.push(orderData);
      localStorage.setItem('inamify_orders', JSON.stringify(existingOrders));
      
      // Save order ID for confirmation page
      localStorage.setItem('inamify_last_order', JSON.stringify(orderData));
      
      // Navigate to confirmation page
      navigate('/order-confirmation');
    }
  };

  if (!currentUser) {
    return null; // Will redirect in useEffect
  }

  const cartTotal = getCartTotal();
  const deliveryCharge = 50;
  const finalTotal = cartTotal + deliveryCharge;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-20 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
          
          {cartItems.length > 0 ? (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Cart Items */}
              <div className="lg:w-2/3">
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Cart Items ({cartItems.length})</h2>
                    
                    <div className="space-y-4">
                      {cartItems.map(item => (
                        <div key={item.id} className="flex items-center border-b pb-4">
                          <div className="w-20 h-20 flex-shrink-0">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-full h-full object-cover rounded"
                            />
                          </div>
                          <div className="ml-4 flex-grow">
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-gray-500 text-sm">{item.category}</p>
                            <p className="font-bold mt-1">₹{item.price.toLocaleString()}</p>
                          </div>
                          <div className="flex items-center">
                            <div className="flex items-center border rounded mr-4">
                              <button className="px-3 py-1 text-gray-600">-</button>
                              <span className="px-3 py-1">{item.quantity || 1}</span>
                              <button className="px-3 py-1 text-gray-600">+</button>
                            </div>
                            <button 
                              className="text-red-500 hover:text-red-700"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:w-1/3">
                <div className="bg-white rounded-lg shadow p-6 sticky top-24">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>₹{cartTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery Charge</span>
                      <span>₹{deliveryCharge.toLocaleString()}</span>
                    </div>
                    <div className="border-t pt-3 mt-3">
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>₹{finalTotal.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  {!showCheckoutForm ? (
                    <button
                      className="w-full bg-indigo-600 text-white py-3 rounded-md font-medium hover:bg-indigo-700 transition"
                      onClick={() => setShowCheckoutForm(true)}
                    >
                      Proceed to Checkout
                    </button>
                  ) : (
                    <div className="mt-6 space-y-4">
                      <h3 className="font-medium">Shipping Information</h3>
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">Full Name</label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className={`w-full border ${formErrors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
                        />
                        {formErrors.fullName && (
                          <p className="text-red-500 text-xs mt-1">{formErrors.fullName}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">Address</label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className={`w-full border ${formErrors.address ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
                        />
                        {formErrors.address && (
                          <p className="text-red-500 text-xs mt-1">{formErrors.address}</p>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-700 mb-1">City</label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className={`w-full border ${formErrors.city ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
                          />
                          {formErrors.city && (
                            <p className="text-red-500 text-xs mt-1">{formErrors.city}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm text-gray-700 mb-1">Pincode</label>
                          <input
                            type="text"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleInputChange}
                            className={`w-full border ${formErrors.pincode ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
                          />
                          {formErrors.pincode && (
                            <p className="text-red-500 text-xs mt-1">{formErrors.pincode}</p>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">Mobile Number</label>
                        <input
                          type="tel"
                          name="mobileNumber"
                          value={formData.mobileNumber}
                          onChange={handleInputChange}
                          className={`w-full border ${formErrors.mobileNumber ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
                        />
                        {formErrors.mobileNumber && (
                          <p className="text-red-500 text-xs mt-1">{formErrors.mobileNumber}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">Payment Method</label>
                        <div className="bg-gray-100 p-3 rounded-md">
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="cod"
                              name="paymentMethod"
                              value="cod"
                              checked={formData.paymentMethod === 'cod'}
                              onChange={handleInputChange}
                              className="mr-2"
                            />
                            <label htmlFor="cod" className="flex-1">
                              Cash on Delivery
                              <span className="text-sm text-gray-500 block">
                                Additional ₹50 charge
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                      
                      <button
                        className="w-full bg-indigo-600 text-white py-3 rounded-md font-medium hover:bg-indigo-700 transition mt-4"
                        onClick={handleCheckout}
                      >
                        Place Order
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="mb-4 text-indigo-600 opacity-70">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-16 h-16 mx-auto"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">
                Looks like you haven't added any products to your cart yet.
              </p>
              <button
                className="bg-indigo-600 text-white px-6 py-2 rounded-md font-medium hover:bg-indigo-700 transition"
                onClick={() => navigate('/')}
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Checkout;