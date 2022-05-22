const express = require("express");
const varify_admin = require("../../middlewares/verify_token");

const VALIDATION = express.Router();

VALIDATION.get("/validate-token", varify_admin, async (req, res) => {
    res.status(200).json({
      message: "Validated!"
    })
})

module.exports = VALIDATION;