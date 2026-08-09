const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  // Restricts options to primary categories
  category: {
    type: String,
    required: true,
    enum: ["fashion", "electronics", "sports", "medicines"],
  },

  brand: {
    type: String,
    required: true,
  },

  imageUrl: {
    type: String,
    required: true,
  },

  stock: {
    type: Number,
    required: true,
    default: 0,
  },

  rating: {
    type: Number,
    default: 4.5,
  },

  numReviews: {
    type: Number,
    default: 0,
  },

  reviews: [reviewSchema],

  // Flexible attributes for section-specific details
  attributes: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    default: {},
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);