import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import Course_Card from './Course_Card';
import { useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Stack, color } from '@mui/system';
import client from '../Auth/path';
import { useAuth} from '../Auth/auth';
import Loading from '../Loading/Loading';
import Errors from '../Errors/Errors';
import Tracker  from './Tracker';
import Message from '../Errors/Message';

// Scroll to the top of the page when the component mounts



const Individual_Details = () => {
  const {state} = useLocation();
  const duration = state.data.course_duration.match(/\d+/);
  const auth = useAuth();
  const token = auth.token;
  const [enrolled, setEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [percentage, setPercentage] = useState(0);





  function tracker(){
    client.post('/userstats/m_percentage',{
          course_name: state.data.course_name,
        }, {
          headers: {
            Authorization: `Token ${token}`, 
            'Content-Type': 'application/json'
          }
        }).then((response) => {
          setPercentage(response.data.completion_percentage)
        }).catch((error) => {
          console.log(error)
        })}

  function addCourse(){
    client.post('/usercourselist',{
      course_name: state.data.course_name,
    } ,{
      headers: {
        Authorization: `Token ${token}`, 
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      setEnrolled(true)
      alert('Course Enrolled')


    }).catch((error) => {
      setError(true)
      console.log(error)
    })
  }



  // function check_enrolled(){
  //   setLoading(true)
  //   let apiCallCompleted = false;
  //   if(auth.user === null){
  //     setLoading(false)
  //     setEnrolled(false)
  //     apiCallCompleted = true;
  //   }
  //   else{
      
  //       client.get('/usercourselist', {
  //         headers: {
  //           Authorization: `Token ${token}`, 
  //           'Content-Type': 'application/json'
  //         }}).then((response) => {
  //           console.log(response.data)
  //           const data = response.data[0].courses
  //           if(data.length===0){
  //             setEnrolled(false)
  //             setLoading(false)
  //             setError(false)
  //           }
  //           else{
  //             data.map((course) => {
  //               if(course.course_name === state.data.course_name){
  //                 tracker()
  //                 setLoading(false) 
  //                 setError(false)
  //                 setEnrolled(true)}
  //               else{
  //                 setLoading(false)
  //                 setError(false)}
  //             })
  //             apiCallCompleted = true;
  //           }
  //         }).catch((error) => {
  //           console.log(error)
  //           setLoading(false)
  //           setError(true)
  //           apiCallCompleted = true;
  //         })
  //       }}

  // async function check_enrolled(){
  //   if(auth.user === null){
  //     setLoading(false)
  //     setEnrolled(false)
  //   }
  //   else{
  //       try{
  //         const response = await client.get('/usercourselist', {
  //           headers: {
  //             Authorization: `Token ${token}`, 
  //             'Content-Type': 'application/json'
  //           }
  //         })
  //         console.log("Getting it first",response.data)
  //         const data = await response.data[0].courses

  //         if(data.length===0){
  //           console.log('Not Enrolled')
  //           setEnrolled(false)
  //           setLoading(false)
  //           setError(false)
            
  //         }
  //         else{
  //           data.map((course) => {
            
  //           if(course && course.course_name === state.data.course_name){
  //             console.log('Enrolled')
  //             tracker()
  //             setLoading(false) 
  //             setError(false)
  //             setEnrolled(true)}
  //           else{
  //           setLoading(false)
  //           setError(false)}

  //         })}
  //         } catch(error){
  //           console.log(error)
  //           setLoading(false)
  //           setError(true)}
  //   }}

  async function check_enrolled() {
    if (auth.user === null) {
      setLoading(false);
      setEnrolled(false);
    } else {
      try {
        const response = await client.get('/usercourselist', {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json'
          }
        });
  
        if (response.data && response.data.length > 0) {
          const data = response.data[0].courses;
  
          if (data.length === 0) {
            setEnrolled(false);
            setLoading(false);
          } else {
            const enrolledCourse = data.find(course => course && course.course_name === state.data.course_name);
  
            if (enrolledCourse) {
              console.log('Enrolled');
              tracker();
              setLoading(false);
              setEnrolled(true);
            } 
          }
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    }
  }
  



  useEffect(() => {
    check_enrolled()

  },[addCourse])



  
  return (

    <Box sx={{bgcolor:'primary.main',color:'primary.getContrastText', height:'100%'}}>
      {loading && enrolled === false && <Loading></Loading>}
      {error && <Errors></Errors>}
      {!loading && !error && 
      <Stack sx={{diplay:'flex', alignItems:'start', mt:'10vh',p:7}}>

        <Box sx={{ '& > :first-child, & > :last-child': { marginBottom: '40px' } }}>
          <Typography variant='h3'>{state.data.course_name}</Typography>
          <Typography variant='h5'>What You will Learn:</Typography>
          <Typography variant='h6'  sx={{ ml: '100px' }}>{state.data.course_skills}</Typography>
          <Typography variant='body1' sx={{lineHeight:2.2,mt:'20px'}}>{state.data.course_summary}</Typography>

          {enrolled === true && <><Typography variant='h6' sx={{color:'green'}}>You are Enrolled in this Course</Typography> 
          <Tracker percentage={percentage}></Tracker></>
          } 
          {enrolled === false && auth.user && <Button sx={{bgcolor:'red',width:'10vw',p:'10px',mt:'20px'}} onClick={addCourse}>Enroll</Button>}
   
          {enrolled === false && !auth.user && <Message message={"Enroll"}></Message>}
          
          
          
        </Box>

        <Box sx={{mt:'20px'}}>
          <Typography variant='h6'>There are {duration} modules in this Course</Typography>

        <Course_Card courses = {state.data} enrolled={enrolled} ></Course_Card>
        </Box>
      </Stack>}
    </Box>
  )
        }


export default Individual_Details