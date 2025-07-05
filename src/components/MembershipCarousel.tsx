import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Membership } from '../types';

const MembershipCarousel: React.FC = () => {
  const { state, dispatch } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState(state.products);

  useEffect(() => {
    // Filter products based on membership level
    const userMembership = state.user?.membership;
    
    if (userMembership) {
      if (userMembership.type === 'monthly') {
        // Premium members see all products
        setFilteredProducts(state.products);
      } else if (userMembership.type === 'weekly') {
        // Weekly members see featured + some regular
        setFilteredProducts(state.products.filter(p => p.featured || p.category === 'berries'));
      } else {
        // Daily members see only featured
        setFilteredProducts(state.products.filter(p => p.featured));
      }
    } else {
      // Non-members see limited selection
      setFilteredProducts(state.products.filter(p => p.featured).slice(0, 3));
    }
  }, [state.user?.membership, state.products]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % filteredProducts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + filteredProducts.length) % filteredProducts.length);
  };

  const handleAddToCart = (product: any) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const getMembershipBadge = () => {
    const membership = state.user?.membership;
    if (!membership) return null;

    const badges = {
      daily: { text: 'Daily Member', color: 'bg-blue-100 text-blue-800' },
      weekly: { text: 'Weekly Member', color: 'bg-purple-100 text-purple-800' },
      monthly: { text: 'Premium Member', color: 'bg-yellow-100 text-yellow-800' }
    };

    const badge = badges[membership.type];
    return (
      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${badge.color} mb-4`}>
        <Star className="h-4 w-4 mr-1" />
        {badge.text}
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          {getMembershipBadge()}
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {state.user?.membership ? 'Your Personalized Selection' : 'Featured Fresh Fruits'}
          </h2>
          <p className="text-lg text-gray-600">
            {state.user?.membership 
              ? `Curated for ${state.user.membership.name} members`
              : 'Upgrade your membership to unlock more premium options'
            }
          </p>
        </div>

        <div className="relative">
          {/* Carousel Container */}
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {filteredProducts.map((product, index) => (
                <div key={product.id} className="w-full flex-shrink-0">
                  <div className="bg-white mx-4 rounded-2xl shadow-xl overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-8 p-8">
                      {/* Product Image */}
                      <div className="relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-80 object-cover rounded-xl"
                        />
                        {product.featured && (
                          <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                            Featured
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex flex-col justify-center">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
                        <p className="text-gray-600 mb-4">{product.description}</p>
                        
                        {/* Nutrition Info */}
                        <div className="grid grid-cols-3 gap-4 mb-6">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">{product.nutrition.calories}</div>
                            <div className="text-sm text-gray-500">Calories</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">{product.nutrition.fiber}g</div>
                            <div className="text-sm text-gray-500">Fiber</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">{product.nutrition.vitaminC}%</div>
                            <div className="text-sm text-gray-500">Vitamin C</div>
                          </div>
                        </div>

                        {/* Price and Add to Cart */}
                        <div className="flex items-center justify-between">
                          <div className="text-3xl font-bold text-gray-900">
                            ${product.price}
                            <span className="text-sm text-gray-500 ml-2">per {product.unit}</span>
                          </div>
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-medium"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {filteredProducts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentSlide ? 'bg-green-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Membership CTA */}
        {!state.user?.membership && (
          <div className="mt-12 text-center">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Unlock Premium Selection</h3>
              <p className="text-gray-600 mb-6">
                Join our membership program to access exclusive fruits, better prices, and priority delivery.
              </p>
              <button
                onClick={() => window.location.href = '/membership'}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-medium"
              >
                View Membership Plans
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MembershipCarousel;