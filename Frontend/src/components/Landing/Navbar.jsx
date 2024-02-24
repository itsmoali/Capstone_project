import React, {useState, useEffect} from 'react'
import { Typography, Stack, Box, AppBar, Toolbar,IconButton, Button} from '@mui/material'
import styled from '@emotion/styled'
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { useAuth } from '../Auth/auth'
import '../../App.css';
import Logout from '../Auth/Logout';

// const CustomButton = styled(Button)(({ theme }) => ({
//   // Add custom styles here
//   backgroundColor: '#2196F3',
//   color: 'white',
//   margin: '0 30px',
//   '&:hover': {
//     backgroundColor: '#2196G8',
//   },
// }));

const Navbar = () => {

  const auth = useAuth();
  

  useEffect(() => {
    
    localStorage.setItem('isLoggedIn', auth.isLoggedIn);
    console.log('Navbar: ', auth.isLoggedIn);
    
  
  },[auth.isLoggedIn]);

 
 return (

  
    <AppBar sx={{height:'10vh'}} >
      <Toolbar >
        <IconButton disableRipple  href="/" sx={{flexDirection:'column',borderRadius:'0', pl:2, color:'white'}}> 
          <Typography variant="h5" >Habit</Typography>           
          <Typography variant="h5" >Banao</Typography>
        </IconButton>

        {/* <Stack p={2} sx={{flexDirection:'row', flexGrow:1,justifyContent: 'right'}}> */}
 
          
          <Box display="flex" justifyContent='right' flexGrow='1' gap={8} pr={2}>

              <Link to={"/Courses"}>
                <Button variant='contained'>Course</Button>
              </Link>

              <Link to="/create_course">
                <Button variant='contained'>Create A Course</Button>
              </Link>

              {!auth.isLoggedIn && 
                (<Link to={"/Login"}>
                  <Button variant='contained'>Login</Button>
                </Link>)}

              {auth.isLoggedIn && 
                (
                  <Logout/>
                )}



          </Box>
          
        {/* </Stack>   */}

      </Toolbar>
    </AppBar>


  )
}

export default Navbar;