import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  // State to manage the mobile menu toggle
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-primary p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Brand Name */}
        <div className="text-white text-2xl font-bold">
          <Link to="/">Expense Tracker</Link>
        </div>

        {/* Mobile menu button (hamburger) */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div className={`md:flex space-x-4 ${isOpen ? "block" : "hidden"} md:block`}>
          <Link
            to="/"
            className="text-white hover:text-accent px-3 py-2 rounded-md block md:inline"
          >
            Home
          </Link>
          <Link
            to="/add"
            className="text-white hover:text-accent px-3 py-2 rounded-md block md:inline"
          >
            Add Expense
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
