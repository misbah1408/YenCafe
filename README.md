# Food Ordering Dine-In Website for College

## Overview
This project is a MERN stack application designed to facilitate food ordering for students and staff. It provides features for adding items to the cart, checkout, viewing order details, checking order status, and an admin panel for CRUD operations and updating order delivery status. Additionally, the admin panel includes features for editing existing food items and creating new ones.

## Features
- **Adding Items**: Users can browse through available food items and add them to their cart.
- **Cart Functionality**: Users can view their selected items in the cart and modify quantities or remove items.
- **Checkout**: Users can proceed to checkout, where they provide necessary details for order placement.
- **Order Details**: Users can view the details of their placed orders, including order items, total amount, and status.
- **Order Status**: Users can track the status of their orders, whether it's confirmed, in preparation, or out for delivery.
- **Admin Panel**: Admin users have access to a dashboard where they can perform CRUD operations on food items, orders, and users. They can also update the delivery status of orders.
- **Edit Feature**: Admin users can edit existing food items, including updating details and images.
- **Create New Item**: Admin users can create new food items with necessary details and images.

## Technologies Used
- **MongoDB**: Database for storing user, order, and food item information.
- **Express.js**: Backend framework for handling HTTP requests and routing.
- **React.js**: Frontend library for building user interfaces.
- **Node.js**: Runtime environment for running JavaScript code on the server.
- **Mongoose**: MongoDB object modeling tool for Node.js.
- **React Router**: Routing library for React applications.
- **Tailwind CSS**: Frontend framework for responsive design.
- **JWT (JSON Web Tokens)**: For user authentication and authorization.
- **Multer**: Middleware for handling multipart/form-data, used for file uploads.
- **Cloudinary**: Cloud service for managing and delivering media assets (images, videos).
- **Redux Toolkit**: Redux library for state management.

## Dependencies for Backend
- **bcryptjs**
- **cors**
- **dotenv**
- **express**
- **jsonwebtoken**
- **mongoose**
- **multer**
- **nodemon**
- **express-validator**
- **cloudinary**
- **axios**
- **cookie-parser**

## Dependencies for Frontend
- **react**
- **react-dom**
- **react-router-dom**
- **react-scripts**
- **tailwindcss**
- **react-redux**
- **redux-toolkit**

## Setup Instructions
1. Clone the repository: ("https://github.com/misbah1408/YenCafe.git")

2. Navigate to the project directory:`cd  `

3. Install dependencies for both the backend and frontend: `npm install`

4. Configure environment variables:
- Create a `.env` file in the root directory.
- Define environment variables such as `PORT`, `MONGODB_URI`, `JWT_SECRET`,`CORS_ORIGIN`, `CLOUDINARY_CLOUD_NAME`,`CLOUDINARY_API_KEY`,`CLOUDINARY_API_SECRET`, etc.

5. Start the development server: 
    Backend:`npm run dev`
    Frontend:`npm start`


## Contributors
- [Mohammed Misbah](https://github.com/misbah1408)

