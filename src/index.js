const express = require("express");
const mongoose = require("mongoose");
const CREATE_ADMIN = require("./routes/auth/create-admin");
const LOGIN_ADMIN = require("./routes/auth/login-admin");
const CREATE_PRODUCT = require("./routes/content/create-product");
const ORDER_OF_CART = require("./routes/cart/order-of-cart");
const ALL_PRODUCTS = require("./routes/content/allproducts");
const cors = require("cors");
require("dotenv/config");

const app = express();
const HOST_PORT = process.env.SERVER_HOST;
const MONGO_CREDENCIALS = process.env.MONGO_CREDENCIALS;
mongoose
  .connect(MONGO_CREDENCIALS)
  .then(() => {
    console.log("CONNECTED TO MOLD-COMPONENTS CLUSTER");
  })
  .catch((err) => {
    console.log("COULDN'T CONNECT TO CLUSTER", err);
  });

app.use(cors());
app.use(express.json());
app.use("/auth", CREATE_ADMIN);
app.use("/auth", LOGIN_ADMIN);
app.use("/product", CREATE_PRODUCT);
app.use("/product", ALL_PRODUCTS)
app.use("/order", ORDER_OF_CART);

app.listen(HOST_PORT, () => {
  console.log(`LISTENING ON PORT ${HOST_PORT}`);
});
