import React from 'react';
import Box from '@mui/material/Box';
import { FAQ, About, Contact, Info, Main, Navbar } from './index';
import '../../App.css';
import { Stack } from '@mui/material';


const Home = () => {
  return (
    <Stack
      direction="column"
      sx={{
        scrollSnapType: 'y mandatory',
        overflowY: 'scroll',
        '&::-webkit-scrollbar': {
          display: 'none', // Hide the scrollbar
        },
        height: '100vh',
      }}
    >
      <Navbar id="navbar" />

      <Box
        id="main"
        sx={{
          scrollSnapAlign: 'end',
          bgcolor: 'primary.main',
          position: 'relative',
          top: '10vh', // Adjust this value based on your Navbar height
        }}
      >
        <Main />
      </Box>
      <Box
        id="about"
        sx={{
          scrollSnapAlign: 'end',
          position: 'relative',
          top: '10vh', // Adjust this value based on your Navbar height
        }}
      >
        <About />
      </Box>
      <Box
        id="info"
        sx={{
          scrollSnapAlign: 'end',
          bgcolor: 'primary.main',
          position: 'relative',
          top: '10vh', // Adjust this value based on your Navbar height
        }}
      >
        <Info />
      </Box>
      <Box
        id="faq"
        sx={{
          scrollSnapAlign: 'end',
          position: 'relative',
          top: '10vh', // Adjust this value based on your Navbar height
        }}
      >
        <FAQ />
      </Box>
      <Box
        id="contact"
        sx={{
          scrollSnapAlign: 'end',
          position: 'relative',
          top: '10vh', // Adjust this value based on your Navbar height
        }}
      >
        <Contact />
      </Box>
    </Stack>
  );
};

export default Home;
