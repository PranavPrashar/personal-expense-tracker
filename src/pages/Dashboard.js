// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import TotalExpenses from '../components/TotalExpenses';
import axios from 'axios';

import DeleteModal from '../components/DeleteModal';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);

  useEffect(() => {
    // Fetch the expenses from the server
    axios.get('http://localhost:3001/expenses')
      .then((response) => setExpenses(response.data))
      .catch((error) => console.error(error));
  }, []);

  // Calculate total expenses

  const totalExpenses = expenses.reduce((total, expense) => {
    // Summing 'amount' of each expense, ensuring it's a number with parseFloat(), and defaulting to 0 if invalid or missing.
    return total + (parseFloat(expense.amount) || 0);
  }, 0);

  const handleDelete = (expenseId) =>{
    setIsModalOpen(true)
    setSelectedExpenseId(expenseId)
  }

  const confirmDelete = () =>{
    axios.delete(`http://localhost:3001/expenses/${selectedExpenseId}`).then((response)=>{
        console.log("response", response)
        setIsModalOpen(false);
    }).catch((err)=>{
        console.log("Something went wrong!", err)
    })
  }

  return (
    <div className="container mx-auto p-6">
      {/* Summary Section */}
      <TotalExpenses total={totalExpenses} />
      
      <p>{selectedExpenseId}</p>

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
                <td className="border px-4 py-2 flex items-center justify-center">
                  {/* Edit button */}
                  <Link
                    to={`/edit/${expense.id}`}
                    className="bg-blue-600 text-white px-3 py-1 rounded mr-2 w-20 text-center"
                  >
                    Edit
                  </Link>
                  
                  {/* Delete button */}
                  <button
                    onClick={()=>{handleDelete(expense.id)}}
                    className="bg-red-600 text-white px-3 py-1 rounded w-20 text-center"
                  >
                    Delete
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
