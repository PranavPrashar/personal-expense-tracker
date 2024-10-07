import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register necessary components from Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const ExpensePieChart = ({ expenses }) => {
  // Helper function to sum up the expenses by category
  const aggregateExpensesByCategory = (expenses) => {
    return expenses.reduce((acc, expense) => {
      const { category, amount } = expense;

      // If the category doesn't exist yet in the accumulator object, add it and start at 0
      if (!acc[category]) {
        acc[category] = 0;
      }

      // Add the current expense amount to the category's total
      acc[category] += parseFloat(amount);

      return acc; // Return the updated accumulator for the next iteration
    }, {}); // Initialize accumulator as an empty object
  };

  // Get the aggregated expenses by category
  const aggregatedExpenses = aggregateExpensesByCategory(expenses);

  // Prepare data for the Pie chart
  const chartData = {
    labels: Object.keys(aggregatedExpenses), // Get the category names from the aggregated data
    datasets: [
      {
        label: "Expenses by Category", // Title for the dataset
        data: Object.values(aggregatedExpenses), // Get the total amounts for each category

        // Define a color for each category's pie slice
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",   
          "rgba(54, 162, 235, 0.6)",   
          "rgba(255, 206, 86, 0.6)",   
          "rgba(75, 192, 192, 0.6)",   
          "rgba(153, 102, 255, 0.6)",  
        ],

        // Define a border color for each pie slice )
        borderColor: [
          "rgba(255, 99, 132, 1)",   
          "rgba(54, 162, 235, 1)",   
          "rgba(255, 206, 86, 1)",   
          "rgba(75, 192, 192, 1)",   
          "rgba(153, 102, 255, 1)",  
        ],
        borderWidth: 1, // Make the borders 1px thick for each slice
      },
    ],
  };

  // Render the Pie chart using the prepared data
  return <Pie data={chartData} className="w-5" />;
};

export default ExpensePieChart;
