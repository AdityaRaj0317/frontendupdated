// src/components/FounderDashboard.jsx
import React from 'react';
import { Briefcase, TrendingUp, Users, PlusCircle } from 'lucide-react';

const FounderDashboard = () => {
  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-xl animate-fade-in-up">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 border-b pb-4 border-gray-200 dark:border-gray-700 flex items-center">
        <Briefcase className="mr-3 text-blue-600 dark:text-blue-400" size={30} />
        Founder Dashboard
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Welcome back, Founder! Here's a quick overview of your startup's progress and key actions.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Card 1: Startup Profile */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-850 p-6 rounded-xl shadow-md border border-blue-100 dark:border-gray-700 transform hover:scale-[1.02] transition-transform duration-300 ease-in-out">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-300">My Startup Profile</h3>
            <Briefcase size={28} className="text-blue-500 dark:text-blue-400" />
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
            Manage your company details, mission, and pitch deck. Keep it updated for investors!
          </p>
          <button className="w-full px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg flex items-center justify-center">
            <span className="font-medium">Edit Profile</span>
          </button>
        </div>

        {/* Card 2: Fundraising Progress */}
        <div className="bg-gradient-to-br from-green-50 to-teal-100 dark:from-gray-800 dark:to-gray-850 p-6 rounded-xl shadow-md border border-green-100 dark:border-gray-700 transform hover:scale-[1.02] transition-transform duration-300 ease-in-out">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-green-800 dark:text-green-300">Fundraising Status</h3>
            <TrendingUp size={28} className="text-green-500 dark:text-green-400" />
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
            Track your current funding round, investor outreach, and commitment status.
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-3">
            <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
          </div>
          <p className="text-gray-800 dark:text-gray-200 text-sm text-center mb-4">65% Raised - $650k / $1M Goal</p>
          <button className="w-full px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-lg flex items-center justify-center">
            <span className="font-medium">View Details</span>
          </button>
        </div>

        {/* Card 3: Team Management */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-800 dark:to-gray-850 p-6 rounded-xl shadow-md border border-purple-100 dark:border-gray-700 transform hover:scale-[1.02] transition-transform duration-300 ease-in-out">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-purple-800 dark:text-purple-300">Team Members</h3>
            <Users size={28} className="text-purple-500 dark:text-purple-400" />
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
            Add or manage your team, assign roles, and track responsibilities.
          </p>
          <div className="flex -space-x-2 overflow-hidden mb-4 justify-center">
            <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white dark:ring-gray-800" src="https://randomuser.me/api/portraits/men/7.jpg" alt="Team Member"/>
            <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white dark:ring-gray-800" src="https://randomuser.me/api/portraits/women/8.jpg" alt="Team Member"/>
            <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white dark:ring-gray-800" src="https://randomuser.me/api/portraits/men/9.jpg" alt="Team Member"/>
            <span className="inline-flex items-center justify-center h-10 w-10 rounded-full ring-2 ring-white dark:ring-gray-800 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm">
              +3
            </span>
          </div>
          <button className="w-full px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 shadow-lg flex items-center justify-center">
            <span className="font-medium">Manage Team</span>
          </button>
        </div>

        {/* Action Card: Add New Pitch */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center text-center group">
          <PlusCircle size={40} className="text-gray-400 dark:text-gray-500 mb-3 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" />
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Create New Pitch</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
            Got a new idea or ready for the next round? Create a new pitch.
          </p>
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-lg">
            Start Pitch
          </button>
        </div>
      </div>
    </div>
  );
};

export default FounderDashboard;