const express = require("express");
const PRODUCT_SCHEMA = require("../../models/Product");
const CATEGORY = express.Router();

CATEGORY.get("/categories/:categoryName", async (req, res) => {
  const { categoryName } = req.params;
  if(categoryName){
    const category = await PRODUCT_SCHEMA.find({productMainCategory_uz: categoryName})
    if(category){
      res.status(200).json({
        message: "Successfull fetched!",
        category
      })
    }
    else{
      res.status(404).json({
        message: "Nothing found!"
      })
    }
  }
  else{
    res.status(400).json({
      message: "Please provide the category!"
    })
  }
})