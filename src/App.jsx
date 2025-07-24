// src/App.jsx - FINAL CORRECTED REPLACEMENT CODE for Redirection
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Import your Navbar components
import GuestNavbar from './components/GuestNavbar';
import FullPageSpinner from './components/FullPageSpinner';
// Import the AuthLayout from its actual location
import AuthLayout from './pages/layouts/AuthLayout';

// Import all your page components
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ExploreOpportunities from './pages/ExploreOpportunities';
import Startups from './pages/Startups';
import StartupDetail from './pages/StartupDetail';
import SubmitPitch from './pages/SubmitPitch';
import Notifications from './pages/Notifications';
import RateStartup from './pages/RateStartup';
import CreateStartup from './pages/CreateStartup';
import AdminUsers from './pages/admin/Users';
import AdminActivity from './pages/admin/Activity';
import InvestorDeck from './pages/InvestorDeck';
import Messages from './pages/Messages';
import Profile from './pages/Profile';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import ExploreInvestors from './pages/ExploreInvestors';
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
import DashboardHome from './pages/dashboard/DashboardHome';

/**
 * This component acts purely as a "Protected Route Wrapper" that checks authentication status.
 * It will then render AuthLayout, which provides the actual visual layout (with sidebar).
 */
const AuthenticatedRouteWrapper = () => {
    const { user, loading } = useAuth();
    const location = useLocation();

    // Show a full page spinner while authentication status is being determined
    if (loading) {
        return <FullPageSpinner />;
    }

    // Redirect unauthenticated users to login page
    if (!user) {
        console.log(`AuthenticatedRouteWrapper: User not found, redirecting to /login from ${location.pathname}`);
        return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }

    // This wrapper is for routes that *should* have the sidebar.
    // The /home-dashboard route is handled separately and does NOT use this wrapper.
    console.log('--- App.jsx Debugging User Role in AuthenticatedRouteWrapper ---');
    console.log('Current user object:', user);
    console.log('User role from AuthContext:', user?.role);
    console.log('Current Path (in AuthenticatedRouteWrapper):', location.pathname);
    console.log('--- End App.jsx Debugging ---');

    return (
        <AuthLayout>
            <Outlet /> {/* Renders the specific page component for the matched nested route */}
        </AuthLayout>
    );
};

/**
 * Layout for public (guest) users, includes GuestNavbar.
 * Handles initial redirection for authenticated users.
 */
const PublicLayout = () => {
    const { user } = useAuth();
    const location = useLocation();

    // REDIRECTION LOGIC FOR AUTHENTICATED USERS AWAY FROM PUBLIC ROUTES
    // This now correctly redirects based on role for initial landing.
    if (user && (location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/forgot-password' || location.pathname === '/explore' || location.pathname === '/')) {
        console.log(`PublicLayout: User authenticated, redirecting from ${location.pathname} to dashboard based on role`);
        if (user.role === 'founder') {
            return <Navigate to="/home-dashboard" replace />; // Founders always go to full-screen DashboardHome
        }
        // Investors and Admins go to their sidebar-equipped dashboard initially
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

    if (loading) {
        return <FullPageSpinner />;
    }

    return (
        <Routes>
            {/* Public routes wrapped by PublicLayout */}
            <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/explore" element={<ExploreOpportunities />} />
            </Route>

            {/* DashboardHome - This is the special full-screen route for ALL authenticated users
                when they explicitly navigate to it (e.g., via sidebar "Home" link).
                It is NOT wrapped by AuthLayout, so no sidebar here.
            */}
            <Route
                path="/home-dashboard"
                element={user ? <DashboardHome /> : <Navigate to="/login" replace />}
            />

            {/* Authenticated/Protected routes wrapped by the AuthenticatedRouteWrapper (these will have sidebar) */}
            <Route element={<AuthenticatedRouteWrapper />}>
                {/* Default dashboard for investor/admin, or a general dashboard with sidebar */}
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
                <Route path="/admin/startups" element={user?.role === 'admin' ? <SubmitPitch /> : <Navigate to="/dashboard" replace />} />
                <Route path="/admin/investments" element={user?.role === 'admin' ? <InvestorDeck /> : <Navigate to="/dashboard" replace />} />

                {/* Fallback for protected routes */}
                <Route path="*" element={<div className="text-center text-xl font-bold mt-10">Protected Route: 404 Not Found or Unauthorized Access</div>} />
            </Route>

            {/* Catch-all for any other routes not matched */}
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