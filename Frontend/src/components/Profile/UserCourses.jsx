import React, { useEffect, useState } from 'react'
import { Box, Grid, Stack } from '@mui/material';
import { useAuth } from '../Auth/auth';
import client from '../Auth/path';
import Course_Card from '../Course/Course_Card';
import Course_preview from '../Course/Course_preview';
import Loading from '../Loading/Loading';







const UserCourses = () => {

  const auth = useAuth();
  
  const [courselist, setCourseList] = useState([]);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
      setCourseList(response.data);
    } catch (error) {
      console.error(error);
    }}

    

  return (
    <Box sx={{height:'100%'}}> 
        {loading && <Loading />}
        {!loading &&
        <Stack sx={{mt:'-20vh'}}>
        {courselist.map((course)=> (
            <Course_preview courses={course} />
        ))}
        </Stack>}
    </Box>
  )
}

export default UserCourses