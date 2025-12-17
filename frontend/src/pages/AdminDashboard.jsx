import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  FaShoppingBag, 
  FaUsers, 
  FaMoneyBillWave, 
  FaBoxOpen, 
  FaArrowRight 
} from 'react-icons/fa';

const AdminDashboard = () => {
  const { user } = useAuth();

  // --- Mock Data for Dashboard Stats ---
  const stats = [
    { 
      id: 1, 
      label: 'Total Sales', 
      value: '$12,450', 
      icon: <FaMoneyBillWave className="w-6 h-6 text-white" />, 
      bg: 'bg-green-500' 
    },
    { 
      id: 2, 
      label: 'New Orders', 
      value: '24', 
      icon: <FaShoppingBag className="w-6 h-6 text-white" />, 
      bg: 'bg-fuchsia-500' 
    },
    { 
      id: 3, 
      label: 'Total Products', 
      value: '86', 
      icon: <FaBoxOpen className="w-6 h-6 text-white" />, 
      bg: 'bg-blue-500' 
    },
    { 
      id: 4, 
      label: 'Total Customers', 
      value: '1,205', 
      icon: <FaUsers className="w-6 h-6 text-white" />, 
      bg: 'bg-orange-500' 
    },
  ];

  // --- Mock Data for Recent Orders ---
  const recentOrders = [
    { id: '#ORD-001', customer: 'John Doe', date: '2023-10-25', total: '$120.00', status: 'Pending' },
    { id: '#ORD-002', customer: 'Jane Smith', date: '2023-10-24', total: '$85.50', status: 'Shipped' },
    { id: '#ORD-003', customer: 'Mike Ross', date: '2023-10-24', total: '$210.00', status: 'Delivered' },
    { id: '#ORD-004', customer: 'Rachel Zane', date: '2023-10-23', total: '$45.00', status: 'Pending' },
    { id: '#ORD-005', customer: 'Harvey Specter', date: '2023-10-23', total: '$550.00', status: 'Shipped' },
  ];

  // Helper function for status colors
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
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
        {stats.map((stat) => (
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
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4">{order.customer}</td>
                  <td className="px-6 py-4">{order.date}</td>
                  <td className="px-6 py-4 font-medium">{order.total}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-gray-400 hover:text-fuchsia-600 transition-colors">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;