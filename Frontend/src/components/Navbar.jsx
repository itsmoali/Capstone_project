import React, {useState, useEffect} from 'react'
import { Typography, Stack, Box, AppBar, Toolbar,IconButton, Button} from '@mui/material'
import styled from '@emotion/styled'
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { useAuth } from './auth';


const CustomButton = styled(Button)(({ theme }) => ({
  // Add custom styles here
  backgroundColor: '#2196F3',
  color: 'white',
  margin: '0 30px',
  '&:hover': {
    backgroundColor: '#2196G8',
  },
}));

const Navbar = () => {

  const auth = useAuth();
  

  useEffect(() => {
    
    localStorage.setItem('isLoggedIn', auth.isLoggedIn);
    console.log('Navbar: ', auth.isLoggedIn);
    
  
  },[auth.isLoggedIn]);

 
 return (


    <AppBar >
      <Toolbar >
        <IconButton href="/" sx={{flexDirection:'column',borderRadius:'0', marginRight:20, color:'white'}}> 
          <Typography variant="h5" >Habit</Typography>           
          <Typography variant="h5" >Banao</Typography>
        </IconButton>

        <Stack p={2} sx={{flexDirection:'row', flexGrow:1,justifyContent: 'right'}}>
 
          
          <Box>

              <Link to={"/Courses"}>
                <CustomButton variant='contained'>Course</CustomButton>
              </Link>

              <Link to="/create_course">
                <CustomButton variant='contained'>Create A Course</CustomButton>
              </Link>

              {!auth.isLoggedIn && 
                (<Link to={"/Login"}>
                  <CustomButton variant='contained'>Login</CustomButton>
                </Link>)}

              {auth.isLoggedIn && 
                (<Link to={"/Logout"}>
                  <CustomButton variant='contained'>Logout</CustomButton>
                </Link>)}



          </Box>
          
        </Stack>  

      </Toolbar>
    </AppBar>


  )
}

export default Navbar;