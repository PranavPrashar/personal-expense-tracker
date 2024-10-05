import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard'; // Import Dashboard
import AddExpense from './pages/AddExpense';
import EditExpense from './pages/EditExpense';
// import ExpenseList from './pages/ExpenseList';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>  
          <Route path="/" element={<Dashboard />} />  
          <Route path="/add" element={<AddExpense />} />
          {/* <Route path="/expenses" element={<ExpenseList />} /> */}
          <Route path="/edit/:id" element={<EditExpense />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
