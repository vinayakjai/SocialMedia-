const express = require("express");
const cookieParser=require("cookie-parser");

const connecttodb=require("./config/databaseDriver")
const app=express();
connecttodb();
require("dotenv").config({path:"./config/config.env"});
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const post=require("./routes/post");
const user=require("./routes/user");

app.use("/api/v1/",post);
app.use("/api/v1/",user);

module.exports=app;