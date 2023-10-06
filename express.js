// express simply makes node syntax easy & easy to understang and better routing takes place 


import express from "express";
import path from "path";
import cookieParser from "cookie-parser";

import mongoose from "mongoose";
mongoose.connect("mongodb://127.0.0.1:27017",{
    dbName: "backendMessage",
}).then(()=>console.log("DATA CONNECTED"))
.catch((e)=>console.log(e));

const messageSchema = new mongoose.Schema({
    name:String,
    email:String,
});

const Message = mongoose.model("message" , messageSchema);

const app  = express();


// const users = []; don't use array

// To use middleware we have to use app.use method to transfer static files 
// express.static(path.join(path.resolve(),"public")); // can't use middleware like this 

// app.use(express.static(path.join(path.resolve(),"public")));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


//setting up view engine 
app.set ("view engine", "ejs");


const isAuthenticated = (req ,res , next ) =>{
    const {token} = req.cookies;

    if (token) {
      next();
    }
    else{
      res.render("login");
    }
};

app.get("/" , isAuthenticated ,  (req ,res)=>{
   res.render("logout");
});


app.get("/" , (req,res)=>{
    // res.render("index" , {name : "shaktivel"}); // for dynamic html use template dynamic send your name to fontened 
    // res.sendFile(path.join(__dirname, "public", "index.html"));
    // res.render("index");
    console.log(req.cookies);
    res.render("login");
});

// AUTHENTICATION 
app.post("/login", (req,res)=>{
  res.cookie("tokens" , "iamin",{
   httpOnly:true,
   expires:new Date(Date.now()+60*1000),
});
res.redirect("/");
});


app.get("/logout", (req,res)=>{
  res.cookie("tokens" , null ,{
   httpOnly:true,
   expires:new Date(Date.now()),
});
res.redirect("/");
});


// app.get("/add" , (req,res)=>{
//     Message.create({name:"shakti", email:"sample@gmail.com"}).then(()=>{
//         res.send("nice")
//     })
// });


// Async process 
app.get("/add" , async (req,res)=>{
  await  Message.create({name:"shakti", email:"sample@gmail.com"}).then(()=>{
        res.send("nice")
    })
});


app.get("/success" , (req,res)=>{
    res.render("success");
});


// app.post("/" , async (req,res)=>{
//     // console.log(req.body);
//     // const messageData = {username:req.body.name ,email: req.body.email };
//     const {name , email } = req.body;
//     await Message.create({name,email});
//      res.redirect("/success");
// });


app.get("/users" , (req,res)=>{
    res.json({
      users,
    });
});


app.listen(5000,()=>{
    console.log("server is working");
});



