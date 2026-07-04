const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const Product = require("./model/Product");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected for seeding"))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

const products = [
  {
    name: "iPhone 15",
    description: "Apple smartphone",
    price: 79999,
    category: "Electronics",
    brand: "Apple",
    imageUrl: "iphone15.jpg",
    stock: 10, // ✅ FIXED
  },
  {
    name: "MacBook Air M3",
    description: "Apple Laptop",
    price: 119999,
    category: "Laptops",
    brand: "Apple",
    imageUrl: "macbook.jpg",
    stock: 5, // ✅ FIXED
  },
  {
    name: "Boat Rockerz 550",
    description: "Wireless Headphones",
    price: 2499,
    category: "Accessories",
    brand: "Boat",
    imageUrl: "boat550.jpg",
    stock: 25, // ✅ FIXED
  },
  {
    name: "Samsung S24",
    description: "Flagship Android phone",
    price: 74999,
    category: "Electronics",
    brand: "Samsung",
    imageUrl: "samsung-s24.jpg",
    stock: 7, // ✅ FIXED
  },
  {
    name: "Nike Air Max",
    description: "Running Shoes",
    price: 6999,
    category: "Footwear",
    brand: "Nike",
    imageUrl: "nike-airmax.jpg",
    stock: 12, // ✅ FIXED
  },
];

const seedDatabase = async () => {
  try {
    await Product.deleteMany();
    console.log("Old products removed");

    await Product.insertMany(products);
    console.log("Products Added Successfully");

    console.log("Database Seeded Successfully");
    process.exit();
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedDatabase();