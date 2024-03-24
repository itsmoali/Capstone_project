import React from 'react'
import { Box, Grid, Stack } from '@mui/material';
import UserCourses from './UserCourses';
import axios from 'axios';
import { useAuth } from '../Auth/auth';
import { useEffect, useState } from 'react';
import client from '../Auth/path';



const Profile = () => {





  return (
    <Box sx={{height:'100%', bgcolor:'grey'}}>  
      <Grid container sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <Grid item xs={12} md={6}>
            <h1>Profile</h1>
            <h2>Username: </h2>
            <h2>Email: </h2>
        </Grid>
        
        <Grid item xs={12} md={6} sx={{mt:'20vh',pb:'10vh'}}>
          <h1>My Courses</h1>
          <UserCourses />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Profile