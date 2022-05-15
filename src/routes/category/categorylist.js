const express = require("express");
const PRODUCT_SCHEMA = require("../../models/Product");
const CATEGORY_LIST = express.Router();

CATEGORY_LIST.get("/category-list", async (req, res) => {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
    const allproducts = await PRODUCT_SCHEMA.find({});
    const allproducts_maincategoriesuz = [...new Set(allproducts.map(products => products.productMainCategory_uz))].map(categoryItem => {
      categoryItem = {
        value: categoryItem.toLowerCase(),
        label: categoryItem
      }
      return categoryItem
    });
    const allproducts_maincategoriesru = [...new Set(allproducts.map(products => products.productMainCategory_ru))].map(categoryItem => {
      categoryItem = {
        value: categoryItem.toLowerCase(),
        label: categoryItem
      }
      return categoryItem
    });;
    const allproducts_subcategoriesuz = [...new Set(allproducts.map(products => products.productSubCategory_uz))].map(categoryItem => {
      categoryItem = {
        value: categoryItem.toLowerCase(),
        label: categoryItem
      }
      return categoryItem
    });;
    const allproducts_subcategoriesru = [...new Set(allproducts.map(products => products.productSubCategory_ru))].map(categoryItem => {
      categoryItem = {
        value: categoryItem.toLowerCase(),
        label: categoryItem
      }
      return categoryItem
    });;
    res.json({
      main_categories_uz: allproducts_maincategoriesuz,
      main_categories_ru: allproducts_maincategoriesru,
      sub_categories_uz: allproducts_subcategoriesuz,
      sub_categories_ru: allproducts_subcategoriesru
    })
})

module.exports = CATEGORY_LIST;