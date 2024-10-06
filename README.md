# Personal Expense Tracker

This is a personal expense tracking application built with React and `json-server` for the backend API.

## Getting Started

### Prerequisites

Before you start, make sure you have:

- **Node.js** (version 18.x or higher)
- **npm** (comes with Node.js)


## Features

- **Add, Edit, Delete Expenses**: Manage your personal expenses with ease.
- **View Total Expenses**: Get an overview of your total expenses.
- **Advanced Filtering**: Filter expenses by:
  - Category
  - Date
  - Payment method
- **Data Visualizations**: Visualize your expenses through:
  - Pie charts
  - Line charts (expenses over time)
- **Animations with Framer Motion**: Smooth transitions and animations for a better user experience.
- **Responsive Design**: Optimized for both desktop and mobile devices.







## Installation

Clone the repository

```bash
  git clone https://github.com/PranavPrashar/personal-expense-tracker
  cd personal-expense-tracker
```

Install the dependencies:

```bash
  npm install
```

Set up the backend using json-server. This will run the backend on http://localhost:3001.:

```bash
  npm run json-server
```

Set up environment variables:
*Create a .env file in the root folder with the following content:*
REACT_APP_API_BASE_URL=http://localhost:3001



    
## Running the Application

Start the React application:

```bash
  npm start
```

**Open your browser and navigate to http://localhost:3000 to see the application running.**

### API

The backend API is served by `json-server`. It runs on `http://localhost:3001` and exposes the following routes:

- `GET /expenses`: Returns all expenses.
- `POST /expenses`: Creates a new expense.
- `PUT /expenses/:id`: Updates an existing expense by ID.
- `DELETE /expenses/:id`: Deletes an expense by ID.


## Tech Stack

**Client:** React, React Router, Axios, Framer Motion, Chart.js, React-Chartjs-2, TailwindCSS

**Server:** JSON Server (mock API)
## Optional Features

### Animations with Framer Motion:
The application uses **Framer Motion** to add subtle animations to elements like buttons, modals, and filters.

- **Buttons** scale slightly when hovered or clicked, adding a nice interactive feel.
- **Filters** can slide in and out smoothly when toggled.

These animations improve the user experience and make the interface more engaging.

### Advanced Filtering:
Users can filter expenses by:

- **Date range**
- **Category**
- **Payment method**

This allows for a more focused view of expenses based on the user's needs.

### Charts & Data Visualization:
The application integrates **Chart.js** with **react-chartjs-2** to provide visualizations of the expense data.

- A **pie chart** shows expenses broken down by category.
- A **line chart** displays expenses over time, allowing users to see trends in their spending habits.
## Initial Data Setup

You can use the following sample data to populate your `db.json` file. This will simulate some initial expenses for testing purposes:

**Add this data to your db.json file, which will serve as your mock database.**

```json
{
  "expenses": [
    {
      "id": "1",
      "description": "Groceries",
      "amount": "150",
      "date": "2024-01-01",
      "category": "Food",
      "paymentMethod": "Credit Card",
      "recurring": false
    },
    {
      "id": "2",
      "description": "Netflix Subscription",
      "amount": "15.99",
      "date": "2024-01-05",
      "category": "Entertainment",
      "paymentMethod": "Credit Card",
      "recurring": true
    },
    {
      "id": "3",
      "description": "Monthly Rent",
      "amount": "1200",
      "date": "2024-01-01",
      "category": "Rent",
      "paymentMethod": "Bank Transfer",
      "recurring": true
    },
    {
      "id": "4",
      "description": "Bus Ticket",
      "amount": "2.50",
      "date": "2024-01-10",
      "category": "Transportation",
      "paymentMethod": "Cash",
      "recurring": false
    }
  ]
}
```
## Assumptions Made:

1. **Categories**: It is assumed that expenses fall into the following predefined categories:
   - Food
   - Entertainment
   - Rent
   - Transportation  
   These are hardcoded categories, and the current system does not support dynamically adding or managing custom categories.

2. **Payment Methods**: Expenses can be associated with the following predefined payment methods:
   - Credit Card
   - Cash
   - Debit Card  
   These payment methods are also static and cannot be customized by the user.

3. **No Authentication**: This application is a simple expense tracker and assumes no need for user authentication or authorization for accessing or modifying the expense data.

4. **Backend**: The project assumes that the backend API is served locally by `json-server` running on `http://localhost:3001`, with the API URL stored in the environment variable `REACT_APP_API_BASE_URL`.

5. **Currency**: It is assumed that the application will be used in regions that use the US Dollar (`$`) as the primary currency. Currently, there is no support for multiple currencies or currency conversion.

