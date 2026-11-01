# E-Commerce Web Application

# Project Description

This is a full-stack E-Commerce Web Application developed as part of the SkillNexis Internship Program.

The application allows users to register, log in, view products, and manage their shopping carts. It uses React for the frontend, Node.js and Express.js for the backend, and MongoDB for database management.

# Features

- User Registration and Login
- Password Hashing using bcrypt
- JWT-based Authentication
- View All Products
- View Individual Product Details
- Add New Products (authenticated users)
- Add Products to Shopping Cart
- View Shopping Cart
- Remove Products from Cart
- Responsive User Interface

# Technologies Used

**Frontend:**
- React.js
- Vite
- HTML
- CSS
- Axios
- React Router

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcryptjs
- dotenv

# Project Structure

```
skillnexis-week-4/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── api.js
│   │   ├── main.jsx
│   │   └── style.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
│
└── README.md
```

# Installation and Setup

# 1. Clone the Repository
# 2. Backend Setup

```
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the backend server:

```
npm run dev
```

# 3. Frontend Setup

Open another terminal:

```
cd frontend
npm install
npm run dev
```

Open the local URL provided by Vite in your browser.

# API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/signup | Register a user |
| POST | /api/auth/login | Login user |
| GET | /api/products | Get all products |
| GET | /api/products/:id | Get a single product |
| POST | /api/products | Add a product |
| GET | /api/cart | View shopping cart |
| POST | /api/cart | Add product to cart |
| DELETE | /api/cart/:productId | Remove product from cart |

Protected endpoints require JWT authentication.

# Security

- Passwords are hashed, before being stored.
- JWT authentication protects, user-specific routes.
- Environment variables, are used for, sensitive configuration.
- `.env` and `node_modules`, are excluded using `.gitignore`.

# Testing and Validation

The application's core functionalities, including user authentication, product management, and shopping cart operations, were tested to verify their expected behaviour.

The following functionalities were tested:
- User registration and login
- JWT authentication
- Product creation and retrieval
- Adding products to the cart
- Viewing and removing cart items


Developed as part of the SkillNexis Full Stack Web Dev Internship Program.

