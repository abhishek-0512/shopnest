# 🛍️ ShopNest - Modern MERN E-Commerce Platform

A full-stack, enterprise-grade MERN e-commerce application designed with high-performance responsive UI, Razorpay payment gateway integration, comprehensive admin analytics, and beautiful invoice generation.

[![React](https://img.shields.io/badge/React-19.2-blue.svg)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen.svg)](https://www.mongodb.com/atlas)
[![Deployed](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat-square&logo=vercel)](https://shopnest-tau-pink.vercel.app/)

---

## 🎯 Overview

ShopNest is a comprehensive e-commerce solution designed for modern online retail. Built with the MERN stack, it delivers a smooth, responsive shopping experience for customers and powerful management tools for store administrators.

### ✨ Key Features

#### 🛒 Shopping Experience
- 🔍 **Advanced Product Search** - Filter by category, price, rating
- 📦 **Product Catalog** - Browse products with detailed information
- 🛒 **Shopping Cart** - Add/remove items, manage quantities
- ❤️ **Wishlist** - Save favorite products
- ⭐ **Product Reviews** - Read and write reviews
- 💳 **Secure Checkout** - Multi-step checkout process
- 📍 **Order Tracking** - Track order status in real-time
- 📄 **Printable Invoices** - Generate PDF invoices

#### 👤 User Management
- 🔐 **User Authentication** - Secure JWT login/registration
- 👤 **User Profiles** - Manage personal information
- 📜 **Order History** - View past orders
- 💾 **Address Management** - Save multiple addresses
- 🔔 **Notifications** - Order and promotional updates

#### 🏢 Admin Dashboard
- 📊 **Analytics** - Sales, revenue, and customer insights
- 📦 **Product Management** - Add, edit, delete products
- 👥 **Customer Management** - View customer information
- 📋 **Order Management** - Process and track orders
- 📈 **Reports** - Generate sales and inventory reports
- 🎯 **Promotions** - Manage discounts and offers

---

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library with hooks
- **Redux Toolkit** - State management
- **Vite** - Build tool
- **React Router DOM 7** - Client-side routing
- **CSS3** - Glassmorphism styling
- **React Icons** - Icon library
- **React Toastify** - Notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password encryption
- **Multer** - File uploads
- **Cloudinary** - Image hosting
- **Razorpay SDK** - Payment processing
- **Nodemailer** - Email service

### Deployment
- **Vercel** - Frontend hosting
- **Render/Railway** - Backend hosting
- **MongoDB Atlas** - Cloud database
- **Cloudinary** - Image storage

---

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14+)
- npm/yarn
- MongoDB
- Git

### Quick Local Setup

#### 1. Clone the Repository
```bash
git clone https://github.com/abhishek-0512/shopnest.git
cd shopnest
```

#### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
```

**Fill in your `.env` file:**
```env
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/shopnest
JWT_SECRET=your_jwt_secret_key
PORT=8000
NODE_ENV=development
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
RAZORPAY_KEY_ID=rzp_test_your_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_email_password
CLIENT_URL=http://localhost:5173
```

**Start backend server:**
```bash
npm run dev
# Running at http://localhost:8000
```

#### 3. Frontend Setup
In a new terminal:
```bash
cd frontend
npm install
cp .env.example .env
```

**Fill in your `.env` file:**
```env
VITE_API_URL=http://localhost:8000/api
VITE_RAZORPAY_KEY=rzp_test_your_razorpay_key
```

**Start frontend development server:**
```bash
npm run dev
# Running at http://localhost:5173
```

---

## 🚀 Live Demo

**[Visit ShopNest Live](https://shopnest-tau-pink.vercel.app/)**

### Test Credentials
- **Email**: demo@shopnest.com
- **Password**: demo123456

### Test Razorpay Payment
- Card Number: `4111 1111 1111 1111`
- Expiry: Any future date
- CVV: Any 3 digits

---

## 📁 Project Structure

```
shopnest/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   ├── Review.js
│   │   └── Cart.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── orders.js
│   │   ├── cart.js
│   │   └── users.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── orderController.js
│   │   ├── cartController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   └── upload.js
│   ├── server.js
│   └── config/
│       └── database.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   └── AdminPanel.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── OrderTracking.jsx
│   │   │   └── Admin/
│   │   ├── redux/
│   │   │   ├── slices/
│   │   │   │   ├── cartSlice.js
│   │   │   │   ├── productSlice.js
│   │   │   │   └── userSlice.js
│   │   │   └── store.js
│   │   ├── hooks/
│   │   ├── context/
│   │   └── App.jsx
│   ├── public/
│   └── index.html
└── README.md
```

---

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/refresh` - Refresh token

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add to cart
- `PUT /api/cart/update` - Update cart item
- `DELETE /api/cart/:itemId` - Remove from cart
- `DELETE /api/cart` - Clear cart

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order details
- `GET /api/orders/:id/invoice` - Download invoice
- `PUT /api/orders/:id/status` - Update order status (Admin)

### Reviews
- `POST /api/reviews` - Add review
- `GET /api/reviews/:productId` - Get product reviews
- `DELETE /api/reviews/:id` - Delete review (User/Admin)

### Admin
- `GET /api/admin/analytics` - Dashboard analytics
- `GET /api/admin/users` - Get all users
- `GET /api/admin/reports/sales` - Sales reports

---

## 💡 Features Implemented

| Feature | Status | Details |
|---------|--------|---------|
| Product Catalog | ✅ | Full product browsing with advanced filters |
| Shopping Cart | ✅ | Add/remove items with Redux state sync |
| User Authentication | ✅ | Secure JWT login & registration |
| Order Management | ✅ | Create, view, and track orders |
| Payment Integration | ✅ | Razorpay & Cash on Delivery |
| Admin Panel | ✅ | Complete management dashboard |
| Product Reviews | ✅ | Customer reviews and ratings |
| Invoice Generation | ✅ | PDF and HTML invoices |
| Responsive Design | ✅ | Mobile-friendly interface |
| Search & Filter | ✅ | Advanced product search |
| Wishlist | ✅ | Save favorite products |
| Order Tracking | ✅ | Real-time order status |

---

## 🌐 Full-Stack Deployment Guide

### Option 1: Deploy Backend on Render (Free)
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **New + > Web Service**
3. Connect your GitHub repository
4. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add **Environment Variables** (all from `.env`)
6. Click **Create Web Service** and copy the backend URL

### Option 2: Deploy Frontend on Vercel (Recommended)
1. Go to [Vercel Dashboard](https://vercel.com/new)
2. Import your GitHub repository
3. **Root Directory**: `frontend`
4. **Framework Preset**: Vite
5. Add **Environment Variables**:
   - `VITE_API_URL`: Your Render backend URL
   - `VITE_RAZORPAY_KEY`: Your Razorpay public key
6. Click **Deploy**

---

## 🎓 Learning Outcomes

This project demonstrates:
- ✅ Full MERN stack development
- ✅ E-commerce business logic
- ✅ Payment processing integration
- ✅ State management with Redux
- ✅ User authentication & authorization
- ✅ Admin functionality
- ✅ API design and implementation
- ✅ Database modeling

---

## 🤝 Contributing

We welcome contributions! Here's how:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/NewFeature`)
3. Commit changes (`git commit -m 'Add NewFeature'`)
4. Push branch (`git push origin feature/NewFeature`)
5. Open Pull Request

---

## 📝 License

MIT License - see [LICENSE](LICENSE) for details.

---

## 👨‍💻 Author

**Abhishek Gangwar**
- GitHub: [@abhishek-0512](https://github.com/abhishek-0512)
- LinkedIn: [linkedin.com/in/abhishek-gangwar](https://linkedin.com/in/abhishek-gangwar)
- Email: abhishek.gangwar@email.com

---

## 🎯 Future Roadmap

- [ ] Mobile app (React Native/Flutter)
- [ ] Inventory management system
- [ ] Email notifications
- [ ] Multi-vendor support
- [ ] Advanced analytics
- [ ] AI product recommendations
- [ ] Live chat support
- [ ] Seller dashboard

---

## 📞 Support

- Open an [Issue](https://github.com/abhishek-0512/shopnest/issues)
- Email: abhishek.gangwar@email.com
- Connect on [LinkedIn](https://linkedin.com/in/abhishek-gangwar)

---

⭐ **If this project helped you, please star it!**

*Last Updated: September 2026*
