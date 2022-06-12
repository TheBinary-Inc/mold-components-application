const express = require("express");
const sizePriceQuantity = require("../../helpers/size_price_quantity");
const PRODUCT_SCHEMA = require("../../models/Product");
const CATEGORY = express.Router();

CATEGORY.get("/categories/:categoryName", async (req, res) => {
  const { categoryName } = req.params;
  if(categoryName){
    const result = await PRODUCT_SCHEMA.find({$or:[{productMainCategory_uz: categoryName},{productMainCategory_ru: categoryName}]});
      let maincategory = sizePriceQuantity(result)
    
    if(maincategory){
      res.status(200).json({
        message: "Successfull fetched!",
        maincategory
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

module.exports = CATEGORY;