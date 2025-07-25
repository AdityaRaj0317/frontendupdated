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
    HelpCircle,
    Star,
    ClipboardCheck,
    Bell,
    Layers,
    Banknote,
    Handshake,
     Settings,
    User,
    Zap,
    Briefcase,
    Globe,
    FileText,
    Building, // Added for portfolio companies
    PieChart, // Added for industry breakdown
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
    // NEW STATE: To manage which graph is currently displayed in the "Overall Portfolio Performance" section
    const [currentGraphIndex, setCurrentGraphIndex] = useState(0);

    useEffect(() => {
        const detectDarkMode = () => {
            setIsDarkMode(document.documentElement.classList.contains('dark'));
        };

        detectDarkMode();
        const observer = new MutationObserver(detectDarkMode);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        return () => observer.disconnect();
    }, []);

    // --- Mock Data for Investor Dashboard (Enhanced) ---
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

    // NEW: Mock Data for Portfolio Companies
    const portfolioCompanies = [
        { id: 1, name: 'InnovateTech', industry: 'AI/ML', stage: 'Series A', valuation: 15, nextRound: 'Series B', status: 'Growing', invested: 500000, current: 750000 },
        { id: 2, name: 'GreenSolutions', industry: 'Clean Energy', stage: 'Seed', valuation: 5, nextRound: 'Series A', status: 'Steady', invested: 200000, current: 220000 },
        { id: 3, name: 'UrbanCycle', industry: 'Logistics', stage: 'Series B', valuation: 30, nextRound: 'Series C', status: 'Scaling', invested: 1000000, current: 1500000 },
        { id: 4, name: 'HealthBridge', industry: 'Healthcare Tech', stage: 'Seed', valuation: 8, nextRound: 'Seed+', status: 'Promising', invested: 300000, current: 350000 },
        { id: 5, name: 'EduSpark', industry: 'EdTech', stage: 'Series A', valuation: 12, nextRound: 'Series B', status: 'Growing', invested: 400000, current: 500000 },
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

    // NEW: Data for Funding Stages of Portfolio Companies
    const fundingStageData = {
        labels: ['Seed', 'Series A', 'Series B', 'Series C+'],
        datasets: [
            {
                label: 'Number of Companies',
                data: [
                    portfolioCompanies.filter(comp => comp.stage === 'Seed').length,
                    portfolioCompanies.filter(comp => comp.stage === 'Series A').length,
                    portfolioCompanies.filter(comp => comp.stage === 'Series B').length,
                    portfolioCompanies.filter(comp => comp.stage === 'Series C').length + portfolioCompanies.filter(comp => comp.stage === 'Series B+').length, // B+ treated as C+ for this chart
                ],
                backgroundColor: ['#F59E0B', '#3B82F6', '#10B981', '#EF4444'], // Yellow, Blue, Green, Red
                borderColor: isDarkMode ? ['#D97706', '#2563EB', '#047857', '#DC2626'] : ['#F59E0B', '#3B82F6', '#10B981', '#EF4444'],
                borderWidth: 1,
            },
        ],
    };

    const fundingStageOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    color: isDarkMode ? 'rgb(156 163 175)' : 'rgb(55 65 81)',
                },
            },
            title: {
                display: true,
                text: 'Portfolio Companies by Funding Stage',
                color: isDarkMode ? 'rgb(249 250 251)' : 'rgb(55 65 81)',
                font: {
                    size: 18,
                    weight: 'bold',
                },
            },
            tooltip: {
                backgroundColor: isDarkMode ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)',
                titleColor: isDarkMode ? '#000' : '#fff',
                bodyColor: isDarkMode ? '#000' : '#fff',
            },
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
                    text: 'Funding Stage',
                    color: isDarkMode ? 'rgb(249 250 251)' : 'rgb(55 65 81)',
                    font: {
                        size: 14,
                        weight: 'bold',
                    },
                },
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
                    text: 'Number of Companies',
                    color: isDarkMode ? 'rgb(249 250 251)' : 'rgb(55 65 81)',
                    font: {
                        size: 14,
                        weight: 'bold',
                    },
                },
            },
        },
    };

    // NEW: Data for Industry Distribution of Portfolio Companies
    const industryData = (() => {
        const industryCounts = portfolioCompanies.reduce((acc, company) => {
            acc[company.industry] = (acc[company.industry] || 0) + 1;
            return acc;
        }, {});
        const labels = Object.keys(industryCounts);
        const data = Object.values(industryCounts);
        const backgroundColors = ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#6366F1', '#EC4899']; // More colors
        const borderColors = isDarkMode ? ['#DC2626', '#D97706', '#047857', '#2563EB', '#4F46E5', '#BE185D'] : backgroundColors;

        return {
            labels,
            datasets: [
                {
                    data,
                    backgroundColor: backgroundColors.slice(0, labels.length),
                    borderColor: borderColors.slice(0, labels.length),
                    borderWidth: 1,
                },
            ],
        };
    })();

    const industryOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    color: isDarkMode ? 'rgb(156 163 175)' : 'rgb(55 65 81)',
                },
            },
            title: {
                display: true,
                text: 'Portfolio Industry Distribution',
                color: isDarkMode ? 'rgb(249 250 251)' : 'rgb(55 65 81)',
                font: {
                    size: 18,
                    weight: 'bold',
                },
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
                            label += `${context.parsed} companies`;
                        }
                        return label;
                    }
                }
            },
        },
    };

    // Array of all the graphs we want to cycle through
    // Each object contains the component, its data, and its options
    const portfolioGraphs = [
        {
            component: Line,
            data: portfolioValueChartData,
            options: {
                ...portfolioValueChartOptions,
                plugins: {
                    ...portfolioValueChartOptions.plugins,
                    title: {
                        ...portfolioValueChartOptions.plugins.title,
                        text: 'Portfolio Value Over Time',
                    },
                },
            },
        },
        {
            component: Doughnut, // Changed from Bar to Doughnut for Investment Breakdown
            data: investmentBreakdownChartData,
            options: {
                ...investmentBreakdownChartOptions,
                plugins: {
                    ...investmentBreakdownChartOptions.plugins,
                    title: {
                        ...investmentBreakdownChartOptions.plugins.title,
                        text: 'Investment Stage Breakdown',
                    },
                },
            },
        },
        {
            component: Bar, // Changed from Pie to Bar for Deal Flow Stages
            data: dealStageChartData,
            options: {
                ...dealStageChartOptions,
                plugins: {
                    ...dealStageChartOptions.plugins,
                    title: {
                        ...dealStageChartOptions.plugins.title,
                        text: 'Deal Flow Stages',
                    },
                },
            },
        },
        {
            component: Bar,
            data: fundingStageData,
            options: {
                ...fundingStageOptions,
                plugins: {
                    ...fundingStageOptions.plugins,
                    title: {
                        ...fundingStageOptions.plugins.title,
                        text: 'Portfolio Companies by Funding Stage',
                    },
                },
            },
        },
        {
            component: Doughnut,
            data: industryData,
            options: {
                ...industryOptions,
                plugins: {
                    ...industryOptions.plugins,
                    title: {
                        ...industryOptions.plugins.title,
                        text: 'Portfolio Industry Distribution',
                    },
                },
            },
        },
    ];

    // EFFECT HOOK: To cycle through the graphs with a delay
    useEffect(() => {
        // Only start the cycle if there's more than one graph
        if (portfolioGraphs.length > 1) {
            const timer = setTimeout(() => {
                setCurrentGraphIndex((prevIndex) =>
                    (prevIndex + 1) % portfolioGraphs.length
                );
            }, 4000); // 4-second delay

            // Cleanup function to clear the timeout if the component unmounts
            // or if the effect re-runs (e.g., if isDarkMode changes)
            return () => clearTimeout(timer);
        }
    }, [currentGraphIndex, portfolioGraphs.length]); // Dependencies for useEffect

    // Get the current graph to display
    const CurrentGraphComponent = portfolioGraphs[currentGraphIndex].component;
    const currentGraphData = portfolioGraphs[currentGraphIndex].data;
    const currentGraphOptions = portfolioGraphs[currentGraphIndex].options;


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
                    {/* Section: Overall Portfolio Performance (Now dynamically displaying graphs) */}
                    <div className="bg-white dark:bg-gray-850 p-7 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-5 flex items-center">
                            <BarChart2 className="mr-3 text-green-600 dark:text-green-400" size={26} />
                            Overall Portfolio Performance
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-6">
                            Track the aggregate growth and breakdown of your investments over time.
                        </p>
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-5 h-80 flex items-center justify-center text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-gray-600 relative">
                            {/* Render ONLY the current graph, forcing re-render with key */}
                            <div className="w-full h-full transition-opacity duration-700 ease-in-out opacity-100">
                                <CurrentGraphComponent 
                                    key={currentGraphIndex} // Crucial: forces component remount on index change
                                    data={currentGraphData} 
                                    options={currentGraphOptions} 
                                />
                            </div>
                            
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                {portfolioGraphs.map((_, index) => (
                                    <span
                                        key={`dot-${index}`} // Unique key for dots
                                        className={`block w-3 h-3 rounded-full ${
                                            currentGraphIndex === index ? 'bg-green-600 dark:bg-green-400' : 'bg-gray-300 dark:bg-gray-600'
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

                    {/* The individual sections for Portfolio Companies, Funding Stages, Industry Distribution
                        are now effectively 'removed' from being separate top-level sections
                        and their charts are integrated into the main 'Overall Portfolio Performance' section.
                        You can remove these div blocks if you truly want to *only* display them in the
                        rotating 'Overall Portfolio Performance' section.
                        I'm commenting them out for now, assuming you want to consolidate.
                        If you want them to remain as separate, static sections AND be part of the rotation,
                        we'd need a different approach (e.g., duplicate the chart components).
                    */}
                    {/* NEW: Section: Portfolio Companies (Table - remains as a separate detail) */}
                    <div className="bg-white dark:bg-gray-850 p-7 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-5 flex items-center">
                            <Building className="mr-3 text-cyan-600 dark:text-cyan-400" size={26} />
                            Your Portfolio Companies
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-6">
                            An overview of your current active investments.
                        </p>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-800">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Company
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Industry
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Stage
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Invested
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Current Value
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Next Round
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-850 divide-y divide-gray-200 dark:divide-gray-700">
                                    {portfolioCompanies.map((company) => (
                                        <tr key={company.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                                {company.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                {company.industry}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                {company.stage}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                ${company.invested.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                ${company.current.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
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
                            <Building className="mr-2" size={20} />
                            Manage Portfolio Companies
                        </Link>
                    </div>
                </div>

                {/* Sidebar Content Area - Col 3 */}
                <div className="lg:col-span-1 space-y-8">
                    {/* Section: Quick Sec (Redesigned with new items) */}
<div className="bg-white dark:bg-gray-850 p-7 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-5 flex items-center">
        <PlusCircle className="mr-3 text-blue-600 dark:text-blue-400" size={26} />
        Quick Sec
    </h3>
    <div className="space-y-4">
        {/* Item 1: Profile */}
        <Link
            to="/profile"
            className="flex items-center px-4 py-3 bg-blue-50 dark:bg-gray-700 rounded-lg shadow-sm hover:bg-blue-100 dark:hover:bg-gray-600 transition-colors duration-200 text-gray-800 dark:text-white font-medium"
        >
            <User className="mr-3 text-blue-600 dark:text-blue-400" size={20} />
            Profile
        </Link>

        {/* Item 2: New Opportunity */}
        <Link
            to="/new-opportunity"
            className="flex items-center px-4 py-3 bg-green-50 dark:bg-gray-700 rounded-lg shadow-sm hover:bg-green-100 dark:hover:bg-gray-600 transition-colors duration-200 text-gray-800 dark:text-white font-medium"
        >
            <Briefcase className="mr-3 text-green-600 dark:text-green-400" size={20} />
            New Opportunity
        </Link>

        {/* Item 3: Add Deals */}
        <Link
            to="/add-deals"
            className="flex items-center px-4 py-3 bg-purple-50 dark:bg-gray-700 rounded-lg shadow-sm hover:bg-purple-100 dark:hover:bg-gray-600 transition-colors duration-200 text-gray-800 dark:text-white font-medium"
        >
            <Handshake className="mr-3 text-purple-600 dark:text-purple-400" size={20} />
            Add Deals
        </Link>

        {/* Item 4: Settings */}
        <Link
            to="/settings"
            className="flex items-center px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 text-gray-800 dark:text-white font-medium"
        >
            <Settings className="mr-3 text-gray-600 dark:text-gray-400" size={20} />
            Settings
        </Link>
         {/* New Item: Help/FAQ */}
        <Link
            to="/faq" // Link to your FAQ page
            className="flex items-center px-4 py-3 bg-yellow-50 dark:bg-gray-700 rounded-lg shadow-sm hover:bg-yellow-100 dark:hover:bg-gray-600 transition-colors duration-200 text-gray-800 dark:text-white font-medium"
        >
            <HelpCircle className="mr-3 text-yellow-600 dark:text-yellow-400" size={20} />
            Help & FAQ
        </Link>
    </div>
</div>

                    {/* Section: Recent Activity */}
                    <div className="bg-white dark:bg-gray-850 p-7 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-5 flex items-center">
                            <Globe className="mr-3 text-orange-600 dark:text-orange-400" size={26} />
                            Recent Activity
                        </h3>
                        <ul className="space-y-4">
                            {recentActivity.map((activity) => (
                                <li key={activity.id} className="flex items-start bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                                    <div className="flex-shrink-0 mr-4 mt-1">
                                        {activity.icon}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800 dark:text-white">{activity.type}</p>
                                        <p className="text-sm text-gray-700 dark:text-gray-300">{activity.description}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <Link
                            to="/activity-log"
                            className="mt-6 w-full px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-200 shadow-md flex items-center justify-center text-center"
                        >
                            <Eye className="mr-2" size={20} />
                            View All Activity
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvestorDashboard;