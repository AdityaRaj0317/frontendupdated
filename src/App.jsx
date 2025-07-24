// src/App.jsx - FINAL CORRECTED & VERIFIED for Routing and Imports + DEBUG LOGS
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Import your Navbar components
import GuestNavbar from './components/GuestNavbar';
import AuthNavbar from './components/AuthNavbar';
import Sidebar from './components/Sidebar';
import FullPageSpinner from './components/FullPageSpinner';

// Import all your page components (ensure no duplicates)
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Startups from './pages/Startups';
import StartupDetail from './pages/StartupDetail';
import SubmitPitch from './pages/SubmitPitch'; // Single import
import Notifications from './pages/Notifications';
import RateStartup from './pages/RateStartup';
import CreateStartup from './pages/CreateStartup';
import AdminUsers from './pages/admin/Users';
import AdminActivity from './pages/admin/Activity';
import InvestorDeck from './pages/InvestorDeck'; // Single import
import Messages from './pages/Messages';
import Profile from './pages/Profile';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import ExploreInvestors from './pages/ExploreInvestors'; // Corrected capitalization based on convention
import AddStartup from './pages/AddStartup';
import Settings from './pages/Settings';
import ChangePassword from './pages/settings/ChangePassword';
import ChangeEmail from './pages/settings/ChangeEmail';
import ChangeUsername from './pages/settings/ChangeUsername';
import UpdateProfilePicture from './pages/settings/UpdateProfilePicture';
import NotificationSettings from './pages/settings/NotificationSettings';
import PrivacySettings from './pages/settings/PrivacySettings';
import DeleteAccount from './pages/settings/DeleteAccount';

// Dashboard components
import DashboardInstructions from './pages/dashboard/DashboardInstructions';
import DashboardHome from './pages/dashboard/DashboardHome'; // Keeping if it's a separate generic dashboard intro


// Constants for layout dimensions (adjust these as needed)
const SIDEBAR_WIDTH_DESKTOP = '64'; // w-64 = 16rem = 256px
const NAVBAR_HEIGHT = '16'; // h-16 = 4rem = 64px

/**
 * Layout for authenticated users, includes Sidebar and AuthNavbar.
 */
const AuthenticatedLayout = ({ toggleSidebar, isSidebarOpen, sidebarWidthDesktop, navbarHeight }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    // Show a full page spinner while authentication status is being determined
    if (loading) {
        return <FullPageSpinner />;
    }

    // Redirect unauthenticated users to login page
    // This acts as your primary ProtectedRoute wrapper
    if (!user) {
        console.log(`AuthenticatedLayout: User not found, redirecting to /login from ${location.pathname}`);
        return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }

    // >>> DEBUGGING LOGS <<<
    console.log('--- App.jsx Debugging User Role in AuthenticatedLayout ---');
    console.log('Current user object:', user);
    console.log('User role from AuthContext:', user?.role);
    console.log('Current Path (in AuthenticatedLayout):', location.pathname);
    console.log('--- End App.jsx Debugging ---');


    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white overflow-hidden">
            {/* Sidebar component - fixed on desktop, overlay on mobile */}
            <Sidebar
                isOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
                sidebarWidthDesktop={sidebarWidthDesktop}
                navbarHeight={navbarHeight}
            />

            {/* Main content area, including AuthNavbar */}
            <div
                className={`
                    flex-1 flex flex-col min-h-screen
                    transition-all duration-300
                    md:ml-[16rem] /* Desktop: Margin-left creates space for the sidebar */
                `}
            >
                {/* AuthNavbar - now a child of the main content area, so it's pushed by the sidebar */}
                <AuthNavbar
                    toggleSidebar={toggleSidebar}
                    navbarHeight={navbarHeight}
                />

                {/* Page content */}
                <main className={`flex-1 p-6 overflow-y-auto pt-${navbarHeight}`}>
                    <Outlet /> {/* Renders the specific page component */}
                </main>
            </div>
        </div>
    );
};

/**
 * Layout for public (guest) users, includes GuestNavbar.
 */
const PublicLayout = () => {
    const { user } = useAuth();
    const location = useLocation();

    // Redirect authenticated users from typical public entry points (login, register, forgot-password) to dashboard
    if (user && (location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/forgot-password')) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <GuestNavbar />
            <main className="pt-16"> {/* Use padding-top to ensure content starts below the fixed GuestNavbar */}
                <Outlet /> {/* Renders the specific public page component */}
            </main>
        </div>
    );
};

/**
 * Main AppContent component to handle routing logic and layouts.
 */
const AppContent = () => {
    const { user, loading } = useAuth();
    // Initialize sidebar state based on screen width
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) { // Tailwind's 'md' breakpoint
                setIsSidebarOpen(true); // Ensure sidebar is always open on desktop
            } else {
                setIsSidebarOpen(false); // Default to closed on mobile
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Set initial state
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => {
        // Only allow toggling on mobile. On desktop, it's always open by design.
        if (window.innerWidth < 768) {
            setIsSidebarOpen(!isSidebarOpen);
        }
    };

    if (loading) {
        return <FullPageSpinner />;
    }

    return (
        <Routes>
            {/* Public routes wrapped by PublicLayout */}
            <Route element={<PublicLayout />}>
                <Route
                    path="/"
                    element={user ? <Navigate to="/dashboard" replace /> : <Home />}
                />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
            </Route>
                <Route path="/home-dashboard" element={<DashboardHome />} />
            {/* Authenticated/Protected routes wrapped by AuthenticatedLayout */}
            <Route
                element={
                    <AuthenticatedLayout
                        toggleSidebar={toggleSidebar}
                        isSidebarOpen={isSidebarOpen}
                        sidebarWidthDesktop={SIDEBAR_WIDTH_DESKTOP}
                        navbarHeight={NAVBAR_HEIGHT}
                    />
                }
            >
                {/* Dashboard routes */}
                <Route path="/dashboard" element={<DashboardInstructions />} />
                

                {/* Main application features */}
                <Route path="/startups" element={<Startups />} />
                <Route path="/startups/:id" element={<StartupDetail />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/messages/:userId?" element={<Messages />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/investors" element={<ExploreInvestors />} />

                {/* Founder-specific routes - ensure these are accessible only by 'founder' role */}
                <Route path="/submit-pitch" element={user?.role === 'founder' ? <SubmitPitch /> : <Navigate to="/dashboard" replace />} />
                <Route path="/create-startup" element={user?.role === 'founder' ? <CreateStartup /> : <Navigate to="/dashboard" replace />} />
                <Route path="/add-startup" element={user?.role === 'founder' ? <AddStartup /> : <Navigate to="/dashboard" replace />} />

                {/* Investor-specific routes - ensure these are accessible only by 'investor' role */}
                <Route path="/investor-deck" element={user?.role === 'investor' ? <InvestorDeck /> : <Navigate to="/dashboard" replace />} />
                <Route path="/rate-startups" element={user?.role === 'investor' ? <RateStartup /> : <Navigate to="/dashboard" replace />} />
                {/* New route for "My Investments" for investor role */}
                <Route path="/my-investments" element={user?.role === 'investor' ? <InvestorDeck /> : <Navigate to="/dashboard" replace />} />

                {/* Settings routes */}
                <Route path="/settings" element={<Settings />} />
                <Route path="/settings/username" element={<ChangeUsername />} />
                <Route path="/settings/email" element={<ChangeEmail />} />
                <Route path="/settings/password" element={<ChangePassword />} />
                <Route path="/settings/profile-picture" element={<UpdateProfilePicture />} />
                <Route path="/settings/notifications" element={<NotificationSettings />} />
                <Route path="/settings/privacy" element={<PrivacySettings />} />
                <Route path="/settings/delete" element={<DeleteAccount />} />

                {/* Admin-specific routes */}
                <Route path="/admin/users" element={user?.role === 'admin' ? <AdminUsers /> : <Navigate to="/dashboard" replace />} />
                <Route path="/admin/activity" element={user?.role === 'admin' ? <AdminActivity /> : <Navigate to="/dashboard" replace />} />
+               {/* Admin-specific routes for Startups (redirects to SubmitPitch for now) */}
+               <Route path="/admin/startups" element={user?.role === 'admin' ? <SubmitPitch /> : <Navigate to="/dashboard" replace />} />
+               {/* Admin-specific routes for Investments (redirects to InvestorDeck for now) */}
+               <Route path="/admin/investments" element={user?.role === 'admin' ? <InvestorDeck /> : <Navigate to="/dashboard" replace />} />

                {/* Fallback for protected routes */}
                <Route path="*" element={<div className="text-center text-xl font-bold mt-10">Protected Route: 404 Not Found or Unauthorized Access</div>} />
            </Route>

            {/* Catch-all for any other routes */}
            <Route path="*" element={<div className="text-center text-xl font-bold mt-10">404 Not Found</div>} />
        </Routes>
    );
};

/**
 * Root App component, providing AuthProvider and ThemeProvider context.
 */
const App = () => (
    <Router>
        <AuthProvider>
            <ThemeProvider>
                <AppContent />
            </ThemeProvider>
        </AuthProvider>
    </Router>
);

export default App;