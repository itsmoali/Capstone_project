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
 
const Signup = () => {
    const navigate = useNavigate();
 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [confirm_pwd, setConfirm_pwd] = useState('');
    // const [passwordsMatch, setPasswordsMatch] = useState(true);
 
    // const onSubmit = async (e) => {
    //   e.preventDefault()

    //     if (password !== confirm_pwd) {
    //         return alert("Passwords donot matche. Please try again")
    //         // setPasswordsMatch(true);
    //     }
        
      

    //   await createUserWithEmailAndPassword(auth, email, password)
    //     .then((userCredential) => {

    //         const user = userCredential.user;
    //         console.log(user);
    //         navigate("/login")
  
    //     })
    //     .catch((error) => {
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //         console.log(errorCode, errorMessage);
    
    //     });
 
   
    // }
 
  return (
    
        
        

        <Container component="main" maxWidth="xs">
            {console.log(confirm_pwd)}
            {console.log(password)}
            
            
            {/* <CssBaseline /> */}
                <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >

                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                    
                </Typography>
                {/* {error && <Alert severity="error">{error}</Alert>}
                {currentUser && <Alert severity="success">You have successfully signed up</Alert>} */}
                
                
                <Box component="form"  sx={{ mt: 3 }}>

                    {/* <FormControl action=""> */}
                    
                    <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        autoComplete="given-name"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField 
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="family-name"
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
                    <Grid item xs={12}>
                        <FormControlLabel
                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                        label="I want to receive inspiration, marketing promotions and updates via email."
                        />
                    </Grid>
                    </Grid>
                    <Button
                    type="submit"
                    
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link href="#" variant="body2">
                        Already have an account? Sign in
                        </Link>
                    </Grid>
                    </Grid>
                    {/* </FormControl> */}
                </Box>
                
                </Box>
            
        </Container>
        

    
  );
}

export default Signup;