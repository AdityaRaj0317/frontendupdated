// src/pages/layouts/AuthLayout.jsx

import React, { useState, useEffect } from 'react'; // Added useEffect for potential responsive sidebar logic

// Corrected import paths: go up two levels from 'src/pages/layouts' to 'src', then into 'components'
import AuthNavbar from '../../components/AuthNavbar';
import Sidebar from '../../components/Sidebar';

const AuthLayout = ({ children }) => {
  // Manage sidebar state locally within AuthLayout
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768); // Default open on desktop

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

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Pass isOpen and toggleSidebar to Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          // This margin adjusts based on sidebar state for desktop
          isSidebarOpen ? 'ml-64 md:ml-64' : 'ml-0 md:ml-20' // Removed 'md:ml-64' from ml-0 as it was redundant
        }`}
      >
        {/* Pass toggleSidebar to AuthNavbar */}
        <AuthNavbar toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-6 mt-16 overflow-y-auto"> {/* mt-16 for navbar height */}
          {children}
        </main>
      </div>
    </div>
  );
};

export default AuthLayout;
