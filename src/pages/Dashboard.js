// src/pages/Dashboard.js
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import TotalExpenses from "../components/TotalExpenses";
import axios from "axios";

import DeleteModal from "../components/DeleteModal";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);

  useEffect(() => {
    // Fetch the expenses from the server
    axios
      .get("http://localhost:3001/expenses")
      .then((response) => setExpenses(response.data))
      .catch((error) => console.error(error));
  }, []);

  // Calculate total expenses

  const totalExpenses = expenses.reduce((total, expense) => {
    // Summing 'amount' of each expense, ensuring it's a number with parseFloat(), and defaulting to 0 if invalid or missing.
    return total + (parseFloat(expense.amount) || 0);
  }, 0);

  const handleDelete = (expenseId) => {
    setIsModalOpen(true);
    setSelectedExpenseId(expenseId);
  };

  const confirmDelete = () => {
    axios
      .delete(`http://localhost:3001/expenses/${selectedExpenseId}`)
      .then((response) => {
        console.log("response", response);
        setExpenses(expenses.filter((expense)=>{
            // filted out the expenses and return only ones which are not the same as the id we deleted
            return expense.id != selectedExpenseId;
        }))
        setIsModalOpen(false);
      })
      .catch((err) => {
        console.log("Something went wrong!", err);
      });
  };

  return (
    <div className="container mx-auto p-6">
      {/* Summary Section */}
      <TotalExpenses total={totalExpenses} />

      {/* Recent Expenses Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6 overflow-x-auto">
        <h2 className="text-xl font-bold mb-4">Recent Expenses</h2>
        <table className="min-w-full table-auto ">
          <thead>
            <tr>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td className="border px-4 py-2">{expense.date}</td>
                <td className="border px-4 py-2">{expense.category}</td>
                <td className="border px-4 py-2">{expense.description}</td>
                <td className="border px-4 py-2">${expense.amount}</td>
                <td className="border px-4 py-2  flex items-center justify-center">
                  {/* Edit button */}
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
