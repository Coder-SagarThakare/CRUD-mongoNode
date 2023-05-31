const express = require("express");                     // import express module
const app = express();                                  // create object of express 
const bodyParser = require("body-parser");              // converte HTTP req body to json
const mongoose = require("mongoose");                   // import express module
require("dotenv").config();                               // import dotenv to access data from .env file

//routes
const employeeRoutes = require("./Routes/employee");
const userRoutes = require('./Routes/user')

// middleware
app.use(bodyParser.json());                             // middleware to converte HTTP req body to json         
app.use("/emp", employeeRoutes);                        // route for emp
app.use('/user',userRoutes)

// start the server
app.listen(5100, () => {
  console.log("server started successfully");
});

// connect node to mongodb
mongoose.connect(process.env.DB_CONNECTION);
console.log(process.env.DB_CONNECTION)
