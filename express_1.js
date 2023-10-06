import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

import mongoose from "mongoose";
mongoose.connect("mongodb://127.0.0.1:27017", {
  dbName: "backendMessage",
})
  .then(() => console.log("DATA CONNECTED"))
  .catch((e) => console.log(e));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const User = mongoose.model("User", userSchema);

const app = express();

// middleware in express
// app.use(express.static(path.join(path.resolve(),"public")));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// setting up view engine
app.set("view engine", "ejs");


// Authentication 
const isAuthenticated = async(req, res, next) => {
  const { tokens } = req.cookies;
  if (tokens) {
    // res.render("logout");
    const decoded = jwt.verify(tokens , "hjhahjhl");
    req.user = await User.findById(decoded._id); // req.user is connected to mongodb
    next();
  } else {
    res.render("login");
  }
};


app.get("/", isAuthenticated, (req, res) => {
  console.log(req.user);
  res.render("logout");
});


// AUTHENTICATION
app.post("/login", async (req, res) => {
 console.log(req.body);
const user = await User.create({
  name: req.body.name,
  email: req.body.email,
})

const tokens = jwt.sign({ _id : user._id}, "hjhahjhl" , )
console.log(tokens);

  res.cookie(
    "tokens",
    tokens,
    {
      httpOnly: true,
      expires: new Date(Date.now() + 60 * 1000),
    });
  res.redirect("/");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (!user) return_res.redirect("/register");
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
  return res.render("login", { email, message: "Incorrect Password" });
  const token = jwt.sign({ _id: user._id }, "sdjasdbajsdbjasd");
  res.cookie("token", token, {
  httpOnly: true,
  expires: new Date(Date.now()+60* 1000),
  });
  res.redirect("/");
  });


  
app.post("/register" , async(req ,res)=>{
  const {name , email , password  } =req.body;
  
  let user = await User.findOne({email});
  if (user) {
   return res.redirect("/login");    
  }
  const hashedPassword = await bcrypt.hash(password , 10);
  user = await User.create({
    name,
    email,
    password : hashedPassword,
  });
})



app.get("/logout", (req, res) => {
  res.cookie("tokens",null,{
      httpOnly: true,
      expires: new Date(Date.now()),
});
  res.redirect("/");
});



app.listen(5000, () => {
  console.log("server is working");
});
