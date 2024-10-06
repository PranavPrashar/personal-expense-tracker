import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TotalExpenses from "../components/TotalExpenses";
import axios from "axios";
import DeleteModal from "../components/DeleteModal";

import { motion, AnimatePresence } from "framer-motion";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page

  // State to track whether the filter section is open or closed
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    // Fetch the expenses from the server
    axios
      .get("http://localhost:3001/expenses")
      .then((response) => setExpenses(response.data))
      .catch((error) => console.error(error));
  }, []);

  const clearFilters = () => {
    setSelectedCategory("All");
    setStartDate("");
    setEndDate("");
  };

  // Filter Logic
  const filteredExpenses = expenses.filter((expense) => {
    // Filter by category
    if (selectedCategory !== "All" && expense.category !== selectedCategory) {
      return false;
    }

    // Filter by start date
    if (startDate && new Date(expense.date) < new Date(startDate)) {
      return false;
    }

    // Filter by end date
    if (endDate && new Date(expense.date) > new Date(endDate)) {
      return false;
    }

    return true;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentExpenses = filteredExpenses.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleDelete = (expenseId) => {
    setIsModalOpen(true);
    setSelectedExpenseId(expenseId);
  };

  const confirmDelete = () => {
    axios
      .delete(`http://localhost:3001/expenses/${selectedExpenseId}`)
      .then(() => {
        setExpenses(
          expenses.filter((expense) => expense.id !== selectedExpenseId)
        );
        setIsModalOpen(false);
      })
      .catch((err) => {
        console.log("Something went wrong!", err);
      });
  };

  return (
    <div className="container mx-auto p-6">
      {/* Summary Section */}
      <div className="mb-6">
        <TotalExpenses
          total={filteredExpenses.reduce(
            (total, expense) => total + (parseFloat(expense.amount) || 0),
            0
          )}
          expenseData={filteredExpenses}
        />

        {/* Filter Section with Toggle */}
        {/* Filter Section with Toggle */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Filter Expenses</h2>
            {/* Toggle Button for Filter Section */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="text-gray-600 focus:outline-none"
            >
              {isFilterOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 18.75 7.5-7.5 7.5 7.5"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 12.75 7.5-7.5 7.5 7.5"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Animate Filter Controls */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mt-4"
              >
                <div className="mb-4">
                  {/* Category Filter */}
                  <label className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    className="mt-1 block w-full p-2 border rounded-md"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="All">All Categories</option>
                    <option value="Food">Food</option>
                    <option value="Rent">Rent</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Transportation">Transportation</option>
                    {/* Add more categories as needed */}
                  </select>
                </div>

                <div className="mb-4">
                  {/* Start Date Filter */}
                  <label className="block text-sm font-medium text-gray-700">
                    Start Date
                  </label>
                  <input
                    type="date"
                    className="mt-1 block w-full p-2 border rounded-md"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    max={endDate}
                  />
                </div>

                <div className="mb-4">
                  {/* End Date Filter */}
                  <label className="block text-sm font-medium text-gray-700">
                    End Date
                  </label>
                  <input
                    type="date"
                    className="mt-1 block w-full p-2 border rounded-md"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate}
                  />
                </div>

                {(selectedCategory !== "All" || startDate || endDate) && (
                  <button
                    onClick={clearFilters}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-500"
                  >
                    Clear Filters
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Recent Expenses Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 overflow-x-auto">
          <h2 className="text-xl font-bold mb-4">Recent Expenses</h2>
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentExpenses.length > 0 ? (
                currentExpenses.map((expense) => (
                  <tr key={expense.id}>
                    <td className="border px-4 py-2">{expense.date}</td>
                    <td className="border px-4 py-2">{expense.category}</td>
                    <td className="border px-4 py-2">${expense.amount}</td>
                    <td className="border px-4 py-2">{expense.description}</td>
                    <td className="border px-4 py-2 flex items-center justify-center">
                      {/* Edit button */}
                      <motion.div
                        whileHover={{ scale: 1.1 }} // Scale up on hover
                        whileTap={{ scale: 0.9 }} // Scale down on click (tap)
                        initial={{ opacity: 0 }} // Initial state
                        animate={{ opacity: 1 }} // Animate when the button first appears
                        transition={{ duration: 0.3 }} // Smooth transition
                      >
                        <Link
                          to={`/edit/${expense.id}`}
                          className="bg-blue-600 text-white p-2 rounded-full mr-2 text-center flex items-center justify-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                            />
                          </svg>
                        </Link>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.1 }} // Scale up on hover
                        whileTap={{ scale: 0.9 }} // Scale down on click (tap)
                        initial={{ opacity: 0 }} // Initial state
                        animate={{ opacity: 1 }} // Animate when the button first appears
                        transition={{ duration: 0.3 }} // Smooth transition
                      >
                        {/* Delete button */}
                        <button
                          onClick={() => {
                            handleDelete(expense.id);
                          }}
                          className="bg-red-600 text-white p-2 rounded-full text-center flex items-center justify-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </motion.div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  No expenses to display. Start adding expenses to track your
                  spending!
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="pagination-controls flex justify-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>

          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 mx-1 rounded ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 mx-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Add New Expense Button */}
      <div className="text-right">
        <Link
          to="/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-500"
        >
          Add New Expense
        </Link>
      </div>

      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default Dashboard;
