const express = require("express");
const PRODUCT_SCHEMA = require("../../models/Product");
const SUBCATEGORY = express.Router();

SUBCATEGORY.get("/categories/:subCategoryName", async (req, res) => {
  const { subCategoryName } = req.params;
  if(subCategoryName){
    const subCategory = await PRODUCT_SCHEMA.find({productSubCategory_uz: subCategoryName})
    if(subCategory){
      res.status(200).json({
        message: "Successfull fetched!",
        subCategory
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

module.exports = SUBCATEGORY