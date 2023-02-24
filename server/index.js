const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/user.model")
const PORT = process.env.PORT || 3001;
const cors = require("cors")
const app = express();
app.use(cors())
app.use(express.json())

const saltRounds = 10;

mongoose.connect('mongodb://127.0.0.1:27017/expense-tracker',(err)=>{
    if(err) console.log(err);
    console.log("Connected")
})


app.post("/api/register", async (req, res) => {

    bcrypt.hash(req.body.password,saltRounds,function(err,hashPasword){
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashPasword
        })
    
        newUser.save(function(err){
            if(err) console.log(err)
            else 
                res.json({
                    status: true,
                    message: "User Registered"

                })
        })
    })

    
    let encryptedpass="";
    // bcrypt.hash(req.body.password,saltRounds,function(err,hash){
    //     if(err) throw err;
    //     encryptedpass = hash
    // })
        // res.json({
        //     status: 'error',
        //     error: "Duplicate email"
        // })
        // console.log(err);
        // res.json({
        //     status: 'error',
        //     error:"Duplicate key"
        // })
})
app.post("/api/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
        User.findOne({email:email},function(err,foundUser){
            if(err) console.log(err)
            else if(foundUser){
                    bcrypt.compare(password,foundUser.password,function(err,result){
                        if(result){
                            res.json({
                                status: 'Ok',
                                message: 'User Logged in'
                            })        
                        }
                    })
                }
                else{
                    res.json({
                        status: 'error',
                        message: 'User Login failed'
                    })
                }
        }) 
})

app.get("/api", (req, res) => {
    res.json({
        message: "Hello from the server"
    });
})

app.listen(PORT, () => {
    console.log("Server is listening on ", PORT);
})