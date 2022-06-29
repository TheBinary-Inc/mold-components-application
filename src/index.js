const express = require("express");
const mongoose = require("mongoose");
const CREATE_ADMIN = require("./routes/auth/create-admin");
const LOGIN_ADMIN = require("./routes/auth/login-admin");
const CREATE_PRODUCT = require("./routes/content/create-product");
const ORDER_OF_CART = require("./routes/cart/order-of-cart");
const ALL_PRODUCTS = require("./routes/content/allproducts");
const cors = require("cors");
const CATEGORY = require("./routes/category/category");
const SUBCATEGORY = require("./routes/category/subcategory");
const CATEGORY_LIST = require("./routes/category/categorylist");
const SINGLE_PRODUCT = require("./routes/content/singleproduct");
const CATEGORYNEST = require("./routes/category/categorynest");
const VALIDATION = require("./routes/test/validation");
const CATEGORY_REEL = require("./routes/category/categoryreel");
const SEARCH_PRODUCTS = require("./routes/content/searchproducts");
const MANAGE_PRODUCTS = require("./routes/content/manageproducts");
const ORDER_UPDATE = require("./routes/cart/update-single-order");
const ORDER_DELETE = require("./routes/cart/delete-single-order");
const UPDATE_PRODUCT = require("./routes/update/product-update");
require("dotenv/config");

const app = express();
const PORT = process.env.PORT || 1337;
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
app.use("/product", ALL_PRODUCTS);
app.use("/product", SINGLE_PRODUCT); 
app.use("/product", SEARCH_PRODUCTS);
app.use("/product", UPDATE_PRODUCT);     
app.use("/manage", MANAGE_PRODUCTS);
app.use("/category", CATEGORY);
app.use("/category", SUBCATEGORY);
app.use("/category", CATEGORY_LIST);
app.use("/category", CATEGORY_REEL);
app.use("/category", CATEGORYNEST);
app.use("/order", ORDER_OF_CART);
app.use("/order", ORDER_UPDATE);
app.use("/order", ORDER_DELETE);
app.use("/validation", VALIDATION);


app.listen(PORT, () => {  
  console.log(`LISTENING ON PORT ${PORT}`); 
});