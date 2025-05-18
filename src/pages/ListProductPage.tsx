import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ListProductPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [category, setCategory] = useState('');
  const [shopName, setShopName] = useState('');
  const [productName, setProductName] = useState('');
  const [productImage, setProductImage] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [successAnimation, setSuccessAnimation] = useState(false);
  
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser || currentUser.type !== 'seller') {
      navigate('/seller-login');
    }
    
    // Pre-fill shop name if available
    if (currentUser?.shopName) {
      setShopName(currentUser.shopName);
    }
  }, [currentUser, navigate]);

  const categoryOptions = [
    { value: 'electronics', label: 'Electronics' },
    { value: 'clothes', label: 'Clothes' },
    { value: 'homeware', label: 'Homeware' },
    { value: 'kitchenware', label: 'Kitchenware' },
    { value: 'mobilePhones', label: 'Mobile Phones' },
    { value: 'supplements', label: 'Supplements' },
  ];

  const demoImages = {
    electronics: 'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    clothes: 'https://images.pexels.com/photos/914668/pexels-photo-914668.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    homeware: 'https://images.pexels.com/photos/4439901/pexels-photo-4439901.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    kitchenware: 'https://images.pexels.com/photos/6996085/pexels-photo-6996085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    mobilePhones: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    supplements: 'https://images.pexels.com/photos/4047040/pexels-photo-4047040.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  };

  const handleCategorySelect = (selectedCategory: string) => {
    setCategory(selectedCategory);
    setProductImage(demoImages[selectedCategory as keyof typeof demoImages]);
    setCurrentStep(2);
  };

  const handleShopNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (shopName.trim()) {
      setCurrentStep(3);
    }
  };

  const handleImageUpload = () => {
    // In a real app, this would handle file uploads
    // For this demo, we're using predefined images
    setCurrentStep(4);
  };

  const handlePriceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (productPrice && !isNaN(parseFloat(productPrice))) {
      saveProduct();
    }
  };

  const saveProduct = () => {
    if (!currentUser) return;
    
    // Create product object
    const newProduct = {
      id: Date.now().toString(),
      name: productName || `${category.charAt(0).toUpperCase() + category.slice(1)} Product`,
      category,
      price: parseFloat(productPrice),
      image: productImage,
      shopName,
      sellerId: currentUser.id,
      createdAt: new Date().toISOString()
    };
    
    // Save to localStorage
    const existingProducts = JSON.parse(localStorage.getItem(`inamify_seller_products_${currentUser.id}`) || '[]');
    existingProducts.push(newProduct);
    localStorage.setItem(`inamify_seller_products_${currentUser.id}`, JSON.stringify(existingProducts));
    
    // Show success animation
    setSuccessAnimation(true);
    
    // Redirect after delay
    setTimeout(() => {
      navigate('/seller-dashboard');
    }, 2500);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h3 className="text-xl font-semibold mb-6">Select Product Category</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {categoryOptions.map((option) => (
                <button
                  key={option.value}
                  className="bg-white p-4 rounded-lg border border-gray-200 hover:border-indigo-500 hover:shadow-md transition"
                  onClick={() => handleCategorySelect(option.value)}
                >
                  <div className="h-32 flex items-center justify-center mb-2">
                    <img 
                      src={demoImages[option.value as keyof typeof demoImages]} 
                      alt={option.label} 
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <p className="text-center font-medium">{option.label}</p>
                </button>
              ))}
            </div>
          </motion.div>
        );
      
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h3 className="text-xl font-semibold mb-6">Enter Shop Name</h3>
            <form onSubmit={handleShopNameSubmit} className="space-y-4">
              <div>
                <label htmlFor="shopName" className="block text-sm font-medium text-gray-700 mb-1">
                  Shop Name
                </label>
                <input
                  type="text"
                  id="shopName"
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="Enter your shop name"
                  required
                />
              </div>
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
                >
                  Continue
                </button>
              </div>
            </form>
          </motion.div>
        );
      
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <h3 className="text-xl font-semibold mb-6">Upload Product Image</h3>
            <div className="mb-8">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4">
                <div className="h-48 flex items-center justify-center">
                  {productImage ? (
                    <img 
                      src={productImage} 
                      alt="Product preview" 
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <Upload size={48} className="text-gray-400" />
                  )}
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1 text-left">
                  Product Name (Optional)
                </label>
                <input
                  type="text"
                  id="productName"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="Enter product name"
                />
              </div>
              <button
                onClick={handleImageUpload}
                className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
              >
                Continue
              </button>
            </div>
          </motion.div>
        );
      
      case 4:
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h3 className="text-xl font-semibold mb-6">Set Product Price</h3>
            <form onSubmit={handlePriceSubmit} className="space-y-4">
              <div>
                <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700 mb-1">
                  Price (₹)
                </label>
                <input
                  type="number"
                  id="productPrice"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="Enter price in INR"
                  min="1"
                  required
                />
              </div>
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
                >
                  List Product
                </button>
              </div>
            </form>
          </motion.div>
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
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            {!successAnimation ? (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center mb-6">
                  {currentStep > 1 && (
                    <button
                      className="mr-4 text-gray-600 hover:text-gray-800"
                      onClick={() => setCurrentStep(currentStep - 1)}
                    >
                      <ArrowLeft size={20} />
                    </button>
                  )}
                  <h2 className="text-2xl font-bold">List a Product</h2>
                </div>
                
                {/* Step indicator */}
                <div className="mb-8">
                  <div className="flex items-center">
                    {[1, 2, 3, 4].map(step => (
                      <React.Fragment key={step}>
                        <div 
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            currentStep >= step ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
                          }`}
                        >
                          {step}
                        </div>
                        {step < 4 && (
                          <div 
                            className={`flex-1 h-1 mx-2 ${
                              currentStep > step ? 'bg-indigo-600' : 'bg-gray-200'
                            }`}
                          ></div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span>Category</span>
                    <span>Shop</span>
                    <span>Image</span>
                    <span>Price</span>
                  </div>
                </div>
                
                {renderStepContent()}
              </div>
            ) : (
              <motion.div 
                className="bg-white rounded-lg shadow p-12 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <motion.div 
                  className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                >
                  <Check size={40} className="text-green-600" />
                </motion.div>
                <h2 className="text-2xl font-bold mb-2">Product Listed Successfully!</h2>
                <p className="text-gray-600 mb-6">
                  Your product has been successfully listed.
                </p>
                <p className="text-gray-500">
                  Redirecting to dashboard...
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ListProductPage;