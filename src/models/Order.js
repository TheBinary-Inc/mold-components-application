const mongoose = require("mongoose");

const ORDER_SCHEMA = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  phonenumber:{
    type: String,
    required: true
  },
  orderedproducts: {
    type: Array,
    required: true,
    min: 1
  }
})

module.exports = mongoose.model("ORDERS", ORDER_SCHEMA);