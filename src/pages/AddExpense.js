import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddExpense = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [date, setDate] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    // Create a new expense object

    if (!description) newErrors.description = 'Description is required';
    if (!amount || parseFloat(amount) <= 0) newErrors.amount = 'Valid amount is required';

    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
    }

    const newExpense = {
      description,
      amount: parseFloat(amount),
      category,
      paymentMethod,
      date,
    };
    

    // Send the new expense to the server
    try {
      await axios.post('http://localhost:3001/expenses', newExpense);
      navigate('/'); // Redirect back to the dashboard after submission
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Expense</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="description">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full rounded-lg"
            placeholder="Expense description"
            id="description"
          />
          {errors.description && <p className="text-red-500">{errors.description}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="amount">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border p-2 w-full rounded-lg"
            placeholder="Enter amount"
            min={0}
            id="amount"
          />
          {errors.amount && <p className="text-red-500">{errors.amount}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="category">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 w-full rounded-lg"
            id="category"
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Transportation">Transportation</option>
            <option value="Entertainment">Entertainment</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="payment">Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="border p-2 w-full rounded-lg"
            id="payment"
          >
            <option value="">Select Payment Method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Cash">Cash</option>
            <option value="Debit Card">Debit Card</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="date">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 w-full rounded-lg"
            id="date"
          />
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-500"
          >
            Add Expense
          </button>
          <button
            type="button"
            className="bg-gray-600 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-500"
            onClick={() => navigate('/')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddExpense;
