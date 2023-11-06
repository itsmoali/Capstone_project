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
  margin: '0 35px',
  '&:hover': {
    backgroundColor: '#2196G8',
  },
}));

const Navbar = () => {

  const auth = useAuth();
  

  useEffect(() => {
    
    localStorage.setItem('isLoggedIn', auth.isLoggedIn);
    // setIsLoggedIn(auth.isLoggedIn);
    console.log('Navbar: ', auth.isLoggedIn);
    
  
  },[auth.isLoggedIn]);

 
 return (


    <AppBar >
      <Toolbar >
        <IconButton href="/" sx={{flexDirection:'column',borderRadius:'0', marginRight:20, color:'white'}}> 
          <Typography variant="h5" >Habit</Typography>           
          <Typography variant="h5" >Banao</Typography>
        </IconButton>

        <Stack p={2} sx={{flexDirection:'row', flexGrow:1}}>
          <Box sx={{flexGrow:1}}>
            <input type="text" placeholder='Search' style={{width:'50%', padding:"12px 20px", display:'inline-block', border:'1px solid #ccc',
          borderRadius:'4px', borderRight:'none', outline:'none'}} />
          <SearchIcon sx={{width:'10%',my:-2, padding:'9px', backgroundColor:'#2196F3', borderRadius:2,
        borderLeft:'none'}}></SearchIcon>
          </Box>
          
          <Box sx={{ flexGrow:'0.25', display: 'flex', justifyContent: 'flex-end'}}>

              <Link to={"/Courses"}>
                <CustomButton variant='contained'>Courses</CustomButton>
              </Link>

              <Link to={"/Help"}>
                <CustomButton variant='contained'>Help</CustomButton>
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