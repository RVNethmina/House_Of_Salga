import React, { useState } from "react";

// --- 1. SHARED ICONS (Inline SVGs) ---
const Icons = {
  Dashboard: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /></svg>,
  Orders: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>,
  Users: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
  Logout: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>,
  Search: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>,
  Eye: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>,
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
    Cancelled: "bg-red-100 text-red-700 border-red-200",
    default: "bg-gray-100 text-gray-700 border-gray-200",
  };
  return <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[status] || styles.default}`}>{status}</span>;
};

// --- 3. MAIN PAGE COMPONENT: ORDERS LIST ---
const AdminOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const orders = [
    { id: "12345", customer: "John Doe", date: "2025-11-22", amount: 3500, status: "Processing" },
    { id: "12346", customer: "Sara Smith", date: "2025-11-20", amount: 5400, status: "Completed" },
    { id: "12347", customer: "Nimal Perera", date: "2025-11-19", amount: 1800, status: "Pending" },
    { id: "12348", customer: "Kamal Silva", date: "2025-11-18", amount: 2100, status: "Cancelled" },
    { id: "12349", customer: "Rani Jay", date: "2025-11-18", amount: 7500, status: "Completed" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto h-screen">
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
                <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
                    <span>Dashboard</span><span>/</span><span>Orders</span>
                </div>
                <h1 className="text-2xl font-bold text-slate-800">Orders List</h1>
            </div>
            <div className="relative w-full md:w-64">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Icons.Search /></span>
                <input type="text" placeholder="Search orders..." className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-slate-400 text-sm"
                    value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
        </div>

        {/* Table Card */}
        <div className="bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold border-b border-gray-100">
                  <th className="p-4 pl-6">Order ID</th><th className="p-4">Customer</th><th className="p-4">Date</th><th className="p-4">Amount</th><th className="p-4">Status</th><th className="p-4 pr-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/60 transition duration-150 ease-in-out">
                    <td className="p-4 pl-6 font-medium text-slate-700">#{order.id}</td>
                    <td className="p-4 text-slate-600">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">{order.customer.charAt(0)}</div>
                            {order.customer}
                        </div>
                    </td>
                    <td className="p-4 text-slate-500 text-sm">{order.date}</td>
                    <td className="p-4 font-semibold text-slate-700">Rs. {order.amount.toLocaleString()}</td>
                    <td className="p-4"><StatusBadge status={order.status} /></td>
                    <td className="p-4 pr-6 text-right">
                      <button onClick={() => (window.location.href = `/admin/order/${order.id}`)} className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-lg text-xs font-medium border border-gray-200 transition-colors">
                        <Icons.Eye /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminOrders;