const express = require("express");
const PRODUCT_SCHEMA = require("../../models/Product");
const sizePriceQuantity = require("../../helpers/size_price_quantity");

const SINGLE_PRODUCT = express.Router();

SINGLE_PRODUCT.get("/single-product/:productId", async (req, res) => {
  const { productId } = req.params;
  if(productId){
    const singleProduct = await PRODUCT_SCHEMA.findOne({_id: productId});
    let singleRifinedProduct = sizePriceQuantity([singleProduct])
    res.status(200).json({     
      message: "Successfully found!",
      singleProduct: singleRifinedProduct
    })
  }
  else{
    res.status(404).json({
      message: "Not found!"
    })
  }
})


module.exports = SINGLE_PRODUCT;