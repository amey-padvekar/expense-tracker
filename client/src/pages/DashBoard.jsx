import React from "react";
import {TextField} from "@mui/material";
const DashBoard = ()=>{
    
    return (<div>
        <TextField variant="standard" label="Username" />
        <br/>
        <TextField variant="standard" label="Email" />
        <br/>
        <TextField variant="standard" label="Password" />
    </div>)
}

export default DashBoard;