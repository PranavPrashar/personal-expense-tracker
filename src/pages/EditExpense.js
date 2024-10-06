import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "../components/ConfirmModal";

function EditExpense() {
  const { id } = useParams();
  const [errors, setErrors] = useState({});
  const [expense, setExpense] = useState({
    description: "",
    amount: "",
    category: "",
    paymentMethod: "",
    date: "",
  });
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/expenses/${id}`)
      .then((response) => {
        setExpense(response.data);
      })
      .catch((error) => {
        console.error("Error fetching expense:", error);
        navigate("/error");
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!expense.description) newErrors.description = "Description is required";
    if (!expense.amount || parseFloat(expense.amount) <= 0)
      newErrors.amount = "Valid amount is required";
    if (!expense.category) newErrors.category = "Category is required";
    if (!expense.paymentMethod)
      newErrors.paymentMethod = "Payment method is required";
    if (!expense.date) newErrors.date = "Date is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsModalOpen(true);
  };

  const handleConfirmUpdate = async () => {
    setIsModalOpen(false);
    try {
      await axios.put(`http://localhost:3001/expenses/${id}`, expense);
      navigate("/");
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Expense</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="description">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={expense.description}
            onChange={handleChange}
            className="border p-2 w-full rounded-lg"
            placeholder="Expense description"
            aria-required="true"
            id="description"
          />
          {errors.description && (
            <p className="text-red-500" role="alert">
              {errors.description}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="amount">
            Amount
          </label>
          <input
            type="number"
            name="amount"
            value={expense.amount}
            step="0.01"
            onChange={handleChange}
            className="border p-2 w-full rounded-lg"
            placeholder="Enter amount"
            min={0}
            aria-required="true"
            id="amount"
          />
          {errors.amount && (
            <p className="text-red-500" role="alert">
              {errors.amount}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="category">
            Category
          </label>
          <select
            name="category"
            value={expense.category}
            onChange={handleChange}
            className="border p-2 w-full rounded-lg"
            aria-required="true"
            id="category"
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="Food">Food</option>
            <option value="Rent">Rent</option>
            <option value="Transportation">Transportation</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
          {errors.category && (
            <p className="text-red-500" role="alert">
              {errors.category}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="paymentMethod">
            Payment Method
          </label>
          <select
            name="paymentMethod"
            value={expense.paymentMethod}
            onChange={handleChange}
            className="border p-2 w-full rounded-lg"
            id="paymentMethod"
            aria-required="true"
          >
            <option value="" disabled>
              Select Payment Method
            </option>
            <option value="Credit Card">Credit Card</option>
            <option value="Cash">Cash</option>
            <option value="Debit Card">Debit Card</option>
          </select>
          {errors.paymentMethod && (
            <p className="text-red-500" role="alert">
              {errors.paymentMethod}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="date">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={expense.date}
            onChange={handleChange}
            className="border p-2 w-full rounded-lg"
            aria-required="true"
            id="date"
            max={new Date().toISOString().split("T")[0]}
          />
          {errors.date && (
            <p className="text-red-500" role="alert">
              {errors.date}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-primary text-white px-6 py-2 rounded-lg shadow hover:bg-primarylight"
          aria-label="Update Expense"
        >
          Update Expense
        </button>

        <button
          type="button" // Update this to 'button'
          className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-500 mx-4"
          aria-label="Cancel Update"
          onClick={() => {
            navigate("/");
          }}
        >
          Cancel
        </button>
      </form>

      {/* Modal Component */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmUpdate}
      />
    </div>
  );
}

export default EditExpense;
