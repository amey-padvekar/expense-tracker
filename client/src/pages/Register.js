import {useState} from "react";


function Register() {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  async function registerUser(event){
    event.preventDefault();
    const response = await fetch("http://localhost:3001/api/register", {
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },  
    body: JSON.stringify({
      name,
      email,
      password,
    })
  })
  const data = await response.json();
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={registerUser}>
        <input type="text" 
               value={name} 
               placeholder="Name" 
               onChange={(e)=>setName(e.target.value)}></input>
        <br/>
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

export default Register;
