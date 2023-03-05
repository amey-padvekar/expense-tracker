import {useState} from "react";
// import { BrowserRouter, redirect, Route } from "react-router-dom";
import { TextField, Typography, Button, Grid, Box, Container, Link, Checkbox, FormControlLabel} from "@mui/material";
function Login(props) {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  
  async function handleSubmit(event){
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
  props.setStatus(true);
  
  
  if(data.status === "Ok"){
    alert("Login Successful")
  }
  else{
    alert("Please check username and password")
    window.location.href = "/register"
  }
  }

  return (
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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
