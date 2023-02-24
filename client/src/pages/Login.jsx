import {useState} from "react";
import { BrowserRouter, Route } from "react-router-dom";

function Login() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  
  async function loginUser(event){
    event.preventDefault();
    const response = await fetch("http://localhost:3001/api/login", {
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },  
    body: JSON.stringify({
      email,
      password,
    })
  })
  const data = await response.json();
  
  
  if(data.status == "Ok"){
    alert("Login Successful")
  }
  else{
    alert("Please check username and password")
    window.location.href = "/register"
  }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={loginUser}>
        <input type="email" 
               value={email} 
               onChange={(e)=>{setEmail(e.target.value)}} 
               placeholder="E-mail"></input>
        <br/>
        <input type="password" 
               value={password} 
               onChange={(e)=>{setPassword(e.target.value)}} 
               placeholder="Password"></input>
        <br/>
        <input type="submit" value="Submit"></input>
      </form>
      
    </div>
  );
}

export default Login;
