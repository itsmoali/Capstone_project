import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import Course_Card from './Course_Card';
import { useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Stack, color } from '@mui/system';
import client from '../Auth/path';
import { useAuth } from '../Auth/auth';
import Loading from '../Loading/Loading';
import Errors from '../Errors/Errors';


const Individual_Details = () => {
  const {state} = useLocation();
  const duration = state.data.course_duration.match(/\d+/);
  const auth = useAuth();
  const token = auth.token;
  const [enrolled, setEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);





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
      setError(true)
      console.log(error)
    })
  }

  async function check_enrolled(){
    try{
      const response = await client.get('/usercourselist', {
        headers: {
          Authorization: `Token ${token}`, 
          'Content-Type': 'application/json'
        }
      })
      response.data.map((course) => {
        setLoading(false)
        if(course.course_name === state.data.course_name){
          setEnrolled(true)
          setError(false)
        }
      })
      } catch(error){
        console.log(error)
        setLoading(false)
        setError(true)
      }}



  useEffect(() => {
    check_enrolled()
  },[check_enrolled])
  
  return (

    <Box sx={{p:7, bgcolor:'primary.main',color:'primary.getContrastText', height:'100%',mt:'10vh'}}>
      {loading && <Loading></Loading>}
      {error && <Errors></Errors>}
      {!loading && !error &&
      <Stack sx={{diplay:'flex', alignItems:'start'}}>

        <Box sx={{ '& > :first-child, & > :last-child': { marginBottom: '40px' } }}>
          <Typography variant='h3'>{state.data.course_name}</Typography>
          <Typography variant='h5'>What You will Learn:</Typography>
          <Typography variant='h6'  sx={{ ml: '100px' }}>{state.data.course_skills}</Typography>
          <Typography variant='body1' sx={{lineHeight:2.2,mt:'20px'}}>{state.data.course_summary}</Typography>
          {enrolled === true && <Typography variant='h6' sx={{color:'green'}}>You are Enrolled in this Course</Typography> } 
          {enrolled === false && <Button sx={{bgcolor:'red',width:'10vw',p:'10px',mt:'20px'}} onClick={addCourse}>Enroll</Button>}
        </Box>

        <Box sx={{mt:'20px'}}>
          <Typography variant='h6'>There are {duration} modules in this Course</Typography>

        <Course_Card courses = {state.data}></Course_Card>
        </Box>
      </Stack>}
    </Box>
  )
}

export default Individual_Details