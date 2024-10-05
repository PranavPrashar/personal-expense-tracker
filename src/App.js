import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard'; // Import Dashboard
import AddExpense from './pages/AddExpense';
// import ExpenseList from './pages/ExpenseList';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>  {/* Use Routes instead of Switch */}
          <Route path="/" element={<Dashboard />} />  {/* Use element instead of component */}
          <Route path="/add" element={<AddExpense />} />
          {/* <Route path="/expenses" element={<ExpenseList />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
