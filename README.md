Here's a more polished version of your project documentation, emphasizing readability and structure:

---

# 🍽️ **YenCafe - Food Ordering Dine-In Website for College** 

## 🌟 **Overview**
YenCafe is a **MERN stack** web application that streamlines food ordering for college students and staff. It offers a seamless user experience, allowing users to add items to their cart, proceed through checkout, view order details, and track order status. An **admin panel** is provided for managing orders and food items, ensuring smooth operations and delivery.

## ✨ **Features**
- **🛒 Add to Cart**: Browse a variety of food items and add them to your cart with a single click.
- **📋 Cart Management**: View your selected items, adjust quantities, or remove items before placing an order.
- **💳 Checkout**: Enter delivery details and confirm your order quickly and securely.
- **📜 Order Details**: Access details of your placed orders, including item breakdowns, total amount, and payment status.
- **📦 Order Tracking**: Stay updated with real-time order statuses, from preparation to delivery.
- **🔧 Admin Panel**: 
  - **CRUD Operations**: Manage food items, users, and orders.
  - **Order Management**: Update the delivery status of orders as they progress.
  - **Edit Items**: Update existing food items, including details and images.
  - **Create New Items**: Add new dishes with descriptions and photos for the menu.

## 🛠️ **Technologies Used**
- **Backend**: 
  - **MongoDB**: Database for user, order, and menu data.
  - **Express.js**: RESTful API and request handling.
  - **Node.js**: JavaScript runtime for backend logic.
  - **Mongoose**: Object Data Modeling (ODM) for MongoDB.
  - **Cloudinary**: Image and video storage and delivery.
  - **RazorPay**: Payment gateway for secure transactions.
- **Frontend**:
  - **React.js**: Dynamic user interfaces.
  - **Redux Toolkit**: State management.
  - **React Router**: Single-page application (SPA) routing.
  - **Tailwind CSS**: Styling for responsive design.

## 🔗 **Key Tools and Libraries**
- **JWT**: User authentication and authorization.
- **Multer**: File upload handling.
- **bcryptjs**: Password hashing.
- **cors**: Cross-Origin Resource Sharing configuration.
- **dotenv**: Environment variable management.
- **express-validator**: Input validation.

## 📦 **Project Dependencies**
### Backend
- `bcryptjs` | `cors` | `dotenv` | `express` | `jsonwebtoken` | `mongoose` | `multer` | `nodemon` | `express-validator` | `cloudinary` | `cookie-parser`

### Frontend
- `react` | `react-dom` | `react-router-dom` | `react-scripts` | `tailwindcss` | `react-redux` | `redux-toolkit`

## 🚀 **Getting Started**
Follow these steps to set up and run the project locally:

1. **Clone the Repository**:  
   ```bash
   git clone https://github.com/misbah1408/YenCafe.git
   ```

2. **Navigate to the Project Directory**:  
   ```bash
   cd YenCafe
   ```

3. **Install Dependencies**:  
   - Backend:
     ```bash
     cd backend
     npm install
     ```
   - Frontend:
     ```bash
     cd frontend
     npm install
     ```

4. **Configure Environment Variables**:  
   - Create a `.env` file in the root of the backend directory.
   - Add the following variables:
     - `PORT`  
     - `MONGODB_URI`  
     - `JWT_SECRET`  
     - `CORS_ORIGIN`  
     - `CLOUDINARY_CLOUD_NAME`  
     - `CLOUDINARY_API_KEY`  
     - `CLOUDINARY_API_SECRET`  
     - `RAZORPAY_KEY_ID`  
     - `RAZORPAY_KEY_SECRET`

5. **Run the Application**:  
   - Start the Backend:
     ```bash
     npm run dev
     ```
   - Start the Frontend:
     ```bash
     npm start
     ```

6. **Open in Browser**:  
   Visit `http://localhost:3000` to view the application.

## 🤝 **Contributors**
- **[Mohammed Misbah](https://github.com/misbah1408)**: Project Lead, Backend Development, Frontend Development.
