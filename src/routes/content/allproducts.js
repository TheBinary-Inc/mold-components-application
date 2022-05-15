const express = require("express");
const PRODUCT_SCHEMA = require("../../models/Product");
const ALL_PRODUCTS = express.Router();

ALL_PRODUCTS.get("/all", async (req, res) => {
  const allproducts = await PRODUCT_SCHEMA.find({});

  if(allproducts){
    res.status(200).json({
      message: "Successfully fetched!",
      allproducts
    })
  }
  else{
    res.status(404).json({
      message: "Nothing found!"
    })
  }
})

module.exports = ALL_PRODUCTS;