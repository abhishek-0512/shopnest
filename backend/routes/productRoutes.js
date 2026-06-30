const express = require("express");
const multer = require("multer");

const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController"); // <-- changed

const upload = multer({ dest: "uploads/" });

const router = express.Router();

router
  .route("/")
  .get(getProducts)
  .post(
    protect,
    admin,
    upload.single("image"),
    createProduct
  );

router
  .route("/:id")
  .get(getProductById)
  .put(
    protect,
    admin,
    upload.single("image"),
    updateProduct
  )
  .delete(
    protect,
    admin,
    deleteProduct
  );

module.exports = router;