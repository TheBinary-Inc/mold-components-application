const express = require("express");
const PRODUCT_SCHEMA = require("../../models/Product");
const verify_admin = require("../../middlewares/verify_token");
const MANAGE_PRODUCTS = express.Router();

MANAGE_PRODUCTS.delete("/delete/:id", verify_admin, async (req, res) => {
  try{
    if(req.params.id){
      const deletedProductRes = await PRODUCT_SCHEMA.findByIdAndDelete({_id: req.params.id})
      res.status(200).json(deletedProductRes);
    }
    else{
      res.status(500).json({
        message: "Internal server error!"
      })
    }
  }
  catch(err){
    res.status(400).json({
      message: "Not full!"
    })
  }
})

module.exports = MANAGE_PRODUCTS;