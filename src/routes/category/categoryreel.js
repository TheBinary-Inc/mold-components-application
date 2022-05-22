const express = require("express");
const PRODUCT_SCHEMA = require("../../models/Product");
const sizePriceQuantity = require("../../helpers/size_price_quantity");
const CATEGORY_REEL = express.Router();

CATEGORY_REEL.get("/category-reel", async (req, res) => {
  const mainCategoryData = await PRODUCT_SCHEMA.find({})
  const mainCategory_uz  = [...new Set( mainCategoryData.map(product => product?.productMainCategory_uz))]
  const mainCategory_ru  = [...new Set( mainCategoryData.map(product => product?.productMainCategory_ru))]
  const mainCategories = [];
  for(let i = 0; i < mainCategory_uz.length; i++){
    const singleCategory = await PRODUCT_SCHEMA.find({productMainCategory_uz: mainCategory_uz[i]});
    let allRefinedProducts = sizePriceQuantity(singleCategory)
    mainCategories.push({categoryName_uz: mainCategory_uz[i], categoryName_ru: mainCategory_ru[i], allRefinedProducts});
  }
 

  res.status(200).json(mainCategories)
})

module.exports = CATEGORY_REEL;