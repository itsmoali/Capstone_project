import React, {useRef, useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import { useAuth } from './auth';
import client from './path';



const Signup = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_pwd, setConfirm_pwd] = useState('');



function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirm_pwd) {
        setError("Passwords do not match");
        return;
    }
    if (password.length < 8) {
        setError("Password must be at least 8 characters");
        return;
    }
    if (username.length < 3) {
        setError("Username must be at least 3 characters");
        return;
    }
    if (email == ''){
        setError("Please enter an Email");
        return;
    }

    const result = auth.signup(username, email, password);

    if (result) {
        navigate('/');
    }
    else {
        setError("Error in signing up");
    }
    
    


    //Use the signup function from the useAuth hook

    


    // client.post('/signup', {
            
    //         email: email,
    //         username: username,
    //         password: password
    //     })
    //     .then((response) => {
    //         // Handle successful response
    //         console.log('Registration successful', response.data);
    //         // Navigate to the Login Page
    //         navigate('/login');
    //     })
    //     .catch((error) => {
    //         // Handle network error
    //         console.error('Network error:', error.response.data);
    //         // You can set an error state or display an error message here
    //     });
}



  return (
    

        <Container component="main" maxWidth="xs" >

            
                <Box
                sx={{
                    marginTop: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                <Avatar sx={{ m: 1}}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5" >
                    Sign up
                    
                </Typography >
                {error && <Alert severity="error">{error}</Alert>}
                {auth.isLoggedIn && <Alert severity="success">You have successfully signed up</Alert>}
                
                
                <Box component="form"  sx={{ mt: 3}}>

                    
                    
                    <Grid container spacing={2} sx={{ mt: 3}}>

                        <Grid item xs={12}  >
                            <TextField 
                            // required
                            fullWidth
                            color='primary'
                            id="username"
                            label="username"
                            name="username"
                            autoComplete="family-name"
                            onChange = {(e) => setUsername(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            onChange={(e) => setEmail(e.target.value)}
                            /> 
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField  
                            required
                            fullWidth
                            name="confirm-password"
                            label="Confirm-Password"
                            type="password"
                            id="confirm-password"
                            autoComplete="new-password"
                            onChange = {(e) => setConfirm_pwd(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Button

                    onClick={handleSubmit}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link href="/login" variant="body2">
                        Already have an account? Sign in
                        </Link>
                    </Grid>
                    </Grid>
                    
                </Box>
                
                </Box>
            
        </Container>
        

    
  );
}

export default Signup;