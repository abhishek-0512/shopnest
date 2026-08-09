const Product = require("../models/Product");
const { uploadBufferToCloudinary } = require("../config/cloudinary");

// =====================
// CREATE PRODUCT
// =====================
const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, brand, stock, imageUrl: bodyImageUrl, attributes } = req.body;

    if (!name || !price || !brand) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let finalImageUrl = bodyImageUrl;

    if (req.file) {
      const result = await uploadBufferToCloudinary(req.file.buffer);
      if (result?.secure_url) {
        finalImageUrl = result.secure_url;
      }
    }

    if (!finalImageUrl) {
      return res.status(400).json({ message: "Image is required" });
    }

    let parsedAttributes = attributes;
    if (typeof attributes === "string") {
      try {
        parsedAttributes = JSON.parse(attributes);
      } catch {
        parsedAttributes = {};
      }
    }

    const product = await Product.create({
      name,
      description: description || "",
      price: Number(price),
      category: category ? category.toLowerCase() : "fashion",
      brand,
      stock: Number(stock) || 0,
      imageUrl: finalImageUrl,
      attributes: parsedAttributes || {},
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
    const { keyword, category, sort, minPrice, maxPrice } = req.query;

    let query = {};

    if (keyword) {
      query.$or = [
        { name: { $regex: keyword, $options: "i" } },
        { brand: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ];
    }

    if (category && category !== "All" && category !== "all") {
      query.category = category.toLowerCase();
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    let sortOption = { createdAt: -1 };
    if (sort === "low") sortOption = { price: 1 };
    else if (sort === "high") sortOption = { price: -1 };
    else if (sort === "rating") sortOption = { rating: -1 };

    const products = await Product.find(query).sort(sortOption);
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
    product.price = req.body.price !== undefined ? Number(req.body.price) : product.price;
    product.category = req.body.category ? req.body.category.toLowerCase() : product.category;
    product.brand = req.body.brand || product.brand;
    product.stock = req.body.stock !== undefined ? Number(req.body.stock) : product.stock;

    if (req.body.imageUrl) {
      product.imageUrl = req.body.imageUrl;
    }

    // Cloudinary update
    if (req.file) {
      const result = await uploadBufferToCloudinary(req.file.buffer);

      if (result?.secure_url) {
        product.imageUrl = result.secure_url;
      }
    }

    if (req.body.attributes) {
      let attrs = req.body.attributes;
      if (typeof attrs === "string") {
        try {
          attrs = JSON.parse(attrs);
        } catch {}
      }
      product.attributes = attrs;
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

// =====================
// CREATE PRODUCT REVIEW
// =====================
const createProductReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      alreadyReviewed.rating = Number(rating);
      alreadyReviewed.comment = comment;
    } else {
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };
      product.reviews.push(review);
    }

    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;
    product.rating = Number(product.rating.toFixed(1));

    await product.save();
    res.status(201).json({ success: true, message: "Review added successfully", product });
  } catch (error) {
    console.log("CREATE REVIEW ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  createProductReview,
};