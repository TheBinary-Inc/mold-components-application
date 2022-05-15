const express = require("express");
const ADMIN_SCHEMA = require("../../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const LOGIN_ADMIN = express.Router();

LOGIN_ADMIN.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const JOI_VALIDATION_SCHEMA = Joi.object({
    username: Joi.string().alphanum().min(5).max(30).required(),
    password: Joi.string().min(8).max(1024).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  })

  const VALIDATION = JOI_VALIDATION_SCHEMA.validate({username, password});

  if(!VALIDATION.error){
    const { username, password } = VALIDATION.value;
    const EXIST_USET = await ADMIN_SCHEMA.findOne({username});
    if(EXIST_USET){
      bcrypt.compare(password, EXIST_USET.password, function(err, result) {
        const {password, confirmpassword, __v,...PAYLOAD} = EXIST_USET?._doc;
        if(result){
          jwt.sign({ USER: PAYLOAD }, process.env.TOKEN_SECRET_KEY, function(err, token) {
            res.status(200).json({
              message: "Successfully logged in!",
              token,
              user: PAYLOAD
            })
          });          
        }
        else{
          res.status(401).json({
            message: "Username or Password is incorrect!"
          })
        }
      });
    }
    else{
      res.status(401).json({
        message: "Username or Password is incorrect!"
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

module.exports = LOGIN_ADMIN;