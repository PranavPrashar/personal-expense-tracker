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

  const apiUrl = process.env.REACT_APP_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    // Create a new expense object

    if (!description) newErrors.description = 'Description is required';
    if (!amount || parseFloat(amount) <= 0) newErrors.amount = 'Valid amount is required';
    if (!category) newErrors.category = 'Category is required';
    if (!paymentMethod) newErrors.paymentMethod = 'Payment method is required';
    if (!date) newErrors.date = 'Date is required';

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
      await axios.post(`${apiUrl}/expenses`, newExpense);
      navigate('/'); // Redirect back to the dashboard after submission
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-clouds rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Add New Expense</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 required" htmlFor="description">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full rounded-lg"
            placeholder="Expense description"
            aria-required="true"
            id="description"
          />
          {errors.description && <p className="text-red-500">{errors.description}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 required" htmlFor="amount">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border p-2 w-full rounded-lg"
            placeholder="Enter amount"
            min={0}
            aria-required="true"
            id="amount"
          />
          {errors.amount && <p className="text-red-500">{errors.amount}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 required" htmlFor="category">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 w-full rounded-lg"
            aria-required="true"
            id="category"
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Rent">Rent</option>
            <option value="Transportation">Transportation</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
          {errors.category && <p className="text-red-500">{errors.category}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 required" htmlFor="payment">Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="border p-2 w-full rounded-lg"
            id="payment"
            aria-required="true"
          >
            <option value="">Select Payment Method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Cash">Cash</option>
            <option value="Debit Card">Debit Card</option>
          </select>
          {errors.paymentMethod && <p className="text-red-500">{errors.paymentMethod}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 required" htmlFor="date">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 w-full rounded-lg"
            aria-required="true"
            max={new Date().toISOString().split("T")[0]}
            id="date"
          />
          {errors.date && <p className="text-red-500">{errors.date}</p>}
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded-lg shadow hover:bg-primarylight"
            aria-label="Submit and add expense"
          >
            Add Expense
          </button>
          <button
            type="button"
            className="bg-gray-600 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-500"
            onClick={() => navigate('/')}
            aria-label="Cancel and go back to dashboard"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddExpense;
