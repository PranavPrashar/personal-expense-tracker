import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
} from "chart.js";

// Register necessary components from Chart.js
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title);

const ExpensesOverTime = ({ expenses }) => {
  // Object to store aggregated expenses by month
  const aggregatedData = {};

  // Loop through each expense to sum expenses by month
  expenses.forEach((expense) => {
    // Convert the expense date to a Date object
    const date = new Date(expense.date);

    // Extract year and month in "YYYY-MM" format
    const month = `${date.getFullYear()}-${date.getMonth() + 1}`; // getMonth() returns 0-indexed month

    // If this month doesn't exist in aggregatedData, initialize it to 0
    if (!aggregatedData[month]) {
      aggregatedData[month] = 0;
    }

    // Add the expense amount to the correct month, parsing it as a number
    aggregatedData[month] += parseFloat(expense.amount);
  });

  // Prepare the data for the chart
  const chartData = {
    // Labels for the X-axis (months in YYYY-MM format)
    labels: Object.keys(aggregatedData),
    
    // Datasets for the line chart (in this case, a single dataset for total expenses)
    datasets: [
      {
        label: "Total Expenses", // The label for the dataset
        data: Object.values(aggregatedData), // The values for each month
        fill: false, // No area fill below the line
        borderColor: "#19346B", // Line color
        borderWidth: 2, // Line thickness
        tension: 0.1, // Add a slight curve to the line
      },
    ],
  };

  // Configuration options for the chart, including axis labels
  const options = {
    responsive: true, // Make the chart responsive to screen size
    scales: {
      x: {
        title: {
          display: true,
          text: 'Months', // Label for the X-axis
        },
      },
      y: {
        beginAtZero: true, // Start Y-axis at zero to show full range of expenses
        title: {
          display: true,
          text: 'Total Expenses ($)', // Label for the Y-axis
        },
      },
    },
  };

  return (
    <div>
      <h3>Expenses Over Time</h3>
      {/* Line component from react-chartjs-2, which renders the line chart */}
      <Line data={chartData} options={options} className="h-1/3 w-full" />
    </div>
  );
};

export default ExpensesOverTime;
