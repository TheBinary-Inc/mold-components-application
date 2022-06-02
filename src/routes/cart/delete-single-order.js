const express = require("express");
const varify_admin = require("../../middlewares/verify_token");
const ORDER_SCHEMA = require("../../models/Order");
const ORDER_DELETE = express.Router();

ORDER_DELETE.delete("/delete-single-order/:id", varify_admin, async(req, res) => {
  const deletedOrder = await ORDER_SCHEMA.findByIdAndDelete({_id: req.params.id});
  if(deletedOrder){
    res.status(200).json({
      message: {
        uz: "Muvaffaqiyatli o'chirildi!",
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

module.exports = ORDER_DELETE;