// src/components/AdminDashboard.jsx
import React from 'react';
import { Users, Settings, BarChart2, ShieldCheck, Mail } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-xl animate-fade-in-up">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 border-b pb-4 border-gray-200 dark:border-gray-700 flex items-center">
        <ShieldCheck className="mr-3 text-red-600 dark:text-red-400" size={30} />
        Admin Dashboard
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Welcome back, Admin! Here's your control center for managing the platform.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Card 1: User Management */}
        <div className="bg-gradient-to-br from-red-50 to-orange-100 dark:from-gray-800 dark:to-gray-850 p-6 rounded-xl shadow-md border border-red-100 dark:border-gray-700 transform hover:scale-[1.02] transition-transform duration-300 ease-in-out">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-red-800 dark:text-red-300">User Management</h3>
            <Users size={28} className="text-red-500 dark:text-red-400" />
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
            Oversee all user accounts, roles, and permissions. Suspend or activate users.
          </p>
          <div className="text-center text-3xl font-bold text-red-700 dark:text-red-300 mb-4">500+ Users</div>
          <button className="w-full px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 shadow-lg flex items-center justify-center">
            <span className="font-medium">Manage Users</span>
          </button>
        </div>

        {/* Card 2: System Settings */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-850 p-6 rounded-xl shadow-md border border-blue-100 dark:border-gray-700 transform hover:scale-[1.02] transition-transform duration-300 ease-in-out">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-300">System Configuration</h3>
            <Settings size={28} className="text-blue-500 dark:text-blue-400" />
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
            Adjust global platform settings, integrations, and operational parameters.
          </p>
          <div className="text-center text-3xl font-bold text-blue-700 dark:text-blue-300 mb-4">Live</div>
          <button className="w-full px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg flex items-center justify-center">
            <span className="font-medium">Access Settings</span>
          </button>
        </div>

        {/* Card 3: Analytics & Reports */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-800 dark:to-gray-850 p-6 rounded-xl shadow-md border border-purple-100 dark:border-gray-700 transform hover:scale-[1.02] transition-transform duration-300 ease-in-out">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-purple-800 dark:text-purple-300">Platform Analytics</h3>
            <BarChart2 size={28} className="text-purple-500 dark:text-purple-400" />
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
            Monitor platform performance, user engagement, and key metrics over time.
          </p>
          <div className="text-center text-3xl font-bold text-purple-700 dark:text-purple-300 mb-4">📈</div>
          <button className="w-full px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 shadow-lg flex items-center justify-center">
            <span className="font-medium">View Reports</span>
          </button>
        </div>

        {/* Action Card: Send Broadcast Message */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center text-center group">
          <Mail size={40} className="text-gray-400 dark:text-gray-500 mb-3 group-hover:text-green-500 dark:group-hover:text-green-400 transition-colors" />
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Broadcast Message</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
            Send important announcements or updates to all users or specific roles.
          </p>
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-lg">
            Compose Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
