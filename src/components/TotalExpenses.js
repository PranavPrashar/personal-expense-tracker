function TotalExpenses({total}) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold">Total Expenses</h2>
        <p className="text-3xl mt-4">${total}</p>
      </div>
    </div>
  );
}

export default TotalExpenses;
