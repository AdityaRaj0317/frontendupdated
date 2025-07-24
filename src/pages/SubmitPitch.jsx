import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { API_BASE_URL } from "../config";

// Import Lucide Icons for better visual feedback
import {
  Send,
  CheckCircle,
  XCircle,
  Zap,
} from 'lucide-react';

const SubmitPitch = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    industry: "",
    founder: "",
    website: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false); // New loading state

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(""); // Clear error/success on input change
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setError(""); // Clear previous errors
    setSuccess(""); // Clear previous successes

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to submit a pitch.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/startups`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Pitch submitted successfully! Redirecting...");
        setFormData({
          name: "",
          description: "",
          industry: "",
          founder: "",
          website: "",
        });
        setTimeout(() => navigate("/startups"), 1500); // Redirect to startups page
      } else {
        setError(data.message || "Failed to submit pitch. Please check your inputs.");
      }
    } catch (err) {
      console.error("Error submitting pitch:", err);
      setError("Network error or server is unreachable. Please try again.");
    } finally {
      setLoading(false); // End loading
    }
  };

  // Framer Motion variants for animations
  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const messageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 20 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-950 dark:via-purple-950 dark:to-blue-950 flex items-center justify-center py-10 px-4">
      <motion.div
        className="max-w-2xl w-full mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-white/30 dark:border-gray-700/50"
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-900 dark:text-white flex items-center justify-center">
          <Zap className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
          Submit Your Groundbreaking Pitch
        </h2>

        {/* Message Area */}
        {error && (
          <motion.div
            className="mb-6 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 p-4 rounded-lg flex items-center"
            variants={messageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <XCircle className="h-5 w-5 mr-3 flex-shrink-0" />
            <p className="text-sm md:text-base font-medium">{error}</p>
          </motion.div>
        )}
        {success && (
          <motion.div
            className="mb-6 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 p-4 rounded-lg flex items-center"
            variants={messageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0" />
            <p className="text-sm md:text-base font-medium">{success}</p>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="grid gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Startup Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="e.g., InnovateTech Solutions"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Briefly describe your startup, its mission, and what problem it solves."
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              rows={5}
            />
          </div>

          <div>
            <label htmlFor="industry" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Industry</label>
            <input
              type="text"
              id="industry"
              name="industry"
              placeholder="e.g., FinTech, HealthTech, SaaS, AI"
              value={formData.industry}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>

          <div>
            <label htmlFor="founder" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Founder Name(s)</label>
            <input
              type="text"
              id="founder"
              name="founder"
              placeholder="e.g., Jane Doe, John Smith"
              value={formData.founder}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>

          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Website URL (Optional)</label>
            <input
              type="url"
              id="website"
              name="website"
              placeholder="https://www.yourstartup.com"
              value={formData.website}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>

          <motion.button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold text-lg flex items-center justify-center transition-colors duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white mr-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <Send className="mr-3 h-5 w-5" />
            )}
            {loading ? "Submitting..." : "Submit Pitch"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default SubmitPitch;
