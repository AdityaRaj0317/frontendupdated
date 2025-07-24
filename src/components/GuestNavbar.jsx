// src/components/GuestNavbar.jsx
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom'; // Keep NavLink for other active states
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext'; // Import useTheme

const GuestNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme(); // Get theme and toggleTheme from context

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Define a class for the navigational links, including active state
  const navLinkClass = (isActive) =>
    `text-lg font-medium transition-colors duration-200 ${
      isActive ? 'text-blue-600 dark:text-blue-400' : 'hover:text-blue-500 dark:hover:text-blue-300'
    }`;

  // Define a class for mobile links
  const mobileLinkClass = ({ isActive }) =>
    `block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md text-base font-medium transition-colors duration-200 ${
      isActive ? 'text-blue-600 dark:text-blue-400 bg-gray-100 dark:bg-gray-800' : '' // Added active styling for mobile
    }`;


  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md text-gray-800 dark:text-white shadow-md transition duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Branding */}
        <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-white">
          PitchBridge
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 items-center">
          <NavLink
            to="/"
            className={({ isActive }) => navLinkClass(isActive)}
          >
            Home
          </NavLink>

          {/* EXPLORE: CHANGED TO NAVLINK WITH 'to' PROP */}
          <NavLink
            to="/explore"
            className={({ isActive }) => navLinkClass(isActive)}
          >
            Explore
          </NavLink>

          {/* You might want a separate "About Us" or "How it works" if "Explore" is not the main guest feature */}
          {/* <NavLink
            to="/about"
            className={({ isActive }) => navLinkClass(isActive)}
          >
            About Us
          </NavLink> */}

          <NavLink
            to="/login"
            className={({ isActive }) => navLinkClass(isActive)}
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) => navLinkClass(isActive)}
          >
            Register
          </NavLink>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="ml-2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Mobile Menu Toggle and Dark Mode Button */}
        <div className="md:hidden flex items-center space-x-3">
          <button
            onClick={toggleTheme}
            className="p-1 rounded-full text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
          </button>
          <button
            onClick={toggleMenu}
            className="text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-1"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Links */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 px-4 pt-2 pb-4 space-y-2 border-t border-gray-200 dark:border-gray-700">
          <NavLink to="/" onClick={toggleMenu} className={mobileLinkClass}>Home</NavLink>
          {/* EXPLORE MOBILE: CHANGED TO NAVLINK WITH 'to' PROP */}
          <NavLink to="/explore" onClick={toggleMenu} className={mobileLinkClass}>Explore</NavLink>
          <NavLink to="/login" onClick={toggleMenu} className={mobileLinkClass}>Login</NavLink>
          <NavLink to="/register" onClick={toggleMenu} className={mobileLinkClass}>Register</NavLink>
        </div>
      )}
    </nav>
  );
};

export default GuestNavbar;