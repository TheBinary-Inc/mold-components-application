const express = require("express");
const PRODUCT_SCHEMA = require("../../models/Product");
const sizePriceQuantity = require("../../helpers/size_price_quantity");
const ALL_PRODUCTS = express.Router();

ALL_PRODUCTS.get("/all", async (req, res) => {
  const allproducts = await PRODUCT_SCHEMA.find({});
  let allRefinedProducts = sizePriceQuantity(allproducts)
  if(allproducts){
    res.status(200).json({
      message: "Successfully fetched!",
      allproducts: allRefinedProducts
    })
  }
  else{
    res.status(404).json({
      message: "Nothing found!"
    })
  }
})

module.exports = ALL_PRODUCTS;