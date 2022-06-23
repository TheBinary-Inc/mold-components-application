const express = require("express");
const Joi = require("joi");
const fs = require("fs");
const cloudinary = require("../../helpers/cloudinary");
const upload = require("../../helpers/multer");
const PRODUCT_SCHEMA = require("../../models/Product");
const verify_admin = require("../../middlewares/verify_token");
const UPDATE_PRODUCT = express.Router();

UPDATE_PRODUCT.put("/update-product/:productId", verify_admin, upload.array("productImages"), async (req, res) => {
  const {
    productName_uz,
    productName_ru,
    productDescription_uz,
    productDescription_ru,
    productImages,
    productSizesAndQuantity,
    productMainCategory_uz,
    productMainCategory_ru,
    productSubCategory_uz,
    productSubCategory_ru
  } = req.body;

    if(productName_uz ||
      productName_ru ||
      productDescription_uz ||
      productDescription_ru ||
      productImages ||
      productSizesAndQuantity ||
      productMainCategory_uz ||
      productMainCategory_ru || 
      productSubCategory_uz ||
      productSubCategory_ru
    ){

    if(req.params.productId){
      var existProduct = await PRODUCT_SCHEMA.findOne({_id: req.params.productId});
    }
    const uploader = async (path) => await cloudinary.uploads(path, "Images");
    const urls = [];
    if (req.files) {
      const files = req.files;
      for (const file of files) {
        const { path } = file;
        const newPath = await uploader(path);
        urls.push(newPath);
        fs.unlinkSync(path);
      }
    }

    if(productDescription_uz){
      var parsedDescriptionUz= JSON.parse(productDescription_uz);
    }
    if(productDescription_ru){
      var parsedDescriptionRu= JSON.parse(productDescription_ru);

    }
    if(existProduct){
      const NEW_PRODUCT = await PRODUCT_SCHEMA.findByIdAndUpdate(req.params.productId, {
        productName_uz: productName_uz || existProduct.productName_uz,
        productName_ru: productName_ru || existProduct.productName_ru,
        productDescription_uz: parsedDescriptionUz || existProduct.parsedDescriptionUz,
        productDescription_ru: parsedDescriptionRu || existProduct.parsedDescriptionUz,
        productImages: urls.length > 0 ? urls : existProduct.productImages,
        productSizesAndQuantity: productSizesAndQuantity?.split(",") || existProduct.productSizesAndQuantity,
        productMainCategory_uz: productMainCategory_uz || existProduct.productMainCategory_uz,
        productMainCategory_ru: productMainCategory_ru || existProduct.productMainCategory_ru,
        productSubCategory_uz: productSubCategory_uz || existProduct.productSubCategory_uz,
        productSubCategory_ru: productSubCategory_ru || existProduct.productSubCategory_ru,
      });
      if (NEW_PRODUCT) {
        res.status(201).json({
          message: "Successfully created!"
        });
      } 
      else {
        res.status(400).json({
          message: "Something went wrong in the server!",
        });
      }
      }
      else{
        res.status(400).json({
          message: "Please provide all info correctly!",
          fullmessage: "Nothing Updated",
        });
      }

    }
});

module.exports = UPDATE_PRODUCT;
