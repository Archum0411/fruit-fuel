import React from 'react';
import { 
  Users, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp, 
  Package, 
  Star,
  BarChart3,
  PieChart
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const AdminDashboard: React.FC = () => {
  const { state } = useApp();

  // Mock data for dashboard
  const stats = {
    totalUsers: 1247,
    totalOrders: 856,
    totalRevenue: 24567,
    activeMembers: 432,
    productsSold: 2341,
    averageRating: 4.8
  };

  const recentOrders = [
    { id: '1', customer: 'John Doe', total: 45.99, status: 'delivered', date: '2024-01-15' },
    { id: '2', customer: 'Jane Smith', total: 23.50, status: 'processing', date: '2024-01-15' },
    { id: '3', customer: 'Mike Johnson', total: 67.25, status: 'confirmed', date: '2024-01-14' },
    { id: '4', customer: 'Sarah Wilson', total: 89.99, status: 'delivered', date: '2024-01-14' },
  ];

  const topProducts = [
    { name: 'Premium Strawberries', sales: 245, revenue: 2205 },
    { name: 'Organic Blueberries', sales: 198, revenue: 1384 },
    { name: 'Tropical Mango', sales: 167, revenue: 583 },
    { name: 'Fresh Avocados', sales: 134, revenue: 401 },
  ];

  if (!state.user || state.user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Access denied. Admin privileges required.</p>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Monitor and manage your Fruit Fuel business</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
              </div>
              <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
                <Users className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalOrders.toLocaleString()}</p>
              </div>
              <div className="bg-green-100 text-green-600 p-3 rounded-xl">
                <ShoppingCart className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="bg-yellow-100 text-yellow-600 p-3 rounded-xl">
                <DollarSign className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Members</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeMembers.toLocaleString()}</p>
              </div>
              <div className="bg-purple-100 text-purple-600 p-3 rounded-xl">
                <TrendingUp className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Products Sold</p>
                <p className="text-2xl font-bold text-gray-900">{stats.productsSold.toLocaleString()}</p>
              </div>
              <div className="bg-orange-100 text-orange-600 p-3 rounded-xl">
                <Package className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average Rating</p>
                <p className="text-2xl font-bold text-gray-900">{stats.averageRating}/5</p>
              </div>
              <div className="bg-red-100 text-red-600 p-3 rounded-xl">
                <Star className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Orders</h2>
            <div className="space-y-4">
              {recentOrders.map(order => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-900">{order.customer}</p>
                    <p className="text-sm text-gray-600">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">${order.total}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Top Products</h2>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.sales} units sold</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">${product.revenue}</p>
                    <p className="text-sm text-gray-600">revenue</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Management Actions */}
        <div className="mt-8 grid md:grid-cols-4 gap-6">
          <button className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
            <div className="text-center">
              <div className="bg-blue-100 text-blue-600 p-4 rounded-xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Package className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Manage Products</h3>
              <p className="text-sm text-gray-600">Add, edit, or remove products</p>
            </div>
          </button>

          <button className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
            <div className="text-center">
              <div className="bg-green-100 text-green-600 p-4 rounded-xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <ShoppingCart className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Order Management</h3>
              <p className="text-sm text-gray-600">Track and manage orders</p>
            </div>
          </button>

          <button className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
            <div className="text-center">
              <div className="bg-purple-100 text-purple-600 p-4 rounded-xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">User Management</h3>
              <p className="text-sm text-gray-600">Manage user accounts</p>
            </div>
          </button>

          <button className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
            <div className="text-center">
              <div className="bg-yellow-100 text-yellow-600 p-4 rounded-xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <BarChart3 className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Analytics</h3>
              <p className="text-sm text-gray-600">View detailed reports</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;