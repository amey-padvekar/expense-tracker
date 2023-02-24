const mongoose  = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    name:{type:String, required: true},
    email:{type:String ,unique:true, required:true},
    password:{type:String,required:true},
    quote:{type:String}
})
const model = new mongoose.model("User",userSchema)

module.exports = model