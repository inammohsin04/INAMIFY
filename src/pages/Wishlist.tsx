import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Wishlist: React.FC = () => {
  const { currentUser } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  // Mock wishlist items
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 'w1',
      name: 'Smart LED TV 43"',
      category: 'Electronics',
      price: 32999,
      image: 'https://images.pexels.com/photos/5721868/pexels-photo-5721868.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 'w2',
      name: 'Men\'s Formal Shirt',
      category: 'Clothes',
      price: 1499,
      image: 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    }
  ]);

  const handleRemoveFromWishlist = (id: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
  };

  const handleAddToCart = (item: any) => {
    addToCart(item);
    // Optionally, remove from wishlist
    // handleRemoveFromWishlist(item.id);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-20 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>
          
          {wishlistItems.length > 0 ? (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <div className="space-y-6">
                  {wishlistItems.map(item => (
                    <div key={item.id} className="flex flex-col sm:flex-row sm:items-center border-b pb-6">
                      <div className="sm:w-20 sm:h-20">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div className="sm:ml-4 flex-grow mt-4 sm:mt-0">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-gray-500 text-sm">{item.category}</p>
                        <p className="font-bold mt-1">₹{item.price.toLocaleString()}</p>
                      </div>
                      <div className="flex space-x-2 mt-4 sm:mt-0">
                        <button 
                          className="flex items-center bg-indigo-600 text-white px-3 py-2 rounded hover:bg-indigo-700 transition"
                          onClick={() => handleAddToCart(item)}
                        >
                          <ShoppingCart size={16} className="mr-2" />
                          <span>Add to Cart</span>
                        </button>
                        <button 
                          className="flex items-center bg-white border border-red-500 text-red-500 px-3 py-2 rounded hover:bg-red-50 transition"
                          onClick={() => handleRemoveFromWishlist(item.id)}
                        >
                          <Trash2 size={16} className="mr-2" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  ))}
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
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
              <p className="text-gray-600 mb-6">
                Looks like you haven't added any products to your wishlist yet.
              </p>
              <button
                className="bg-indigo-600 text-white px-6 py-2 rounded-md font-medium hover:bg-indigo-700 transition"
                onClick={() => navigate('/')}
              >
                Browse Products
              </button>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Wishlist;