const mongoose = require("mongoose");

const ADMIN_SCHEMA = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 5,
    max: 30
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 1024
  },
  confirmpassword: {
    type: String,
    required: true,
    min: 8,
    max: 1024
  }
})

module.exports = mongoose.model("ADMIN", ADMIN_SCHEMA);