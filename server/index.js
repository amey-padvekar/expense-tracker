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
    let encryptedpass="";
    // bcrypt.hash(req.body.password,saltRounds,function(err,hash){
    //     if(err) throw err;
    //     encryptedpass = hash
    // })
    try {
        await User.create({
            name: req.body.name,
            email: req.body.enail,
            password: req.body.password
        })
        res.json({
            status: 'ok'
        })
    } catch (err) {
        // res.json({
        //     status: 'error',
        //     error: "Duplicate email"
        // })
        console.log(err);
        res.json({
            status: 'error',
            error:"Duplicate key"
        })
    }
})
app.post("/api/login", async (req, res) => {

    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password
    })
    if (user) {
        const token = jwt.sign({
            name:user.name,
            email:user.email
        },"secret123")
        return res.json({
            status: 'ok',
            user: token
        })
    } else {
        res.json({
            status: 'error',
            user: false
        })
    }

})

app.get("/api", (req, res) => {
    res.json({
        message: "Hello from the server"
    });
})

app.listen(PORT, () => {
    console.log("Server is listening on ", PORT);
})