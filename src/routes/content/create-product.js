const express = require("express");
const Joi = require("joi");
const fs = require("fs");
const cloudinary = require("../../helpers/cloudinary");
const upload = require("../../helpers/multer");
const PRODUCT_SCHEMA = require("../../models/Product");
const verify_admin = require("../../middlewares/verify_token");
const CREATE_PRODUCT = express.Router();

CREATE_PRODUCT.post("/create-product", verify_admin, upload.array("productImages"), async (req, res) => {
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
    productSubCategory_ru,
  } = req.body;

  const JOI_VALIDATION_SCHEMA = Joi.object({
    productName_uz: Joi.string().min(2).required(),
    productName_ru: Joi.string().min(2).required(),
    productDescription_uz: Joi.string().min(1).max(1024).required(),
    productDescription_ru: Joi.string().min(1).max(1024).required(),
    productSizesAndQuantity: Joi.string().max(1024).required(),
    productMainCategory_uz: Joi.string().required(),
    productMainCategory_ru: Joi.string().required(),
    productSubCategory_uz: Joi.string().required(),
    productSubCategory_ru: Joi.string().required(),
  });

  const VALIDATION = JOI_VALIDATION_SCHEMA.validate({
    productName_uz,
    productName_ru,
    productDescription_uz,
    productDescription_ru,
    productSizesAndQuantity,
    productMainCategory_uz,
    productMainCategory_ru,
    productSubCategory_uz,
    productSubCategory_ru,
  });

  if (!VALIDATION.error) {
    const {
      productName_uz,
      productName_ru,
      productDescription_uz,
      productDescription_ru,
      productSizesAndQuantity,
      productMainCategory_uz,
      productMainCategory_ru,
      productSubCategory_uz,
      productSubCategory_ru,
    } = VALIDATION.value;
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

    let parsedDescriptionUz= JSON.parse(productDescription_uz);
    let parsedDescriptionRu= JSON.parse(productDescription_ru);
    const NEW_PRODUCT = await PRODUCT_SCHEMA.create({
      productName_uz,
      productName_ru,
      productDescription_uz: parsedDescriptionUz,
      productDescription_ru: parsedDescriptionRu,
      productImages: urls,
      productSizesAndQuantity: productSizesAndQuantity.split(","),
      productMainCategory_uz,
      productMainCategory_ru,
      productSubCategory_uz,
      productSubCategory_ru,
    });
    console.log(urls, productSizesAndQuantity, productDescription_ru, productDescription_uz)
    if (NEW_PRODUCT) {
      res.status(201).json({
        message: "Successfully created!",
      });
    } else {
      res.status(500).json({
        message: "Something went wrong in the server!",
      });
    }
  } else {
    res.status(400).json({
      message: "Please provide all info correctly!",
      fullmessage: VALIDATION.error.message,
    });
  }
});

module.exports = CREATE_PRODUCT;
