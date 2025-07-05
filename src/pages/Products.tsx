import React, { useState } from 'react';
import { Search, Filter, Star, ShoppingCart } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Products: React.FC = () => {
  const { state, dispatch } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Fruits' },
    { id: 'berries', name: 'Berries' },
    { id: 'tropical', name: 'Tropical' },
    { id: 'citrus', name: 'Citrus' },
    { id: 'seasonal', name: 'Seasonal' }
  ];

  const filteredProducts = state.products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product: any) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const getMembershipDiscount = () => {
    const membership = state.user?.membership;
    if (!membership) return 0;
    return membership.discount;
  };

  const calculateDiscountedPrice = (price: number) => {
    const discount = getMembershipDiscount();
    return discount > 0 ? price * (1 - discount / 100) : price;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Fresh Fruit Collection</h1>
          <p className="text-gray-600">Discover our premium selection of fresh, organic fruits</p>
          {state.user?.membership && (
            <div className="mt-4 bg-green-100 text-green-800 px-4 py-2 rounded-lg inline-block">
              <span className="font-medium">
                {state.user.membership.name} - {state.user.membership.discount}% off all orders
              </span>
            </div>
          )}
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search fruits..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => {
            const discountedPrice = calculateDiscountedPrice(product.price);
            const hasDiscount = getMembershipDiscount() > 0;

            return (
              <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  {product.featured && (
                    <div className="absolute top-4 left-4 bg-orange-500 text-white px-2 py-1 rounded-full text-sm font-medium">
                      Featured
                    </div>
                  )}
                  {hasDiscount && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-sm font-medium">
                      -{getMembershipDiscount()}%
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                  
                  {/* Nutrition badges */}
                  <div className="flex space-x-2 mb-4">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                      {product.nutrition.calories} cal
                    </span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                      {product.nutrition.fiber}g fiber
                    </span>
                    <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs">
                      {product.nutrition.vitaminC}% Vit C
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      {hasDiscount ? (
                        <>
                          <span className="text-lg font-bold text-green-600">
                            ${discountedPrice.toFixed(2)}
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            ${product.price.toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="text-lg font-bold text-gray-900">
                          ${product.price.toFixed(2)}
                        </span>
                      )}
                      <span className="text-sm text-gray-500">per {product.unit}</span>
                    </div>
                    
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200"
                    >
                      <ShoppingCart className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;