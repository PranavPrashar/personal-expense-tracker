// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import TotalExpenses from '../components/TotalExpenses';
import axios from 'axios';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    // Fetch the expenses from the server
    axios.get('http://localhost:3001/expenses')
      .then((response) => setExpenses(response.data))
      .catch((error) => console.error(error));
  }, []);

  // Calculate total expenses
  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);

  return (
    <div className="container mx-auto p-6">
      {/* Summary Section */}
      <TotalExpenses total={totalExpenses} />

      {/* Recent Expenses Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold mb-4">Recent Expenses</h2>
        <table className="min-w-full table-auto">
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
                <td className="border px-4 py-2 flex items-center justify-center">
                  {/* Edit button */}
                  <Link
                    to={`/edit/${expense.id}`}
                    className="bg-blue-600 text-white px-3 py-1 rounded mr-2 w-20 text-center"
                  >
                    Edit
                  </Link>
                  
                  {/* Delete button */}
                  <Link
                    to={`/delete/${expense.id}`}
                    className="bg-red-600 text-white px-3 py-1 rounded w-20 text-center"
                  >
                    Delete
                  </Link>
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
    </div>
  );
};

export default Dashboard;
