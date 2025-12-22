import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';
import { useProducts } from '../../context/ProductContext'; // Import product context for stats
import { 
  FaShoppingBag, 
  FaUsers, 
  FaMoneyBillWave, 
  FaBoxOpen, 
  FaArrowRight 
} from 'react-icons/fa';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { adminOrders, getAllOrders, currency } = useOrders();
  const { products } = useProducts(); 
  const [stats, setStats] = useState({
    sales: 0,
    orders: 0,
    products: 0,
    customers: 0 // We don't have a user list API yet, so we'll keep this mocked or 0
  });

  useEffect(() => {
    getAllOrders();
  }, []);

  // Calculate Stats whenever orders or products change
  useEffect(() => {
    if (adminOrders) {
      const totalSales = adminOrders.reduce((acc, order) => acc + order.amount, 0);
      const totalOrders = adminOrders.length;
      
      setStats({
        sales: totalSales,
        orders: totalOrders,
        products: products.length,
        customers: 2
      });
    }
  }, [adminOrders, products]);

  // Dashboard Stats Config
  const dashboardStats = [
    { 
      id: 1, 
      label: 'Total Sales', 
      value: `${currency}${stats.sales.toFixed(2)}`, 
      icon: <FaMoneyBillWave className="w-6 h-6 text-white" />, 
      bg: 'bg-green-500' 
    },
    { 
      id: 2, 
      label: 'Total Orders', 
      value: stats.orders, 
      icon: <FaShoppingBag className="w-6 h-6 text-white" />, 
      bg: 'bg-fuchsia-500' 
    },
    { 
      id: 3, 
      label: 'Total Products', 
      value: stats.products, 
      icon: <FaBoxOpen className="w-6 h-6 text-white" />, 
      bg: 'bg-blue-500' 
    },
    { 
      id: 4, 
      label: 'Total Customers', 
      value: stats.customers, 
      icon: <FaUsers className="w-6 h-6 text-white" />, 
      bg: 'bg-orange-500' 
    },
  ];

  // Helper for status colors
  const getStatusColor = (status) => {
    switch (status) {
      case 'Order Placed': return 'bg-blue-100 text-blue-800';
      case 'Packing': return 'bg-yellow-100 text-yellow-800';
      case 'Shipped': return 'bg-purple-100 text-purple-800';
      case 'Out for delivery': return 'bg-indigo-100 text-indigo-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 lg:p-10">
      <title>Admin Dashboard</title>
      
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back, <span className="font-semibold text-fuchsia-600">{user?.name || 'Admin'}</span>. Here's what's happening today.
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <Link 
            to="/admin/products" 
            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition"
          >
            Manage Products
          </Link>
          <button className="bg-fuchsia-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-fuchsia-700 transition shadow-lg shadow-fuchsia-500/30">
            Generate Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {dashboardStats.map((stat) => (
          <div key={stat.id} className="bg-white rounded-xl shadow-sm p-6 flex items-center transition-transform hover:-translate-y-1">
            <div className={`p-4 rounded-full ${stat.bg} shadow-lg shadow-${stat.bg.replace('bg-', '')}/40 mr-4`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
          <Link to="/admin/orders" className="text-fuchsia-600 hover:text-fuchsia-700 text-sm font-medium flex items-center">
            View All <FaArrowRight className="ml-1 w-3 h-3" />
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-gray-600">
            <thead className="bg-gray-50 text-xs uppercase font-semibold text-gray-500">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {adminOrders && adminOrders.slice(0, 5).map((order) => (
                <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    #{order._id.slice(-6).toUpperCase()}
                  </td>
                  <td className="px-6 py-4">
                    {order.address.firstName} {order.address.lastName}
                  </td>
                  <td className="px-6 py-4">{new Date(order.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 font-medium">{currency}{order.amount.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Link to="/admin/orders" className="text-gray-400 hover:text-fuchsia-600 transition-colors">
                      Manage
                    </Link>
                  </td>
                </tr>
              ))}
              {(!adminOrders || adminOrders.length === 0) && (
                 <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                       No recent orders found.
                    </td>
                 </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;