const mongoose  = require("mongoose");

const User = new mongoose.Schema({
    name:{type:String, required: true},
    email:{type:String ,unique:true, required:true},
    password:{type:String,required:true},
    quote:{type:String}
},{collection:'userdata'});

const model = new mongoose.model("UserData",User)

module.exports = model