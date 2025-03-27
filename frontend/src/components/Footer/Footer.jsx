import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className="w-full p-6 sm:p-10 relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white shadow-md border-t border-gray-600/50"
     
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8 text-center md:text-left relative z-10">
        {/* Logo and Navigation Links */}
        <div className="flex flex-col items-center md:items-start gap-6">
          <div className="text-2xl font-bold text-blue-400 drop-shadow-md">
            <Link to="/">TechTrend</Link>
          </div>
          <div className="flex flex-wrap justify-center md:justify-start gap-6 sm:gap-8">
            <Link
              to="/"
              className="text-gray-300 hover:text-blue-400 text-sm sm:text-base font-medium transition-colors duration-300 relative group"
            >
              Home
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="/explore"
              className="text-gray-300 hover:text-blue-400 text-sm sm:text-base font-medium transition-colors duration-300 relative group"
            >
              Explore
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="/about"
              className="text-gray-300 hover:text-blue-400 text-sm sm:text-base font-medium transition-colors duration-300 relative group"
            >
              About
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-4">
          <h1 className="text-xl sm:text-2xl font-semibold text-blue-400 drop-shadow-md">
            Reach Us
          </h1>
          <p className="text-gray-300 text-sm sm:text-base">
            Email:{" "}
            <a
              href="mailto:manjeet@768"
              className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
            >
              manjeet@768
            </a>
          </p>
          <p className="text-gray-300 text-sm sm:text-base">
            Contact No.:{" "}
            <a
              href="tel:+916287773228"
              className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
            >
              +91 62877 73228
            </a>
          </p>
        </div>

        {/* Copyright Info */}
        <div className="flex flex-col gap-2 text-center md:text-right">
          <p className="text-gray-400 text-sm sm:text-base drop-shadow-sm">
            Copyright © 2024 TechTrend
          </p>
          <p className="text-gray-400 text-sm sm:text-base drop-shadow-sm">
            Content owned, maintained, and updated by TechTrend Team
          </p>
          <p className="text-gray-400 text-sm sm:text-base drop-shadow-sm">
            Designed & Developed by: TechTrend
          </p>
        </div>
      </div>

      {/* Animated Accents */}
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-float-slow"></div>
    </footer>
  );
};

export default Footer;