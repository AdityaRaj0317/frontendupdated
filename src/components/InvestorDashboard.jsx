// src/components/InvestorDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    DollarSign,
    BarChart2,
    Lightbulb,
    TrendingUp,
    PlusCircle,
    Eye,
    MessageSquare,
    Star,
    ClipboardCheck,
    Bell,
    Layers,
    Banknote,
    Zap,
    Briefcase,
    Globe,
    FileText
} from 'lucide-react';

// Import Chart.js components
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const InvestorDashboard = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const detectDarkMode = () => {
            setIsDarkMode(document.documentElement.classList.contains('dark'));
        };

        detectDarkMode();
        const observer = new MutationObserver(detectDarkMode);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        return () => observer.disconnect();
    }, []);

    // --- Mock Data for Investor Dashboard ---
    const portfolioStats = {
        totalInvested: 5200000,
        currentValue: 6100000,
        roi: 17.3, // Percentage
        activeInvestments: 12,
        exitedInvestments: 3
    };

    const opportunitiesStats = {
        newOpportunities: 45,
        trendingStartups: 8,
        totalStartupsBrowsed: 250
    };

    const dealFlowStats = {
        activeDeals: 7,
        dueDiligence: 3,
        negotiation: 2,
        termSheetIssued: 1
    };

    const recentActivity = [
        { id: 1, type: 'Pitch Viewed', description: 'Viewed pitch deck for "InnovateTech"', time: '5 mins ago', icon: <Eye className="text-blue-500" /> },
        { id: 2, type: 'Message', description: 'New message from "GreenSolutions" founder', time: '1 hour ago', icon: <MessageSquare className="text-green-500" /> },
        { id: 3, type: 'Rating', description: 'Rated "FutureAI" pitch deck 5 stars', time: 'Yesterday', icon: <Star className="text-yellow-500" /> },
        { id: 4, type: 'Document Signed', description: 'Signed Term Sheet for "UrbanCycle"', time: '2 days ago', icon: <ClipboardCheck className="text-purple-500" /> },
    ];

    const portfolioValueChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        datasets: [
            {
                label: 'Portfolio Value ($)',
                data: [4.5, 4.7, 4.9, 5.2, 5.5, 5.8, 6.0, 6.1].map(val => val * 1000000), // Convert millions to actual value
                borderColor: '#10B981', // Green-500
                backgroundColor: 'rgba(16, 185, 129, 0.2)',
                fill: true,
                tension: 0.4,
                pointRadius: 5,
                pointBackgroundColor: '#10B981',
                pointBorderColor: '#fff',
                pointHoverRadius: 7,
                pointHoverBackgroundColor: '#10B981',
                pointHoverBorderColor: '#fff',
            },
        ],
    };

    const portfolioValueChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    color: isDarkMode ? 'rgb(156 163 175)' : 'rgb(55 65 81)',
                }
            },
            title: {
                display: true,
                text: 'Portfolio Value Over Time',
                color: isDarkMode ? 'rgb(249 250 251)' : 'rgb(55 65 81)',
                font: {
                    size: 18,
                    weight: 'bold'
                }
            },
            tooltip: {
                backgroundColor: isDarkMode ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)',
                titleColor: isDarkMode ? '#000' : '#fff',
                bodyColor: isDarkMode ? '#000' : '#fff',
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += `$${context.parsed.y.toLocaleString()}`;
                        }
                        return label;
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    color: isDarkMode ? 'rgba(100, 100, 100, 0.2)' : 'rgba(200, 200, 200, 0.1)',
                    borderColor: isDarkMode ? 'rgb(75 85 99)' : 'rgb(229 231 235)',
                },
                ticks: {
                    color: isDarkMode ? 'rgb(156 163 175)' : 'rgb(107 114 128)',
                },
                title: {
                    display: true,
                    text: 'Month',
                    color: isDarkMode ? 'rgb(249 250 251)' : 'rgb(55 65 81)',
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                }
            },
            y: {
                grid: {
                    color: isDarkMode ? 'rgba(100, 100, 100, 0.2)' : 'rgba(200, 200, 200, 0.1)',
                    borderColor: isDarkMode ? 'rgb(75 85 99)' : 'rgb(229 231 235)',
                },
                ticks: {
                    color: isDarkMode ? 'rgb(156 163 175)' : 'rgb(107 114 128)',
                    callback: function (value) {
                        return `$${(value / 1000000).toFixed(1)}M`;
                    }
                },
                title: {
                    display: true,
                    text: 'Value',
                    color: isDarkMode ? 'rgb(249 250 251)' : 'rgb(55 65 81)',
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                }
            }
        },
    };

    const investmentBreakdownChartData = {
        labels: ['Seed Stage', 'Series A', 'Series B+', 'Angel'],
        datasets: [
            {
                data: [30, 45, 20, 5], // Percentage breakdown
                backgroundColor: ['#3B82F6', '#EF4444', '#10B981', '#F59E0B'], // Blue, Red, Green, Yellow
                borderColor: isDarkMode ? ['#2563EB', '#DC2626', '#047857', '#D97706'] : ['#3B82F6', '#EF4444', '#10B981', '#F59E0B'],
                borderWidth: 1,
            },
        ],
    };

    const investmentBreakdownChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    color: isDarkMode ? 'rgb(156 163 175)' : 'rgb(55 65 81)',
                }
            },
            title: {
                display: true,
                text: 'Investment Stage Breakdown',
                color: isDarkMode ? 'rgb(249 250 251)' : 'rgb(55 65 81)',
                font: {
                    size: 18,
                    weight: 'bold'
                }
            },
            tooltip: {
                backgroundColor: isDarkMode ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)',
                titleColor: isDarkMode ? '#000' : '#fff',
                bodyColor: isDarkMode ? '#000' : '#fff',
                callbacks: {
                    label: function (context) {
                        let label = context.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed !== null) {
                            label += `${context.parsed}%`;
                        }
                        return label;
                    }
                }
            }
        },
    };

    const dealStageChartData = {
        labels: ['Sourced', 'Pitched', 'Due Diligence', 'Term Sheet', 'Closed'],
        datasets: [
            {
                label: 'Number of Deals',
                data: [15, 10, 3, 2, 1],
                backgroundColor: '#6366F1', // Indigo-500
                borderColor: '#4F46E5', // Indigo-600
                borderWidth: 1,
            },
        ],
    };

    const dealStageChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    color: isDarkMode ? 'rgb(156 163 175)' : 'rgb(55 65 81)',
                }
            },
            title: {
                display: true,
                text: 'Deal Flow Stages',
                color: isDarkMode ? 'rgb(249 250 251)' : 'rgb(55 65 81)',
                font: {
                    size: 18,
                    weight: 'bold'
                }
            },
            tooltip: {
                backgroundColor: isDarkMode ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)',
                titleColor: isDarkMode ? '#000' : '#fff',
                bodyColor: isDarkMode ? '#000' : '#fff',
            }
        },
        scales: {
            x: {
                grid: {
                    color: isDarkMode ? 'rgba(100, 100, 100, 0.2)' : 'rgba(200, 200, 200, 0.1)',
                    borderColor: isDarkMode ? 'rgb(75 85 99)' : 'rgb(229 231 235)',
                },
                ticks: {
                    color: isDarkMode ? 'rgb(156 163 175)' : 'rgb(107 114 128)',
                },
                title: {
                    display: true,
                    text: 'Stage',
                    color: isDarkMode ? 'rgb(249 250 251)' : 'rgb(55 65 81)',
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                }
            },
            y: {
                grid: {
                    color: isDarkMode ? 'rgba(100, 100, 100, 0.2)' : 'rgba(200, 200, 200, 0.1)',
                    borderColor: isDarkMode ? 'rgb(75 85 99)' : 'rgb(229 231 235)',
                },
                ticks: {
                    color: isDarkMode ? 'rgb(156 163 175)' : 'rgb(107 114 128)',
                    stepSize: 1,
                },
                title: {
                    display: true,
                    text: 'Number of Deals',
                    color: isDarkMode ? 'rgb(249 250 251)' : 'rgb(55 65 81)',
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                }
            }
        },
    };

    return (
        <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-2xl animate-fade-in-up">
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6 border-b-4 pb-4 border-green-600 dark:border-green-400 flex items-center">
                <Banknote className="mr-4 text-green-600 dark:text-green-400" size={36} />
                Investor Hub
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-10 leading-relaxed">
                Welcome back! Your personalized overview of investment opportunities and portfolio performance.
            </p>

            {/* Quick Stats & Actions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {/* Stat Card: Total Portfolio Value */}
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
                    {/* Section: Portfolio Performance */}
                    <div className="bg-white dark:bg-gray-850 p-7 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-5 flex items-center">
                            <BarChart2 className="mr-3 text-green-600 dark:text-green-400" size={26} />
                            Portfolio Performance
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-6">
                            Track the growth of your investments over time.
                        </p>
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-5 h-80 flex items-center justify-center text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-gray-600">
                            <Line data={portfolioValueChartData} options={portfolioValueChartOptions} />
                        </div>
                        <Link
                            to="/portfolio"
                            className="mt-6 w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md flex items-center justify-center text-center"
                        >
                            <DollarSign className="mr-2" size={20} />
                            View Full Portfolio
                        </Link>
                    </div>

                    {/* Section: Investment Breakdown */}
                    <div className="bg-white dark:bg-gray-850 p-7 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-5 flex items-center">
                            <Layers className="mr-3 text-blue-600 dark:text-blue-400" size={26} />
                            Investment Breakdown
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-6">
                            Understand the allocation of your investments by stage or industry.
                        </p>
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-5 h-80 flex items-center justify-center text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-gray-600">
                            <Doughnut data={investmentBreakdownChartData} options={investmentBreakdownChartOptions} />
                        </div>
                        <Link
                            to="/portfolio/breakdown"
                            className="mt-6 w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md flex items-center justify-center text-center"
                        >
                            <BarChart2 className="mr-2" size={20} />
                            Analyze Breakdown
                        </Link>
                    </div>

                    {/* Section: Deal Flow Management */}
                    <div className="bg-white dark:bg-gray-850 p-7 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-5 flex items-center">
                            <Briefcase className="mr-3 text-indigo-600 dark:text-indigo-400" size={26} />
                            Deal Flow Management
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-6">
                            Visualize your active deals and their current stages.
                        </p>
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-5 h-80 flex items-center justify-center text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-gray-600">
                            <Bar data={dealStageChartData} options={dealStageChartOptions} />
                        </div>
                        <Link
                            to="/deal-flow"
                            className="mt-6 w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md flex items-center justify-center text-center"
                        >
                            <TrendingUp className="mr-2" size={20} />
                            Manage Deal Pipeline
                        </Link>
                    </div>
                </div>

                {/* Sidebar Content Area - Col 3 */}
                <div className="lg:col-span-1 space-y-8">
                    {/* Section: Recent Activity */}
                    <div className="bg-white dark:bg-gray-850 p-7 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-5 flex items-center">
                            <Bell className="mr-3 text-yellow-600 dark:text-yellow-400" size={26} />
                            Recent Activity
                        </h3>
                        <ul className="space-y-4">
                            {recentActivity.map(activity => (
                                <li key={activity.id} className="flex items-start">
                                    <div className="flex-shrink-0 mr-3">{activity.icon}</div>
                                    <div>
                                        <p className="text-gray-800 dark:text-white font-semibold">{activity.type}</p>
                                        <p className="text-gray-700 dark:text-gray-300 text-sm">{activity.description}</p>
                                        <p className="text-gray-500 dark:text-gray-400 text-xs">{activity.time}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <Link
                            to="/notifications"
                            className="mt-6 w-full px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 flex items-center justify-center text-center"
                        >
                            <Bell className="mr-2" size={18} />
                            View All Notifications
                        </Link>
                    </div>

                    {/* Section: Investor Resources */}
                    <div className="bg-white dark:bg-gray-850 p-7 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-5 flex items-center">
                            <Lightbulb className="mr-3 text-pink-600 dark:text-pink-400" size={26} />
                            Resources for Investors
                        </h3>
                        <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                            <li>
                                <Link to="/resources/due-diligence-guide" className="flex items-center hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
                                    <FileText size={18} className="mr-2 text-pink-500" />
                                    <span>Comprehensive Due Diligence Guide</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/resources/term-sheet-templates" className="flex items-center hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
                                    <FileText size={18} className="mr-2 text-pink-500" />
                                    <span>Term Sheet Templates & Best Practices</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/resources/startup-valuation" className="flex items-center hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
                                    <FileText size={18} className="mr-2 text-pink-500" />
                                    <span>Understanding Startup Valuation Models</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/resources/industry-trends" className="flex items-center hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
                                    <FileText size={18} className="mr-2 text-pink-500" />
                                    <span>Latest Industry Trends & Reports</span>
                                </Link>
                            </li>
                        </ul>
                        <Link
                            to="/resources"
                            className="mt-6 w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 shadow-md flex items-center justify-center text-center"
                        >
                            <Globe className="mr-2" size={18} />
                            Browse All Resources
                        </Link>
                    </div>

                    {/* Section: Quick Actions */}
                    <div className="bg-white dark:bg-gray-850 p-7 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-5 flex items-center">
                            <Zap className="mr-3 text-cyan-600 dark:text-cyan-400" size={26} />
                            Quick Actions
                        </h3>
                        <ul className="space-y-4">
                            <li>
                                <Link
                                    to="/opportunities/new"
                                    className="flex items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors text-gray-800 dark:text-gray-200"
                                >
                                    <Lightbulb size={20} className="mr-3 text-blue-500 dark:text-blue-400" />
                                    <span>Discover New Startups</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/messages/compose"
                                    className="flex items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors text-gray-800 dark:text-gray-200"
                                >
                                    <MessageSquare size={20} className="mr-3 text-purple-500 dark:text-purple-400" />
                                    <span>Send a Message</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/portfolio/add-investment"
                                    className="flex items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors text-gray-800 dark:text-gray-200"
                                >
                                    <PlusCircle size={20} className="mr-3 text-green-500 dark:text-green-400" />
                                    <span>Log New Investment</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/settings/investor-profile"
                                    className="flex items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors text-gray-800 dark:text-gray-200"
                                >
                                    <ClipboardCheck size={20} className="mr-3 text-orange-500 dark:text-orange-400" />
                                    <span>Update Investor Profile</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvestorDashboard;