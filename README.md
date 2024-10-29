# Habit Tracker Application

A simple habit tracking application built with React, Express, and Chart.js. This app allows users to create, update, and track their habits visually using charts.

## Features

- Create and manage habits
- Toggle completion status of habits
- Visualize daily habit completion using charts
- Responsive design for mobile and desktop

## Technologies Used

- **Frontend**: React, Tailwind CSS, Chart.js, react-chartjs-2,axios
- **Backend**: Node.js, Express, MongoDB,
- **Authentication**: JWT (JSON Web Tokens)

## Setup and Installation

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (or use a cloud service like MongoDB Atlas)

### Clone the Repository



### Install Dependencies

#### Backend

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install the backend dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory and add your MongoDB connection string:

   ```plaintext
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=port_number
   ```

#### Frontend

1. Navigate to the frontend directory:

   ```bash
   cd ../frontend
   ```

2. Install the frontend dependencies:

   ```bash
   npm install
   ```

## Running the Application

### Start the Backend Server

1. Navigate to the backend directory (if not already there):

   ```bash
   cd backend
   ```

2. Start the server:

   ```bash
   npm run dev
   ```

   The backend server will run on `http://localhost:${process.env.PORT}`.

### Start the Frontend Application

1. Navigate to the frontend directory (if not already there):

   ```bash
   cd ../frontend
   ```

2. Start the React application:

   ```bash
   npm start
   ```

   The frontend application will run on `http://localhost:5173`.

## API Endpoints

### Habits

- **GET** `/api/habits` - Get all habits
- **POST** `/api/habits` - Create a new habit
- **PUT** `/api/habits/:id` - Update a habit


### Authentication

- **POST** `/api/auth/login` - Log in a user
- **POST** `/api/auth/signup` - Register a new user



