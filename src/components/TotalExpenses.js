import ExpensePieChart from "./ExpensePieChart";

function TotalExpenses({ total, expenseData }) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
        
        <div className="w-1/3">
          <h2 className="text-xl font-bold">Total Expenses</h2>
          <p className="text-3xl mt-4">${total}</p>
        </div>

        <div className="w-2/3" style={{ width: '250px', height: '250px', margin: '0 auto' }}>
          <ExpensePieChart expenses={expenseData} />
        </div>
      </div>
    </div>
  );
}

export default TotalExpenses;
