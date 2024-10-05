import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard'; // Import Dashboard
import AddExpense from './pages/AddExpense';
import EditExpense from './pages/EditExpense';
import ErrorPage from './pages/error';
// import ExpenseList from './pages/ExpenseList';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>  
          <Route path="/" element={<Dashboard />} />  
          <Route path="/add" element={<AddExpense />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/edit/:id" element={<EditExpense />} />
           {/* Wildcard route to handle invalid URLs */}
           <Route path="*" element={<ErrorPage message={"The page your trying to reach does not exist"}/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
