const express = require("express");
const sizePriceQuantity = require("../../helpers/size_price_quantity");
const PRODUCT_SCHEMA = require("../../models/Product");
const SUBCATEGORY = express.Router();

SUBCATEGORY.get("/subcategories/:subCategoryName", async (req, res) => {
  const { subCategoryName } = req.params;
  if(subCategoryName){
    const result = await PRODUCT_SCHEMA.find({$or:[{productSubCategory_uz: subCategoryName},{productSubCategory_ru: subCategoryName}]});
    let subCategory = sizePriceQuantity(result)
    if(subCategory){
      res.status(200).json({
        message: "Successfull fetched!",
        subCategory,
        subCategoryTranslate: {
          uz: subCategory[0]?.productSubCategory_uz,
          ru: subCategory[0]?.productSubCategory_ru
        }
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