import {useState} from "react";

import { Grid, Link, Container, Box, Typography, TextField, Button, } from "@mui/material";


function Register(props) {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  
  async function handleRegister(event){
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
  props.setStatus(data.status);
  }

  return (
    // <div>
    //   <h1>Register</h1>
    //   <form onSubmit={registerUser}>
    //     <input type="text" 
    //            value={name} 
    //            placeholder="Name" 
    //            onChange={(e)=>setName(e.target.value)}></input>
    //     <br/>
    //     <input type="email" 
    //            value={email} 
    //            onChange={(e)=>{setEmail(e.target.value)}} 
    //            placeholder="E-mail"></input>
    //     <br/>
    //     <input type="password" 
    //            value={password} 
    //            onChange={(e)=>{setPassword(e.target.value)}} 
    //            placeholder="Password"></input>
    //     <br/>
    //     <input type="submit" value="Submit"></input>
    //   </form>
    // </div>
    <Container component="main" maxWidth="xs">
      <Box
        sx={{  
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" onSubmit={handleRegister} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            onChange={(e)=>{setName(e.target.value)}}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={(e)=>{setEmail(e.target.value)}}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e)=>{setPassword(e.target.value)}}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container>  
            <Grid item>
              <Link href="/login" variant="body2">
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Register;
