const Product = require("../models/Product");
const { uploadBufferToCloudinary } = require("../config/cloudinary");

// =====================
// CREATE PRODUCT (CLOUDINARY ONLY)
// =====================
const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, brand, stock } = req.body;

    if (!name || !price || !brand) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // Upload to Cloudinary
    const result = await uploadBufferToCloudinary(req.file.buffer);

    if (!result?.secure_url) {
      return res.status(500).json({ message: "Image upload failed" });
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      brand,
      stock,
      imageUrl: result.secure_url,
    });

    res.status(201).json(product);
  } catch (error) {
    console.log("CREATE PRODUCT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// =====================
// GET ALL PRODUCTS
// =====================
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =====================
// GET SINGLE PRODUCT
// =====================
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =====================
// UPDATE PRODUCT
// =====================
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.category = req.body.category || product.category;
    product.brand = req.body.brand || product.brand;
    product.stock = req.body.stock || product.stock;

    // Cloudinary update
    if (req.file) {
      const result = await uploadBufferToCloudinary(req.file.buffer);

      if (result?.secure_url) {
        product.imageUrl = result.secure_url;
      }
    }

    const updatedProduct = await product.save();

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log("UPDATE PRODUCT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// =====================
// DELETE PRODUCT
// =====================
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log("DELETE PRODUCT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};