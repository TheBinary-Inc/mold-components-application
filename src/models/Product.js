const mongoose = require("mongoose");

const PRODUCT_SCHEMA = new mongoose.Schema({
  productName_uz: {
    type: String,
    required: true,
    min: 2,
  },
  productName_ru: {
    type: String,
    required: true,
    min: 2,
  },
  productDescription_uz: {
    type: Array,
    required: true,
    min: 2,
    max: 10000,
  },
  productDescription_ru: {
    type: Array,
    required: true,
    min: 2,
    max: 10000,
  },
  productImages: {
    type: Array,
    required: true,
    min: 2,
    max: 30
  },
  productSizesAndQuantity: {
    type: Array,
    required: true,
  },

  productMainCategory_uz: {
    type: String,
    required: true,
  },

  productMainCategory_ru: {
    type: String,
    required: true,
  },

  productSubCategory_uz: {
    type: String,
    required: true,
  },
  productSubCategory_ru: {
    type: String,
    required: true,
  }
});


module.exports = mongoose.model("PRODUCTS", PRODUCT_SCHEMA)