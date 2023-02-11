const express = require("express");

const PORT = process.env.PORT || 3001;
const cors = require("cors")
const app = express();
app.use(cors())
app.use(express.json())

app.post("/api/register",(req,res)=>{
    console.log(req.body);
})

app.get("/api",(req,res)=>{
    res.json({message:"Hello from the server"});
})

app.listen(PORT,()=>{
    console.log("Server is listening on ",PORT);
})