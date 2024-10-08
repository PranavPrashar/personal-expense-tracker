import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 
        className="text-8xl font-bold text-red-600 mb-4" 
        aria-label="404 Error - Page Not Found"
      >
        404
      </h1>
      <p 
        className="text-3xl text-gray-700 mb-6"
        aria-label="Error message"
      >
        {message ? message : "Oops! Something went wrong"}
      </p>
      <Link
        to="/"
        className="bg-primary text-white px-6 py-2 rounded-lg shadow hover:bg-primarylight"
        aria-label="Go back to the homepage"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
