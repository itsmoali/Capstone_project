import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import {FAQ, About, Contact} from './index'


const Home = () => {

return (
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: '64 px',
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Habit Banao
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              A Transformative Habit-Building application, that would help you in creating new habits
              in a sustainable manner, with greater accountability.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained" href='/Signup'>Join Now</Button>
              <Button variant="contained" href='/create_course'>View Demo</Button>
            </Stack>
            <About/>
            <FAQ/>
            <Contact/>
          </Container>
        </Box>
      </main>
    );
}

export default Home


