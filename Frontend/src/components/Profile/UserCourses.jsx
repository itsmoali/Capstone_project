import React, { useEffect, useState } from 'react'
import { Box, Grid, Stack } from '@mui/material';
import { useAuth } from '../Auth/auth';
import client from '../Auth/path';
import Course_Card from '../Course/Course_Card';








const UserCourses = () => {

  const auth = useAuth();
  
  const [courselist, setCourseList] = useState([]);

  useEffect (() => {

    getCourseList();

  },[])

  async function getCourseList() {
    try {
      const response = await client.get('/usercourselist', {
        headers: {
          "Authorization": `Token ${auth.token}`
        }
      });
      setCourseList(response.data);
    } catch (error) {
      console.error(error);
    }}

    

  return (
    <Box> 
        <h1>Your Courses</h1>
        <Stack>
        {courselist.map((course)=> (
            <Course_Card courses = {course}></Course_Card>
        ))}
        </Stack>
    </Box>
  )
}

export default UserCourses