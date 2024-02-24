import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import {FAQ, About, Contact,Info, Main, Navbar} from './index'
import '../../App.css';
import { Stack, Container } from '@mui/material';



const Home = () => {

return (

 

  <Stack  direction="column"  sx={{ scrollSnapType: 'y mandatory', overflowY: 'scroll','&::-webkit-scrollbar': {
    display: 'none', // Hide the scrollbar
  }, height: '100vh' }}>
 
    
  <Box id="main" sx={{ scrollSnapAlign: 'start',bgcolor: 'primary.main', pt:'10vh' }}>
    <Main />
  </Box>
  <Box id="about" sx={{ scrollSnapAlign: 'start',pt:'10vh'  }}>
    <About />
  </Box>
  {/* <Box id="info" sx={{ scrollSnapAlign: 'start',bgcolor: 'primary.main' }}>
    <Info />
  </Box>
  <Box id="faq" sx={{ scrollSnapAlign: 'start' }}>
    <FAQ />
  </Box>
  <Box id="contact" sx={{ scrollSnapAlign: 'start' }}>
    <Contact />
  </Box> */}
</Stack>
      
    );
}

export default Home


