import React from 'react';
import Box from '@mui/material/Box';
import { FAQ, About, Contact, Info, Main, Navbar } from './index';
import '../../App.css';
import { Stack } from '@mui/material';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Home = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <Stack
      direction="column"
      sx={{
        ...(isLargeScreen && {
          scrollSnapType: 'y mandatory',
          overflowY: 'scroll',
          '&::-webkit-scrollbar': {
            display: 'none', // Hide the scrollbar
          },
        }),
        height: '100vh',
      }}
    >
      <Navbar id="navbar" />

      <Box
        id="main"
          sx={{
            ...(isLargeScreen && { scrollSnapAlign: 'end'}),
            bgcolor: 'primary.main',
            position: 'relative',
          }}
      >
        <Main />
      </Box>
      <Box
        id="about"
        sx={{
          ...(isLargeScreen && { scrollSnapAlign: 'end' }),
          position: 'relative',
          // top: '10vh', // Adjust this value based on your Navbar height
        }}
      >
        <About />
      </Box>
      <Box
        id="info"
        sx={{
          ...(isLargeScreen && { scrollSnapAlign: 'end' }),
          bgcolor: 'primary.main',
          position: 'relative',
          // top: '10vh', // Adjust this value based on your Navbar height
        }}
      >
        <Info />
      </Box>
      <Box
        id="faq"
        sx={{
          ...(isLargeScreen && { scrollSnapAlign:'end' }),
          position: 'relative',
          // top: '10vh', // Adjust this value based on your Navbar height
        }}
      >
        <FAQ />
      </Box>
      {/* <Box
        id="contact"
        sx={{
          ...(isLargeScreen && { scrollSnapAlign: 'start' }),
          position: 'relative',
          // top: '10vh', // Adjust this value based on your Navbar height
        }}
      >
        <Contact />
      </Box> */}
    </Stack>
  );
};


export default Home;
