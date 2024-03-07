import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Stack, Grid, Box} from '@mui/material';
import { blue, pink } from '@mui/material/colors';
import Course_Card from "./Course_Card"
import SideBar from './SideBar';
import styled from '@mui/material/styles/styled';
import client from '../Auth/path.js';

const Item = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: 'center',
  borderRadius: 2,
  flexGrow: 1,
}));

const Courses = () => {
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    getCourseList();
  }, []);

  async function getCourseList() {
    try {
      const response = await client.get('/courses/', {
      });
      setCourseList(response.data);
    } catch (error) {
      console.error(error);
    }
  }

 


  return (
    // <Grid sx={{ alignItems: 'center', justifyContent: 'center', flexGrow: '1' }}>
    <Stack   direction={{ xs: 'row', xl: 'row' }}
    spacing={{ xs: 1, sm: 1, md: 4 }}>
      
      {/* <Item>
        <SideBar></SideBar>
      </Item> */}

      <Item sx={{flexGrow:4}}>
        {courseList.map((course)=> (
            <Course_Card courses = {course}></Course_Card>
        ))}
        
        <Box className='course-message'>
          <p>Not Satisfied with the Courses?</p>
          <p>
            Click the <b><Link to={"/create_course"}>Link</Link></b> to create your own Course
          </p>
      </Box>
      </Item>
    </Stack>
  );
};

export default Courses;
