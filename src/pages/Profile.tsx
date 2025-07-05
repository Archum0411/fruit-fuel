import React from 'react';
import { User, Settings, Package, CreditCard, LogOut } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Profile: React.FC = () => {
  const { state, dispatch } = useApp();

  const handleLogout = () => {
    dispatch({ type: 'SET_USER', payload: null });
    window.location.href = '/';
  };

  if (!state.user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Please log in to view your profile</p>
          <button
            onClick={() => window.location.href = '/login'}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-12">
            <div className="flex items-center space-x-6">
              <img
                src={state.user.avatar || `https://ui-avatars.com/api/?name=${state.user.name}&background=ffffff&color=10b981&size=96`}
                alt={state.user.name}
                className="h-24 w-24 rounded-full border-4 border-white"
              />
              <div className="text-white">
                <h1 className="text-3xl font-bold">{state.user.name}</h1>
                <p className="text-green-100">{state.user.email}</p>
                <p className="text-green-100 capitalize">{state.user.role} Account</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Account Information */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Account Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={state.user.name}
                      readOnly
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={state.user.email}
                      readOnly
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Account Type
                    </label>
                    <input
                      type="text"
                      value={state.user.role}
                      readOnly
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 capitalize"
                    />
                  </div>
                </div>
              </div>

              {/* Membership Information */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Membership Status
                </h2>
                {state.user.membership ? (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-green-800">
                        {state.user.membership.name}
                      </h3>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        Active
                      </span>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-green-700">
                        <strong>Discount:</strong> {state.user.membership.discount}% on all orders
                      </p>
                      <p className="text-sm text-green-700">
                        <strong>Deliveries:</strong> {state.user.membership.deliveriesPerWeek} per week
                      </p>
                      <p className="text-sm text-green-700">
                        <strong>Features:</strong> {state.user.membership.features.join(', ')}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No Active Membership
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Upgrade to a membership plan to enjoy exclusive benefits and discounts.
                    </p>
                    <button
                      onClick={() => window.location.href = '/membership'}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200"
                    >
                      View Plans
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => window.location.href = '/products'}
                className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-6 py-3 rounded-xl transition-colors duration-200"
              >
                <Package className="h-5 w-5" />
                <span>My Orders</span>
              </button>
              <button
                onClick={() => window.location.href = '/membership'}
                className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-6 py-3 rounded-xl transition-colors duration-200"
              >
                <Settings className="h-5 w-5" />
                <span>Membership Settings</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-red-100 hover:bg-red-200 text-red-700 px-6 py-3 rounded-xl transition-colors duration-200"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;