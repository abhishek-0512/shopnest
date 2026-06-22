const Product = require("../model/Product");
const cloudinary = require("../config/cloudinary");

// Get All Products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get Product By ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Create Product
const createProduct = async (req, res) => {
  try {
    console.log("========== CREATE PRODUCT ==========");
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const {
      name,
      description,
      price,
      category,
      brand,
      stock,
    } = req.body;

    let imageUrl = "";

    if (req.file) {
      console.log("Uploading image to Cloudinary...");

      const result = await cloudinary.uploader.upload(
        req.file.path,
        {
          folder: "shopnest/products",
        }
      );

      console.log("CLOUDINARY RESULT:", result);

      imageUrl = result.secure_url;
    } else {
      console.log("No image file received");
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      brand,
      stock,
      imageUrl,
    });

    console.log("PRODUCT CREATED:", product);

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("========== CREATE PRODUCT ERROR ==========");
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      brand,
      stock,
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name ?? product.name;
      product.description = description ?? product.description;
      product.price = price ?? product.price;
      product.category = category ?? product.category;
      product.brand = brand ?? product.brand;
      product.stock = stock ?? product.stock;

      if (req.file) {
        const result = await cloudinary.uploader.upload(
          req.file.path,
          {
            folder: "shopnest/products",
          }
        );

        product.imageUrl = result.secure_url;
      }

      const updatedProduct = await product.save();

      res.json(updatedProduct);
    } else {
      res.status(404).json({
        message: "Product not found",
      });
    }
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne();

      res.json({
        message: "Product removed",
      });
    } else {
      res.status(404).json({
        message: "Product not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};