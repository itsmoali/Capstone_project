// import React, { useRef, useState } from 'react'
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import Alert from '@mui/material/Alert';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import {useAuth} from '../contexts/AuthContext'
// import { FormControl, InputLabel } from '@mui/material';




// const defaultTheme = createTheme();

// export default function Sign_up() {
//     const emailRef = useRef()
//     const passwordRef = useRef()
//     const confirm_passwordRef = useRef()
//     const [error,SetError] = useState('')
//     const [loading,SetLoading] = useState(false)
//     const {signup} = useAuth()
   


//    async function handleSubmit(e) {
//         e.preventDefault();
    

//         if (passwordRef.current.value !== confirm_passwordRef.current.value) {
//             return SetError("Passwords do not match")
//         }

//         try{
//             SetError('')
//             SetLoading(true)
//             await signup(emailRef.current.value, passwordRef.current.value)
           
            
//         } catch{
//             SetError("Failed to create an account")
//         }
//         SetLoading(false)
//     };

//   return (
    
//         <ThemeProvider theme={defaultTheme}>
        

//         <Container component="main" maxWidth="xs">
            
            
            
//             <CssBaseline />
//                 <Box
//                 sx={{
//                     marginTop: 8,
//                     display: 'flex',
//                     flexDirection: 'column',
//                     alignItems: 'center',
//                 }}
//                 >
//                 <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//                     <LockOutlinedIcon />
//                 </Avatar>
//                 <Typography component="h1" variant="h5">
//                     Sign up
                    
//                 </Typography>
//                 {error && <Alert severity="error">{error}</Alert>}
//                 {currentUser && <Alert severity="success">You have successfully signed up</Alert>}
                
                
//                 <Box component="form"   onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    
//                     <Grid container spacing={2}>
//                     <Grid item xs={12} sm={6}>
//                         <TextField
//                         autoComplete="given-name"
//                         name="firstName"
//                         required
//                         fullWidth
//                         id="firstName"
//                         label="First Name"
//                         autoFocus
//                         />
//                     </Grid>
//                     <Grid item xs={12} sm={6}>
//                         <TextField 
//                         required
//                         fullWidth
//                         id="lastName"
//                         label="Last Name"
//                         name="lastName"
//                         autoComplete="family-name"
//                         />
//                     </Grid>
//                     <Grid item xs={12}>
//                         <TextField ref = {emailRef}
//                         required
//                         fullWidth
//                         id="email"
//                         label="Email Address"
//                         name="email"
//                         autoComplete="email"
//                         />
//                     </Grid>
//                     <Grid item xs={12}>
//                         <TextField ref={passwordRef}
//                         required
//                         fullWidth
//                         name="password"
//                         label="Password"
//                         type="password"
//                         id="password"
//                         autoComplete="new-password"
//                         />
//                     </Grid>
//                     <Grid item xs={12}>
//                         <TextField ref={confirm_passwordRef}
//                         required
//                         fullWidth
//                         name="confirm-password"
//                         label="Confirm-Password"
//                         type="password"
//                         id="confirm-password"
//                         autoComplete="new-password"
//                         />
//                     </Grid>
//                     <Grid item xs={12}>
//                         <FormControlLabel
//                         control={<Checkbox value="allowExtraEmails" color="primary" />}
//                         label="I want to receive inspiration, marketing promotions and updates via email."
//                         />
//                     </Grid>
//                     </Grid>
//                     <Button
//                     type="submit"
//                     disabled={loading}
//                     fullWidth
//                     variant="contained"
//                     sx={{ mt: 3, mb: 2 }}
//                     >
//                     Sign Up
//                     </Button>
//                     <Grid container justifyContent="flex-end">
//                     <Grid item>
//                         <Link href="#" variant="body2">
//                         Already have an account? Sign in
//                         </Link>
//                     </Grid>
//                     </Grid>
//                 </Box>
                
//                 </Box>
            
//         </Container>
        
//         </ThemeProvider>
    
//   );
// }