import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
function App() {
  return (
    <Router>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4">Personal Expense Tracker</h1>
          <p className="text-gray-700">
            Track your daily expenses efficiently.
          </p>
        </div>
      </div>
    </Router>
  );
}

export default App;
