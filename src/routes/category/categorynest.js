const express = require("express");
const PRODUCT_SCHEMA = require("../../models/Product");

const CATEGORYNEST = express.Router();

CATEGORYNEST.get("/category-nest", async (req, res) => {
  const mainCategoryData = await PRODUCT_SCHEMA.find({})
  const mainCategory_uz  = [...new Set( mainCategoryData.map(product => product?.productMainCategory_uz))]
  const mainCategory_ru  = [...new Set( mainCategoryData.map(product => product?.productMainCategory_ru))]
  var productSubCategories_uz = [];
  var productSubCategories_ru = [];

  for(let i = 0; i < mainCategory_uz.length; i++){
    const mains_uz = await PRODUCT_SCHEMA.find({productMainCategory_uz: mainCategory_uz[i]});
    const mainsArr_uz = []
    const mainsArr_ru = []
    for(j = 0; j < mains_uz.length; j++){
      mainsArr_uz.push(mains_uz[j].productSubCategory_uz)
      mainsArr_ru.push(mains_uz[j].productSubCategory_ru)
    }
    productSubCategories_uz.push([...new Set(mainsArr_uz)])
    productSubCategories_ru.push([...new Set(mainsArr_ru)])
  }

  res.status(200).json({
    productSubCategories_uz,
    productSubCategories_ru,
    mainCategory_uz,
    mainCategory_ru
  })

})

module.exports = CATEGORYNEST