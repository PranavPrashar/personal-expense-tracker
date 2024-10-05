import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpensePieChart = ({ expenses }) => {
  const aggregateExpensesByCategory = (expenses) => {
    return expenses.reduce((acc, expense) => {
      const { category, amount } = expense;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += parseFloat(amount);
      return acc;
    }, {});
  };

  // Aggregate the data
  const aggregatedExpenses = aggregateExpensesByCategory(expenses);

  // Prepare the data for the chart
  const chartData = {
    labels: Object.keys(aggregatedExpenses), // Category names
    datasets: [
      {
        label: "Expenses by Category",
        data: Object.values(aggregatedExpenses), // Total amounts per category
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={chartData} className="w-5" />;
};

export default ExpensePieChart;
