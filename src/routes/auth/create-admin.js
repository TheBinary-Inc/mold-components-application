const express = require("express");
const ADMIN_SCHEMA = require("../../models/Admin");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const verify_admin = require("../../middlewares/verify_token");

const CREATE_ADMIN = express.Router();

CREATE_ADMIN.post("/create-admin", verify_admin, async (req, res) => {
  const { username, password, confirmpassword } = req.body;

  const JOI_VALIDATION_SCHEMA = Joi.object({
    username: Joi.string().alphanum().min(5).max(30).required(),
    password: Joi.string().min(8).max(1024).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    confirmpassword: Joi.string().min(8).max(1024).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
  })

  const VALIDATION = JOI_VALIDATION_SCHEMA.validate({username, password, confirmpassword});

  if(!VALIDATION.error){
    const { username, password } = VALIDATION.value;
    const SALT_ROUND_LENGTH = 10;
    const EXISTED_USER = await ADMIN_SCHEMA.findOne({username});
    if(!EXISTED_USER){
      bcrypt.genSalt(SALT_ROUND_LENGTH, function(err, salt) {
        bcrypt.hash(password, salt, async function(err, HASHED) {
          const NEW_USER = await ADMIN_SCHEMA.create({
            username, 
            password: HASHED, 
            confirmpassword: HASHED
          })
          if(NEW_USER){
            res.status(201).json({
              message: "Successfully created new admin!"
            })
          }
          else{
            res.status(500).json({
              message: "Something went wrong in the server!"
            })
          }
        });
      });
    }
    else{
      res.status(409).json({
        message: "This username is already in use!"
      })
    }
  }
  else{
    res.status(400).json({
      message: "Please provide all info correctly!",
      fullmessage: VALIDATION.error.message
    })
  }
})

module.exports = CREATE_ADMIN