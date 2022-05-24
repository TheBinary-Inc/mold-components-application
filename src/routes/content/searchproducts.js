const express = require("express");
const PRODUCT_SCHEMA = require("../../models/Product");
const sizePriceQuantity = require("../../helpers/size_price_quantity");
const SEARCH_PRODUCTS = express.Router();

SEARCH_PRODUCTS.get("/search/:key", async (req, res) => {
  const searchedProducts = await  PRODUCT_SCHEMA.find({
    "$or" : [
      {productName_uz: {$regex: req.params.key}},
      {productName_ru: {$regex: req.params.key}},
      {productMainCategory_uz: {$regex: req.params.key}},
      {productMainCategory_ru: {$regex: req.params.key}},
      {productSubCategory_uz: {$regex: req.params.key}},
      {productSubCategory_ru: {$regex: req.params.key}},
    ]
  }).limit(4)

  let searchedProductsResult = sizePriceQuantity(searchedProducts)
  if(searchedProductsResult){
    res.status(200).json(searchedProductsResult);
  }
})

module.exports = SEARCH_PRODUCTS;