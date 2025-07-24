// src/components/InvestorDashboard.jsx
import React from 'react';
import { DollarSign, BarChart2, Lightbulb, TrendingUp } from 'lucide-react';

const InvestorDashboard = () => {
  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-xl animate-fade-in-up">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 border-b pb-4 border-gray-200 dark:border-gray-700 flex items-center">
        <DollarSign className="mr-3 text-green-600 dark:text-green-400" size={30} />
        Investor Dashboard
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Welcome back, Investor! Discover new opportunities and manage your portfolio.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Card 1: Investment Portfolio */}
        <div className="bg-gradient-to-br from-green-50 to-teal-100 dark:from-gray-800 dark:to-gray-850 p-6 rounded-xl shadow-md border border-green-100 dark:border-gray-700 transform hover:scale-[1.02] transition-transform duration-300 ease-in-out">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-green-800 dark:text-green-300">My Portfolio</h3>
            <BarChart2 size={28} className="text-green-500 dark:text-green-400" />
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
            View the performance and details of your current investments.
          </p>
          <div className="text-center text-3xl font-bold text-green-700 dark:text-green-300 mb-4">$5.2M</div>
          <button className="w-full px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-lg flex items-center justify-center">
            <span className="font-medium">View Portfolio</span>
          </button>
        </div>

        {/* Card 2: New Opportunities */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-800 dark:to-gray-850 p-6 rounded-xl shadow-md border border-purple-100 dark:border-gray-700 transform hover:scale-[1.02] transition-transform duration-300 ease-in-out">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-purple-800 dark:text-purple-300">New Startups</h3>
            <Lightbulb size={28} className="text-purple-500 dark:text-purple-400" />
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
            Explore newly listed startups and potential investment opportunities.
          </p>
          <div className="text-center text-3xl font-bold text-purple-700 dark:text-purple-300 mb-4">120+</div>
          <button className="w-full px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 shadow-lg flex items-center justify-center">
            <span className="font-medium">Browse Opportunities</span>
          </button>
        </div>

        {/* Card 3: Deal Flow */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-850 p-6 rounded-xl shadow-md border border-blue-100 dark:border-gray-700 transform hover:scale-[1.02] transition-transform duration-300 ease-in-out">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-300">Deal Flow</h3>
            <TrendingUp size={28} className="text-blue-500 dark:text-blue-400" />
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
            Manage your current deal pipeline, due diligence, and negotiation stages.
          </p>
          <div className="text-center text-3xl font-bold text-blue-700 dark:text-blue-300 mb-4">7 Active Deals</div>
          <button className="w-full px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg flex items-center justify-center">
            <span className="font-medium">View Deals</span>
          </button>
        </div>

        {/* Action Card: Add New Investor Note */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center text-center group">
          <PlusCircle size={40} className="text-gray-400 dark:text-gray-500 mb-3 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" />
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Add New Note</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
            Keep track of important details or insights for a startup.
          </p>
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-lg">
            Create Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvestorDashboard;