import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  // State to manage the mobile menu toggle
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className="bg-primary p-4 shadow-md sticky top-0 z-50"
      aria-label="Main navigation"
    >
      <div className="container mx-auto flex flex-col md:flex-row md:justify-between md:items-center">
        {/* Logo / Brand Name */}
        <div className="text-white text-2xl font-bold flex flex-row w-full justify-between items-center">
          <Link to="/" aria-label="Go to Home">
            Expense Tracker
          </Link>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-white focus:outline-none"
              aria-controls="navbar-menu" 
              aria-expanded={isOpen} 
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
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
                  d={
                    isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu button (hamburger) */}
        <div
          id="navbar-menu" 
          className={`md:flex md:flex-row w-full justify-end space-x-4 ${
            isOpen ? "flex flex-col items-center" : "hidden"
          } md:block`}
          role="menu" 
        >
          <Link
            to="/"
            className="text-white hover:text-accent px-3 py-2 rounded-md block md:inline"
            role="menuitem" // Each link as a menu item
            aria-label="Go to Home page"
          >
            Home
          </Link>
          <Link
            to="/add"
            className="text-white hover:text-accent px-3 py-2 rounded-md block md:inline"
            role="menuitem"
            aria-label="Go to Add Expense page"
          >
            Add Expense
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
