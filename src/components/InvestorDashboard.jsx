import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    DollarSign, Layers, Lightbulb, TrendingUp, Bell, PlusCircle, User, Briefcase, Handshake, Settings, HelpCircle,
    Banknote, BarChart2, Building, Eye, Calendar, Clock, Award, Users, DollarSign as DollarIcon, Mail, Phone
} from 'lucide-react';
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const InvestorDashboard = () => {
    // Dummy Data for demonstration
    const portfolioStats = {
        currentValue: 25000000, // $25 Million
        roi: 18.5,
        activeInvestments: 12,
        exitedInvestments: 3,
    };

    const opportunitiesStats = {
        newOpportunities: 7,
        trendingStartups: 3,
    };

    const dealFlowStats = {
        activeDeals: 5,
        dueDiligence: 2,
    };

    const portfolioCompanies = [
        { id: 1, name: 'InnovateX', industry: 'AI/ML', stage: 'Series A', invested: 1500000, current: 2200000, nextRound: 'Q4 2025' },
        { id: 2, name: 'BioGenetics', industry: 'Biotech', stage: 'Seed', invested: 500000, current: 650000, nextRound: 'Q1 2026' },
        { id: 3, name: 'FinTech Solutions', industry: 'FinTech', stage: 'Series B', invested: 3000000, current: 4100000, nextRound: 'N/A' },
        { id: 4, name: 'EduTech Platform', industry: 'EdTech', stage: 'Series A', invested: 1000000, current: 1300000, nextRound: 'Q2 2026' },
    ];

    const recentActivity = [
        { id: 1, type: 'New Deal', description: 'Evaluated "Quantum Leap Robotics" pitch.', time: '2 hours ago', icon: <Lightbulb size={20} className="text-purple-500" /> },
        { id: 2, type: 'Investment', description: 'Invested $500K in "GreenHarvest Agriculture".', time: '1 day ago', icon: <DollarIcon size={20} className="text-green-500" /> },
        { id: 3, type: 'Update', description: '"InnovateX" released Q2 earnings report.', time: '3 days ago', icon: <BarChart2 size={20} className="text-blue-500" /> },
        { id: 4, type: 'Meeting', description: 'Scheduled follow-up with "HealthLink MedTech".', time: '5 days ago', icon: <Calendar size={20} className="text-red-500" /> },
    ];

    const upcomingMeetings = [
        { id: 1, title: 'Pitch: EcoInnovate', time: 'Today, 2:00 PM', location: 'Zoom Call', icon: <Phone size={20} className="text-blue-500" /> },
        { id: 2, title: 'Portfolio Review: FinTech Solutions', time: 'Tomorrow, 10:00 AM', location: 'Office', icon: <Users size={20} className="text-green-500" /> },
        { id: 3, title: 'Due Diligence: AI Insights', time: 'Mon, Jul 29, 3:00 PM', location: 'Online', icon: <Award size={20} className="text-purple-500" /> },
    ];

    // Chart Data & Options
    const lineChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
            {
                label: 'Portfolio Value',
                data: [15, 16, 18, 20, 22, 24, 25], // in millions
                borderColor: '#10B981', // green-500
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const doughnutChartData = {
        labels: ['AI/ML', 'Biotech', 'FinTech', 'EdTech', 'Other'],
        datasets: [
            {
                data: [35, 15, 25, 10, 15], // percentage breakdown
                backgroundColor: ['#3B82F6', '#EF4444', '#8B5CF6', '#F59E0B', '#6B7280'], // blue, red, purple, amber, gray
                borderColor: '#ffffff',
                borderWidth: 2,
            },
        ],
    };

    const lineChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    color: 'rgb(55, 65, 81)', // dark gray for text
                }
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 1, minimumFractionDigits: 1 }).format(context.parsed.y) + 'M';
                        }
                        return label;
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: 'rgb(75, 85, 99)', // medium gray for x-axis ticks
                }
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Value (Millions $)',
                    color: 'rgb(75, 85, 99)', // medium gray for y-axis title
                },
                ticks: {
                    callback: function (value) {
                        return value + 'M';
                    },
                    color: 'rgb(75, 85, 99)', // medium gray for y-axis ticks
                },
                grid: {
                    color: 'rgb(229, 231, 235)', // light gray for grid lines
                }
            },
        },
    };

    const doughnutChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    color: 'rgb(55, 65, 81)', // dark gray for text
                }
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed) {
                            label += context.parsed + '%';
                        }
                        return label;
                    }
                }
            }
        },
    };

    const portfolioGraphs = [
        { type: Line, data: lineChartData, options: lineChartOptions },
        { type: Doughnut, data: doughnutChartData, options: doughnutChartOptions },
    ];

    const [currentGraphIndex, setCurrentGraphIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentGraphIndex((prevIndex) => (prevIndex + 1) % portfolioGraphs.length);
        }, 5000); // Change graph every 5 seconds
        return () => clearInterval(interval);
    }, [portfolioGraphs.length]);

    const CurrentGraphComponent = portfolioGraphs[currentGraphIndex].type;
    const currentGraphData = portfolioGraphs[currentGraphIndex].data;
    const currentGraphOptions = portfolioGraphs[currentGraphIndex].options;


    return (
        // Changed overall dark mode background to a slightly lighter grey to make contrast
        // with the forced white sections more obvious, but you can keep dark:bg-gray-900 if preferred.
        <div className="bg-gray-100 dark:bg-gray-800 min-h-screen p-8">
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6 border-b-4 pb-4 border-green-600 dark:border-green-400 flex items-center">
                <Banknote className="mr-4 text-green-600 dark:text-green-400" size={36} />
                Investor Hub
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-10 leading-relaxed">
                Welcome back! Your personalized overview of investment opportunities and portfolio performance.
            </p>

            {/* Quick Stats & Actions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {/* Stat Card: Total Portfolio Value (these remain white text on gradient) */}
                <Link to="/portfolio" className="bg-gradient-to-r from-green-500 to-teal-600 dark:from-green-700 dark:to-teal-800 p-5 rounded-xl shadow-lg text-white transform hover:scale-[1.03] transition-transform duration-300 ease-in-out block cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                        <DollarSign size={24} className="text-white/80" />
                        <span className="text-sm font-semibold">Total Portfolio Value</span>
                    </div>
                    <p className="text-3xl font-bold">${(portfolioStats.currentValue / 1000000).toFixed(1)}M</p>
                    <p className="text-sm text-white/80">+{portfolioStats.roi.toFixed(1)}% ROI</p>
                </Link>

                {/* Stat Card: Active Investments */}
                <Link to="/portfolio/active" className="bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-700 dark:to-indigo-800 p-5 rounded-xl shadow-lg text-white transform hover:scale-[1.03] transition-transform duration-300 ease-in-out block cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                        <Layers className="text-white/80" size={24} />
                        <span className="text-sm font-semibold">Active Investments</span>
                    </div>
                    <p className="text-3xl font-bold">{portfolioStats.activeInvestments}</p>
                    <p className="text-sm text-white/80">{portfolioStats.exitedInvestments} Exited</p>
                </Link>

                {/* Stat Card: New Opportunities */}
                <Link to="/opportunities" className="bg-gradient-to-r from-purple-500 to-pink-600 dark:from-purple-700 dark:to-pink-800 p-5 rounded-xl shadow-lg text-white transform hover:scale-[1.03] transition-transform duration-300 ease-in-out block cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                        <Lightbulb size={24} className="text-white/80" />
                        <span className="text-sm font-semibold">New Opportunities</span>
                    </div>
                    <p className="text-3xl font-bold">{opportunitiesStats.newOpportunities}</p>
                    <p className="text-sm text-white/80">{opportunitiesStats.trendingStartups} Trending Startups</p>
                </Link>

                {/* Stat Card: Active Deals */}
                <Link to="/deal-flow" className="bg-gradient-to-r from-yellow-500 to-orange-600 dark:from-yellow-700 dark:to-orange-800 p-5 rounded-xl shadow-lg text-white transform hover:scale-[1.03] transition-transform duration-300 ease-in-out block cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                        <TrendingUp size={24} className="text-white/80" />
                        <span className="text-sm font-semibold">Active Deals</span>
                    </div>
                    <p className="text-3xl font-bold">{dealFlowStats.activeDeals}</p>
                    <p className="text-sm text-white/80">{dealFlowStats.dueDiligence} In Due Diligence</p>
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Area - Col 1 & 2 */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Section: Overall Portfolio Performance (Now dynamically displaying graphs) */}
                    {/* MODIFICATION HERE: Removed dark:bg-gray-850 and dark:text-white to force white background and black text */}
                    <div className="bg-white p-7 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                        <h3 className="text-2xl font-bold text-gray-900 mb-5 flex items-center">
                            <BarChart2 className="mr-3 text-green-600 dark:text-green-400" size={26} />
                            Overall Portfolio Performance
                        </h3>
                        {/* MODIFICATION HERE: Removed dark:text-gray-300 to force gray-800 (which is black enough) */}
                        <p className="text-gray-800 mb-6">
                            Track the aggregate growth and breakdown of your investments over time.
                        </p>
                        {/* MODIFICATION HERE: Removed dark:bg-gray-800 and dark:text-gray-400 for the graph container */}
                        <div className="bg-gray-50 rounded-lg p-5 h-80 flex items-center justify-center text-gray-500 border border-gray-300 dark:border-gray-600 relative">
                            <div className="w-full h-full transition-opacity duration-700 ease-in-out opacity-100">
                                <CurrentGraphComponent
                                    key={currentGraphIndex}
                                    data={currentGraphData}
                                    options={currentGraphOptions}
                                />
                            </div>

                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                {portfolioGraphs.map((_, index) => (
                                    <span
                                        key={`dot-${index}`}
                                        className={`block w-3 h-3 rounded-full ${
                                            currentGraphIndex === index ? 'bg-green-600 dark:bg-green-400' : 'bg-gray-300' // Keep dark:bg-gray-600 for inactive dot in dark mode, or make it gray-300 always
                                        }`}
                                    ></span>
                                ))}
                            </div>
                        </div>
                        <Link
                            to="/portfolio"
                            className="mt-6 w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md flex items-center justify-center text-center"
                        >
                            <DollarSign className="mr-2" size={20} />
                            View Full Portfolio Insights
                        </Link>
                    </div>

                    {/* NEW: Section: Portfolio Companies (Table - remains as a separate detail) */}
                    {/* MODIFICATION HERE: Removed dark:bg-gray-850 and added text-black */}
                    <div className="bg-white p-7 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 text-black">
                        {/* MODIFICATION HERE: Removed dark:text-white to force black text for h3 */}
                        <h3 className="text-2xl font-bold text-gray-900 mb-5 flex items-center">
                            <Building className="mr-3 text-cyan-600 dark:text-cyan-400" size={26} />
                            Your Portfolio Companies
                        </h3>
                        {/* MODIFICATION HERE: Removed dark:text-gray-300 to force gray-800 (black-ish) */}
                        <p className="text-gray-800 mb-6">
                            An overview of your current active investments.
                        </p>
                        <div className="overflow-x-auto">
                            {/* MODIFICATION HERE: Removed dark:divide-gray-700 as the background is forced white */}
                            <table className="min-w-full divide-y divide-gray-200">
                                {/* MODIFICATION HERE: Removed dark:bg-gray-800 */}
                                <thead className="bg-gray-50">
                                    <tr>
                                        {/* MODIFICATION HERE: Removed dark:text-gray-400 */}
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                                            Company
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                                            Industry
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                                            Stage
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                                            Invested
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                                            Current Value
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                                            Next Round
                                        </th>
                                    </tr>
                                </thead>
                                {/* MODIFICATION HERE: Removed dark:bg-gray-850 and dark:divide-gray-700 */}
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {portfolioCompanies.map((company) => (
                                        <tr key={company.id} className="hover:bg-gray-50 transition-colors duration-150">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {company.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                                {company.industry}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                                {company.stage}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                                ${company.invested.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                                ${company.current.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                                {company.nextRound}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Link
                            to="/portfolio/companies"
                            className="mt-6 w-full px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors duration-200 shadow-md flex items-center justify-center text-center"
                        >
                            <Eye className="mr-2" size={20} />
                            View All Companies
                        </Link>
                    </div>
                </div>

                {/* Sidebar Content Area - Col 3 */}
                <div className="lg:col-span-1 space-y-8">
                    {/* Section: Recent Activity */}
                    {/* MODIFICATION HERE: Removed dark:bg-gray-850 and dark:text-white */}
                    <div className="bg-white p-7 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                        <h3 className="text-2xl font-bold text-gray-900 mb-5 flex items-center">
                            <Bell className="mr-3 text-red-500 dark:text-red-400" size={26} />
                            Recent Activity
                        </h3>
                        {/* Forced dark:text-black and dark:bg-white for the ul/li children */}
                        <div className="dark:text-black dark:bg-white dark:[&_*]:text-black dark:[&_*]:bg-white">
                            <ul className="space-y-4">
                                {recentActivity.map(activity => (
                                    <li key={activity.id} className="flex items-start bg-gray-50 hover:bg-gray-100 p-3 rounded-lg transition-colors duration-150 border border-gray-200">
                                        <div className="mr-3 flex-shrink-0">
                                            {activity.icon}
                                        </div>
                                        <div className="flex-grow">
                                            <p className="text-gray-900 font-medium">
                                                {activity.type}: <span className="text-gray-700">{activity.description}</span>
                                            </p>
                                            <p className="text-sm text-gray-600">{activity.time}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <Link
                            to="/activity"
                            className="mt-6 w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md flex items-center justify-center text-center"
                        >
                            <Eye className="mr-2" size={20} />
                            View All Activity
                        </Link>
                    </div>

                    {/* Section: Quick Sec (Redesigned with new items) */}
                    <div className="bg-white dark:bg-gray-850 p-7 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-5 flex items-center">
                            <PlusCircle className="mr-3 text-blue-600 dark:text-blue-400" size={26} />
                            Quick Sec
                        </h3>
                        <div className="space-y-4">
                            {/* Item 1: Profile */}
                            <Link
                                to="/profile"
                                className="flex items-center px-4 py-3 bg-blue-50 dark:bg-gray-700 rounded-lg shadow-sm hover:bg-blue-100 dark:hover:bg-gray-600 transition-colors duration-200 text-gray-900 dark:text-white font-medium"
                            >
                                <User className="mr-3 text-blue-600 dark:text-blue-400" size={20} />
                                Profile
                            </Link>

                            {/* Item 2: New Opportunity */}
                            <Link
                                to="/new-opportunity"
                                className="flex items-center px-4 py-3 bg-green-50 dark:bg-gray-700 rounded-lg shadow-sm hover:bg-green-100 dark:hover:bg-gray-600 transition-colors duration-200 text-gray-900 dark:text-white font-medium"
                            >
                                <Briefcase className="mr-3 text-green-600 dark:text-green-400" size={20} />
                                New Opportunity
                            </Link>

                            {/* Item 3: Add Deals */}
                            <Link
                                to="/add-deals"
                                className="flex items-center px-4 py-3 bg-purple-50 dark:bg-gray-700 rounded-lg shadow-sm hover:bg-purple-100 dark:hover:bg-gray-600 transition-colors duration-200 text-gray-900 dark:text-white font-medium"
                            >
                                <Handshake className="mr-3 text-purple-600 dark:text-purple-400" size={20} />
                                Add Deals
                            </Link>

                            {/* Item 4: Settings */}
                            <Link
                                to="/settings"
                                className="flex items-center px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 text-gray-900 dark:text-white font-medium"
                            >
                                <Settings className="mr-3 text-gray-600 dark:text-gray-400" size={20} />
                                Settings
                            </Link>
                            {/* New Item: Help/FAQ */}
                            <Link
                                to="/faq" // Link to your FAQ page
                                className="flex items-center px-4 py-3 bg-yellow-50 dark:bg-gray-700 rounded-lg shadow-sm hover:bg-yellow-100 dark:hover:bg-gray-600 transition-colors duration-200 text-gray-900 dark:text-white font-medium"
                            >
                                <HelpCircle className="mr-3 text-yellow-600 dark:text-yellow-400" size={20} />
                                Help & FAQ
                            </Link>
                        </div>
                    </div>

                
                </div>
            </div>
        </div>
    );
};

export default InvestorDashboard;