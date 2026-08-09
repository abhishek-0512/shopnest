# 🛒 ShopNest - Modern MERN E-Commerce Platform

[![React](https://img.shields.io/badge/React-19.2-blue.svg)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen.svg)](https://www.mongodb.com/atlas)
[![Vite](https://img.shields.io/badge/Vite-8.1-purple.svg)](https://vitejs.dev/)

ShopNest is a full-stack, enterprise-grade MERN e-commerce application designed with high-performance responsive UI, Razorpay payment gateway integration, comprehensive admin analytics, order invoices, dynamic catalog filtering, and robust security.

## 🚀 Live Demo

[https://shopnest-tau-pink.vercel.app/](https://shopnest-tau-pink.vercel.app/)

---

## ✨ Features

### 🛍️ Customer Experience
- **Dynamic Catalog & Instant Search**: Category filters, price sliders, sorting, search debouncing, and badge tags.
- **Interactive Product Quick-View Modal**: View detailed product specifications, stock status, ratings, and add to cart without leaving the page.
- **Cart & Wishlist with Redux State**: Seamless cart sync with persistent storage, real-time quantity adjustments, and promo coupon discounts.
- **Checkout & Razorpay Payment Gateway**: Secure test payment integration with instant signature verification, demo mode fallback, and Cash on Delivery.
- **Order Management & Printable Invoices**: Live tracking status (Processing, Shipped, Delivered), cancellation workflows, and beautiful PDF/HTML invoice generation.
- **User Authentication**: Secure JWT authentication with bcrypt password hashing and token persistence.

### 🛡️ Admin Dashboard & Analytics
- **KPI Metrics & Sales Graphs**: Real-time sales counter, total orders, active users, and category revenue distribution.
- **Product Management**: Create, edit, delete, and upload product images with Cloudinary support.
- **Order Processing**: Update delivery states and monitor payment verification statuses in real-time.
- **User Administration**: View registered accounts, join dates, and administrative roles.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Redux Toolkit, React Router DOM 7, React Icons, React Toastify, CSS3 Glassmorphism, Vite
- **Backend**: Node.js, Express.js, MongoDB / Mongoose, JWT, Multer, Cloudinary, Razorpay SDK, Nodemailer
- **Deployment**: Vercel (Frontend), Render / Railway (Backend), MongoDB Atlas (Database)

---

## 🚀 Quick Local Setup

### 1. Clone the Repository
```bash
git clone https://github.com/abhishek-0512/shopnest.git
cd shopnest
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
```
*Fill in your MongoDB connection string and JWT secret in `backend/.env`.*

Start backend server:
```bash
npm run dev
# Running at http://localhost:8000
```

### 3. Frontend Setup
In a new terminal:
```bash
cd frontend
npm install
cp .env.example .env
```
Start frontend development server:
```bash
npm run dev
# Running at http://localhost:5173
```

---

## 🌐 Full-Stack Deployment Guide

### Option 1: Deploy Backend on Render (Free & Fast)
1. Go to [Render Dashboard](https://dashboard.render.com/) and click **New + > Web Service**.
2. Connect your GitHub repository `abhishek-0512/shopnest`.
3. Configure the service settings:
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add the following **Environment Variables** in Render:
   - `NODE_ENV`: `production`
   - `PORT`: `8000`
   - `MONGO_URI`: `your_mongodb_atlas_connection_string`
   - `JWT_SECRET`: `your_random_secure_jwt_secret`
   - `CLIENT_URL`: `https://your-frontend.vercel.app`
   - `RAZORPAY_KEY_ID`: `rzp_test_...` (optional)
   - `RAZORPAY_KEY_SECRET`: `your_razorpay_secret` (optional)
5. Click **Create Web Service**. Copy your backend URL (e.g. `https://shopnest-backend.onrender.com`).

---

### Option 2: Deploy Frontend on Vercel (Recommended)
1. Go to [Vercel Dashboard](https://vercel.com/new) and import your GitHub repository.
2. Select the **Root Directory** as `frontend`.
3. Framework Preset: **Vite**.
4. Add the **Environment Variable**:
   - `VITE_API_URL`: `https://shopnest-backend.onrender.com` (Your Render backend URL)
   - `VITE_RAZORPAY_KEY`: `rzp_test_your_razorpay_key`
5. Click **Deploy**. Vercel will automatically build and assign your live URL!

---

## 👨‍💻 Author
**Abhishek Gangwar**  
GitHub: [@abhishek-0512](https://github.com/abhishek-0512)
