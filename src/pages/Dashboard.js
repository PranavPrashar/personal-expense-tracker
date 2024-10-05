// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TotalExpenses from '../components/TotalExpenses';

import axios from 'axios';

const Dashboard = () => {
  // Example data (in a real app, you'd fetch this from state or a backend)
//   const expenses = [
//     { id: 1, date: '2024-01-15', category: 'Food', description: 'Groceries', amount: 50 },
//     { id: 2, date: '2024-01-16', category: 'Transportation', description: 'Bus Ticket', amount: 3 },
//     { id: 3, date: '2024-01-17', category: 'Entertainment', description: 'Movie Ticket', amount: 12 },
//   ];

  const [expenses, setExpenses] = useState([]);


  useEffect(()=>{
    axios.get("http://localhost:3001/expenses").then((response)=>{
        console.log(response.data)
        setExpenses(response.data)
    })
  },[])

  // Calculate total expenses
  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);

  return (
    <div className="container mx-auto p-6">
      {/* Summary Section */}
      <TotalExpenses total={totalExpenses}/>

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
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td className="border px-4 py-2">{expense.date}</td>
                <td className="border px-4 py-2">{expense.category}</td>
                <td className="border px-4 py-2">{expense.description}</td>
                <td className="border px-4 py-2">${expense.amount}</td>
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
