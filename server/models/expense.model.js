const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:"Title is required"
    },
    type:{
        type:String,
        enum: ["income", "expense"],
        required:"type is required"
    },
    amount:{
        type: Number,
        min:0,
        required:"Amount is required"
    },
    category:{
        type: String,
        trim:true,
        required: "Category is required"
    },
    incurredOn:{
        type:Date,
        default:Date.now
    },
    notes:{
        type:String,
        trim:true,
    },
    updated:Date,
    created:{
        type:Date,
        default:Date.now
    },
    recordedBy:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    }
});

const expenseModel = mongoose.model("expense",expenseSchema);

module.exports = expenseModel;