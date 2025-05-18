import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TrackOrder: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-20 flex items-center justify-center bg-gray-50">
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="bg-white rounded-lg shadow-md p-8 max-w-lg mx-auto">
            <h1 className="text-3xl font-bold mb-4">Order Tracking</h1>
            <p className="text-gray-600 mb-6">
              This feature will be available soon. We're working hard to bring you the best shopping experience.
            </p>
            <button
              className="bg-indigo-600 text-white px-6 py-2 rounded-md font-medium hover:bg-indigo-700 transition"
              onClick={() => navigate('/')}
            >
              Return to Homepage
            </button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default TrackOrder;