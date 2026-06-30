const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./model/User");
const Product = require("./model/Product");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected for seeding"))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

const seedDatabase = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = await User.create({
      name: "Abhishek Gangwar",
      email: "admin@shopnest.com",
      password: hashedPassword,
      role: "admin",
      verified: true,
    });

    console.log("Admin Created");

    const products = [
      {
        name: "iPhone 15",
        description: "Apple smartphone",
        price: 79999,
        category: "Electronics",
        brand: "Apple",
        imageUrl: "https://via.placeholder.com/300",
        stock: 15,
      },
      {
        name: "Samsung S24",
        description: "Flagship Android phone",
        price: 74999,
        category: "Electronics",
        brand: "Samsung",
        imageUrl: "https://via.placeholder.com/300",
        stock: 20,
      },
      {
        name: "MacBook Air M3",
        description: "Apple Laptop",
        price: 119999,
        category: "Laptops",
        brand: "Apple",
        imageUrl: "https://via.placeholder.com/300",
        stock: 10,
      },
      {
        name: "Boat Rockerz 550",
        description: "Wireless Headphones",
        price: 2499,
        category: "Accessories",
        brand: "Boat",
        imageUrl: "https://via.placeholder.com/300",
        stock: 50,
      },
      {
        name: "Nike Air Max",
        description: "Running Shoes",
        price: 6999,
        category: "Footwear",
        brand: "Nike",
        imageUrl: "https://via.placeholder.com/300",
        stock: 25,
      },
    ];

    await Product.insertMany(products);

    console.log("Products Added Successfully");
    console.log("Database Seeded Successfully");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedDatabase();