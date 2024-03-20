import React from 'react'
import { useLocation } from 'react-router-dom';
import Course_Card from './Course_Card';
import { useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { Stack, color } from '@mui/system';
import client from '../Auth/path';
import { useAuth } from '../Auth/auth';

const Individual_Details = () => {
  const {state} = useLocation();
  const auth = useAuth();
  const token = auth.token;

  function addCourse(){
    client.post('/usercourselist',{
      course_name: state.data.course_name,
    } ,{
      headers: {
        Authorization: `Token ${token}`, 
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      console.log(response.data)
      alert('Course Enrolled')
    }).catch((error) => {
      alert('Error')
    })
  }
  
  return (
    
    <Box sx={{p:7, bgcolor:'primary.main'}}>
      <Stack sx={{diplay:'flex', alignItems:'center'}}>

        <Course_Card courses = {state.data}></Course_Card>
        <Button sx={{bgcolor:'red',width:'30vw',p:'20px'}} onClick={addCourse}>Enroll</Button>
      </Stack>
    </Box>
  )
}

export default Individual_Details