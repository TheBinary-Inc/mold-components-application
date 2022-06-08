const express = require("express");
const Joi = require("joi");
const varify_admin = require("../../middlewares/verify_token");
const ORDER_SCHEMA = require("../../models/Order");
const ORDER_OF_CART = express.Router();

ORDER_OF_CART.post("/create-order", async (req, res) => {
  const { fullname, phonenumber, orderedproducts } = req.body;

  const JOI_VALIDATION_SCHEMA = Joi.object({
    fullname: Joi.string().required(),
    phonenumber: Joi.string().min(3).max(15).required(),
    orderedproducts: Joi.array().min(1).required()
  })

  const VALIDATION = JOI_VALIDATION_SCHEMA.validate({fullname, phonenumber, orderedproducts});
  if(!VALIDATION.error){
    const { fullname, phonenumber, orderedproducts } = VALIDATION.value
    const NEW_ORDER = await ORDER_SCHEMA.create({
        fullname,
        phonenumber, 
        orderedproducts,
        orderedAt: String(new Date())
    })
    if(NEW_ORDER){
      res.status(201).json({
        message: "Successfully ordered. Please wait until we contact!"
      })
    }
    else{
      res.status(500).json({
        message: "Internal server error. Please try again after some time!"
      })
    }
  }
  else{
    res.status(400).json({
      message: "Please provide all info correctly or add to cart!",
      fullmessage: VALIDATION.error.message
    })
  }
})

ORDER_OF_CART.get("/all-orders" , varify_admin, async (req, res) => {
    const allOrders = await ORDER_SCHEMA.find({});

    if(allOrders){
      res.status(200).json({
        message: "Successfully fetched!",
        allOrders
      })
    }
    else{
      res.status(404).json({
        message: "Orders not found!"
      })
    }
})

module.exports = ORDER_OF_CART