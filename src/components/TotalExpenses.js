import ExpensePieChart from "./ExpensePieChart";
import ExpensesOverTime from "./ExpensesOvertime";
function TotalExpenses({ total, expenseData }) {
  const totalExpensesByCategory = expenseData.reduce((totals, expense) => {
    const { category } = expense;
    if (!totals[category]) {
      totals[category] = 0;
    }
    totals[category] += parseFloat(expense.amount) || 0;
    return totals;
  }, {});

  console.log(totalExpensesByCategory);

  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      <div className="bg-white p-6 rounded-lg shadow-md flex md:flex-row md:items-start flex-col justify-between">
        <div className="md:w-1/3 flex md:flex-col md:items-start md:justify-start flex-row items-center justify-between w-full">
          <h2 className="text-xl font-bold">Total Expenses: </h2>
          <p className="text-3xl md:mt-4">${parseFloat(total).toFixed(2)}</p>
        </div>

        <div className="md:w-1/3 md:flex-col flex-row md:py-0 py-4">
          <h3 className="text-lg font-bold">Expenses Categorized by Type:</h3>
          <ul>
            {Object.keys(totalExpensesByCategory).length > 0 ? (
              Object.entries(totalExpensesByCategory).map(
                ([category, total]) => (
                  <li key={category} className="mt-2">
                    <span className="font-semibold">{category}:</span> $
                    {total.toFixed(2)}
                  </li>
                )
              )
            ) : (
              <li>There are currently no expenses to display.</li>
            )}
          </ul>
        </div>

        <div
          className="w-1/3"
          style={{ width: "250px", height: "250px", margin: "0 auto" }}
        >
          <ExpensePieChart expenses={expenseData} />
        </div>
      </div>
      <div  className="my-4">
        <ExpensesOverTime expenses={expenseData} />
      </div>
    </div>
  );
}

export default TotalExpenses;
