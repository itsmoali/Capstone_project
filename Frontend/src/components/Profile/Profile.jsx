import React from 'react'
import { Box, Grid, Typography, Card, CardContent } from '@mui/material';
import UserCourses from './UserCourses';
import axios from 'axios';
import { useAuth } from '../Auth/auth';
import { useEffect, useState } from 'react';
import client from '../Auth/path';



const Profile = () => {

  const auth = useAuth();

  console.log(auth)




  return (
    <Box sx={{ height: '100%', bgcolor: 'grey' }}>
      
    <Grid container spacing={4} direction='column' justifyContent="center" alignItems="center" sx={{pt:'30vh'}}>
    <Typography variant="h4" align="center" > Welcome {auth.username} </Typography>
      <Grid item xs={12} md={6} >
      <Card
      sx={{
        bgcolor: '#2b2b2b', // Adjusted background color to complement black
        color: '#f0f0f0', // Adjusted text color for better contrast
        boxShadow: 5, // Added box shadow for a lifted effect
        borderRadius: '10px',
        minHeight: '50vh',
        textAlign: 'center',
      }}
    >
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>
        <Typography variant="h6" gutterBottom>
          Username: {auth.username}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Email: {auth.user}
        </Typography>
      </CardContent>
    </Card>
      </Grid>

      <Grid item xs={12} md={6} sx={{ mt: '10vh', pb: '10vh' }}>
        <Card sx={{ bgcolor: '#2b2b2b',color: '#f0f0f0', boxShadow: 5, borderRadius: '10px' }}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              My Courses
            </Typography>
            {/* Assuming UserCourses is a component displaying user's courses */}
            <UserCourses />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Box>
);
};


export default Profile