import React from "react";
import { useState } from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import Login from "./pages/Login";
import Register from "./pages/Register";




const App =  ()=>{
    const [status,setStatus] = useState(false);



    return (<div>
        <BrowserRouter>
            <Routes>
                <Route exact path="/login" element={<Login  />}/>
                <Route exact path="/register" element={<Register/>}/>
                <Route exact path="/dashboard" element={<DashBoard/>}/>
            </Routes>
        </BrowserRouter>
    </div>)
}

export default App;