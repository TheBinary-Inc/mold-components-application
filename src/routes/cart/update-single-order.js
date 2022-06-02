const express = require("express");
const varify_admin = require("../../middlewares/verify_token");
const ORDER_SCHEMA = require("../../models/Order");
const ORDER_UPDATE = express.Router();

ORDER_UPDATE.patch("/update-single-order/:id", varify_admin, async(req, res) => {
  const updatedOrder = await ORDER_SCHEMA.findByIdAndUpdate({_id: req.params.id}, {contacted: true});
  if(updatedOrder){
    res.status(200).json({
      message: {
        uz: "Muvaffaqiyali o'zgartirildi!",
        ru: "Success Ru"
      }
    })
  }
  else{
    res.status(500).json({
      message: {
        uz: "SMTH went wrong",
        ru: "SMTH went wrong Ru"
      }
    })
  }
})

module.exports = ORDER_UPDATE;