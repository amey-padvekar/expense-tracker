const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/user.model");
const Expense = require("./models/expense.model");
const auth = require("./auth");
const PORT = process.env.PORT || 3001;
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const saltRounds = 10;

mongoose.connect("mongodb://127.0.0.1:27017/expense-tracker", (err) => {
  if (err) console.log(err);
  console.log("Connected");
});
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.post("/api/register", async (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, function (err, hashPasword) {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashPasword,
    });

    newUser.save(function (err) {
      if (err) console.log(err);
      else
        res.json({
          status: true,
          message: "User Registered",
        });
    });
  });
});

app.post("/api/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email }, function (err, foundUser) {
    if (err) console.log(err);
    else if (foundUser) {
      bcrypt.compare(password, foundUser.password, function (err, result) {
        const token = jwt.sign(
          {
            userId: foundUser._id,
            userEmail: foundUser.email,
          },
          "RANDOM-TOKEN",
          { expiresIn: "24h" }
        );
        if (result) {
          res.json({
            status: "Ok",
            userId:foundUser._id,
            message: "User Logged in",
            token: token,
          });
        }
      });
    } else {
      res.json({
        status: "error",
        message: "User Login failed",
      });
    }
  });
});

app.post("/expenses",auth  , (req,res)=>{
    const newExpense = Expense({
      title:req.body.title,
      amount:req.body.amount,
      type:req.body.type,
      category:req.body.category,
      recordedBy:req.user.userId
    });
    newExpense.save((err)=>{
      if(err) res.json({error:err});
      else res.json({status:"Successful"});
    })
})

app.get("/expenses",auth,(req,res)=>{
  Expense.find({recordedBy:req.user.userId},(err,result)=>{
    res.json(result);
  })
})
app.delete("/delete/:expenseId",(req,res)=>{
  console.log(req.params);
  Expense.findByIdAndDelete({_id:req.params.expenseId},(err,result)=>{
    if(err) res.json({error:err})
    else res.json({status:"successful"})
  })
})

app.get("/free-endpoint/:id", (request, response) => {
  response.json({ message: "You are free to access me anytime",id:request.params.id });
});

// authentication endpoint
app.get("/auth-endpoint", auth, (request, response) => {
  response.json({ message: "You are authorized to access me", user:request.user });
});

app.listen(PORT, () => {
  console.log("Server is listening on ", PORT);
});
