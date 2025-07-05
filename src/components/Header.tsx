import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, Apple } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Header: React.FC = () => {
  const { state } = useApp();
  const navigate = useNavigate();

  const cartItemCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-2 rounded-xl">
              <Apple className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Fruit Fuel
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-green-600 transition-colors duration-200">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-green-600 transition-colors duration-200">
              Products
            </Link>
            <Link to="/membership" className="text-gray-700 hover:text-green-600 transition-colors duration-200">
              Membership
            </Link>
            {state.user?.role === 'admin' && (
              <Link to="/admin" className="text-gray-700 hover:text-green-600 transition-colors duration-200">
                Admin
              </Link>
            )}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <button
              onClick={() => navigate('/cart')}
              className="relative p-2 text-gray-700 hover:text-green-600 transition-colors duration-200"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* User */}
            {state.user ? (
              <div className="flex items-center space-x-2">
                <img
                  src={state.user.avatar || `https://ui-avatars.com/api/?name=${state.user.name}&background=10b981&color=fff`}
                  alt={state.user.name}
                  className="h-8 w-8 rounded-full"
                />
                <button
                  onClick={() => navigate('/profile')}
                  className="text-gray-700 hover:text-green-600 transition-colors duration-200"
                >
                  {state.user.name}
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200"
              >
                Login
              </Link>
            )}

            {/* Mobile menu */}
            <button className="md:hidden p-2 text-gray-700 hover:text-green-600 transition-colors duration-200">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;