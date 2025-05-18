import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const OrderConfirmation: React.FC = () => {
  const [order, setOrder] = useState<any>(null);
  const { clearCart } = useCart();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Get order details
    const orderData = localStorage.getItem('inamify_last_order');
    if (orderData) {
      setOrder(JSON.parse(orderData));
      // Clear cart
      clearCart();
    } else {
      navigate('/');
    }
  }, [clearCart, navigate]);

  if (!order) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-20 bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <motion.div 
            className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-indigo-600 text-white p-6 text-center">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              >
                <CheckCircle size={64} className="mx-auto mb-4" />
              </motion.div>
              <h2 className="text-2xl font-bold">Order Placed Successfully!</h2>
              <p className="mt-2">Your order has been confirmed and will be shipped soon.</p>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Order Information</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Order ID</p>
                      <p className="font-medium">{order.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Order Date</p>
                      <p className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Payment Method</p>
                      <p className="font-medium">Cash on Delivery</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Order Status</p>
                      <p className="font-medium">Processing</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="font-medium">{order.customer.fullName}</p>
                  <p>{order.customer.address}</p>
                  <p>{order.customer.city}, {order.customer.pincode}</p>
                  <p>Mobile: {order.customer.mobileNumber}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
                <div className="border rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {order.items.map((item: any) => (
                        <tr key={item.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <img 
                                  src={item.image} 
                                  alt={item.name} 
                                  className="h-10 w-10 object-cover rounded"
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{item.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.quantity || 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                            ₹{item.price.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50">
                      <tr>
                        <td colSpan={2} className="px-6 py-3 text-right text-sm font-medium text-gray-500">
                          Subtotal
                        </td>
                        <td className="px-6 py-3 text-right text-sm font-medium text-gray-900">
                          ₹{(order.total - 50).toLocaleString()}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2} className="px-6 py-3 text-right text-sm font-medium text-gray-500">
                          Delivery Charge
                        </td>
                        <td className="px-6 py-3 text-right text-sm font-medium text-gray-900">
                          ₹50
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2} className="px-6 py-3 text-right text-sm font-bold text-gray-900">
                          Total
                        </td>
                        <td className="px-6 py-3 text-right text-sm font-bold text-gray-900">
                          ₹{order.total.toLocaleString()}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
              
              <div className="flex gap-4">
                <button
                  className="flex-1 bg-indigo-600 text-white py-2 rounded-md font-medium hover:bg-indigo-700 transition"
                  onClick={() => navigate('/customer-dashboard')}
                >
                  Go to Dashboard
                </button>
                <button
                  className="flex-1 bg-white border border-gray-300 py-2 rounded-md font-medium hover:bg-gray-50 transition"
                  onClick={() => navigate('/')}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default OrderConfirmation;