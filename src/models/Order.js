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
  },
  orderedAt: {
    type: Date,
    default: Date.now,
  },
  contacted: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model("ORDERS", ORDER_SCHEMA);