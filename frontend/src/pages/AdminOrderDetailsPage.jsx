import React, { useState } from "react";

// --- 1. SHARED ICONS (Inline SVGs) ---
const Icons = {
  Dashboard: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /></svg>,
  Orders: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>,
  Users: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
  Logout: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>,
  Back: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"></polyline></svg>,
  Print: () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>,
  User: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>,
  Mail: () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>,
  Products: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>,
  Reports: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>,
  Settings: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>,
};

// --- 2. SHARED UI COMPONENTS ---
const Sidebar = () => {
  const menuItems = [
    { icon: Icons.Dashboard, label: "Dashboard", active: false },
    { icon: Icons.Products, label: "Products", active: false },
    { icon: Icons.Orders, label: "Orders", active: true }, // Active for this page
    { icon: Icons.Users, label: "Users", active: false },
    { icon: Icons.Reports, label: "Reports", active: false },
    { icon: Icons.Settings, label: "Settings", active: false },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0 font-sans hidden md:flex">
      <div className="p-8"><h1 className="text-xl font-bold text-slate-800">Salaga Admin</h1></div>
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item, index) => (
          <button key={index} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${item.active ? "bg-slate-100 text-slate-900 shadow-sm" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`}>
            <item.icon /> {item.label}
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-100">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl text-sm font-medium transition-colors">
          <Icons.Logout /> Logout
        </button>
      </div>
    </aside>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    Completed: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Processing: "bg-blue-100 text-blue-700 border-blue-200",
    Pending: "bg-amber-100 text-amber-700 border-amber-200",
    Shipped: "bg-indigo-100 text-indigo-700 border-indigo-200",
    Cancelled: "bg-red-100 text-red-700 border-red-200",
    default: "bg-gray-100 text-gray-700 border-gray-200",
  };
  return <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[status] || styles.default}`}>{status}</span>;
};

// --- 3. MAIN PAGE COMPONENT: ORDER DETAILS ---
const AdminOrderDetailsPage = ({ orderId = "1003" }) => {
  const [order, setOrder] = useState({
    id: orderId,
    customer: "Sophia Clark",
    email: "sophia.clark@example.com",
    address: "123, Lotus Road, Colombo 07",
    status: "Processing",
    items: [
      { name: "Wireless Headphones", qty: 2, price: 2000 },
      { name: "Bluetooth Speaker", qty: 1, price: 1500 },
      { name: "USB-C Charging Cable", qty: 3, price: 450 },
    ],
  });

  const calculateTotal = () => order.items.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto h-screen">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
              <span>Orders</span><span>/</span><span>Details</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors text-slate-600">
                <Icons.Back />
              </button>
              <h1 className="text-2xl font-bold text-slate-800">Order #{order.id}</h1>
              <StatusBadge status={order.status} />
            </div>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-slate-600 rounded-lg hover:bg-gray-50 text-sm font-medium shadow-sm transition-all">
              <Icons.Print /> Print Invoice
            </button>
            <button className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 text-sm font-medium shadow-md transition-all">
              Save Changes
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Order Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100"><h2 className="font-bold text-slate-800 text-lg">Order Items</h2></div>
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                    <tr><th className="p-4 pl-6">Product</th><th className="p-4 text-center">Qty</th><th className="p-4 text-right">Unit Price</th><th className="p-4 pr-6 text-right">Total</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {order.items.map((item, index) => (
                      <tr key={index}>
                        <td className="p-4 pl-6 font-medium text-slate-700">{item.name}</td>
                        <td className="p-4 text-center text-slate-600">{item.qty}</td>
                        <td className="p-4 text-right text-slate-600">Rs. {item.price.toLocaleString()}</td>
                        <td className="p-4 pr-6 text-right font-medium text-slate-800">Rs. {(item.price * item.qty).toLocaleString()}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div className="p-6 bg-slate-50/50 border-t border-gray-100 flex justify-end">
                  <div className="w-64 space-y-3">
                    <div className="flex justify-between text-base font-bold text-slate-800"><span>Total Amount</span><span>Rs. {calculateTotal().toLocaleString()}</span></div>
                  </div>
              </div>
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Icons.User /> Customer Details</h2>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-lg font-bold text-slate-600">{order.customer.charAt(0)}</div>
                <div><p className="font-semibold text-slate-800">{order.customer}</p><p className="text-sm text-slate-500">Previous orders: 12</p></div>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600 mb-2"><Icons.Mail /> {order.email}</div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="font-bold text-slate-800 mb-4">Update Status</h2>
              <select className="w-full bg-slate-50 border border-gray-200 text-slate-700 py-3 px-4 rounded-xl outline-none focus:bg-white focus:border-slate-400 transition-all"
                  value={order.status} onChange={(e) => setOrder({ ...order, status: e.target.value })}>
                  <option value="Pending">Pending</option><option value="Processing">Processing</option><option value="Shipped">Shipped</option><option value="Completed">Completed</option><option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminOrderDetailsPage;