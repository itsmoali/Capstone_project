import React, {useState, useEffect} from 'react'
import { Typography, Stack, Box, AppBar, Toolbar,IconButton, Button} from '@mui/material'
import styled from '@emotion/styled'
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import {auth} from '../firebase'

// Make a styled div constant for the different pages in the navbar. Design it in the way so the props would be the name of the page, which would be passed in the navbar component. There would be two lists, one for authenticated and one for unauthenticated users. The initial value would be display:none and then it would be changed in the functions below to display block.

// let Pages = ['Courses', 'Help', 'Login']

// await auth.onAuthStateChanged(user => {
//   if (user) {
//     console.log("user logged in",user)
//     Pages.push('Profile')
//     console.log(Pages)
//   }
//   else {

//     console.log("user logged out",user)
//   }
// })





const Navbar = () => {


  const [pages, setPages] = useState(['Courses', 'Help', 'Login'])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setPages(['Courses', 'Help', 'Profile', 'Logout'])
        setIsLoading(false)
        
        console.log(pages)
      }
      else {
        setPages(['Courses', 'Help', 'Login'])
        setIsLoading(false)
    
        console.log("user logged out",user)
      }
    })
  },[])



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
          
          <Box sx={{ flexGrow:1, display: 'flex', justifyContent:'space-between' }}>

            {pages.map((pages) => (

              <Button
                href={pages}
                key={pages}
                sx={{ my:1, color: 'white', display: 'block' }}
              >
                {pages}
              </Button>
            ))}




          </Box>
          
        </Stack>  

      </Toolbar>
    </AppBar>


  )
}

export default Navbar;