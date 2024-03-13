import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Errors from '../Errors/Errors';
import axios from 'axios';
import { Stack, Grid, Box} from '@mui/material';
import { blue, pink } from '@mui/material/colors';
import Course_Card from "./Course_Card"
import SideBar from './SideBar';
import styled from '@mui/material/styles/styled';

const Item = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: 'center',
  borderRadius: 2,

}));



const Courses = () => {
  const [courseList, setCourseList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCourseList();
  }, []);

  async function getCourseList() {
    try {
      const response = await axios.get('/courses', {
        headers: {
          'Access-Control-Allow-Origin': true,
          'Content-Type': 'application/json',
        },
      });
      setCourseList(response.data);
      setError(false);
    } catch (error) {
      // console.error(error);
      setError(true)
    }
  }

 

  return (
    <Box>
      {error===true && <Errors />}
      {error===false &&
      <Box sx={{ width: '100%'}}>
          <Stack
            alignItems="center"
            direction={{ xs: 'column', xl: 'column' }}
            spacing={{ xs: 1, sm: 1, md: 4 }}
            sx={{ bgcolor: 'primary.main', pb:'30px' }}>
        {/* Uncomment the following lines if needed */}
        {/* <Item>
          <SideBar />
        </Item> */}

        <Item >
          {courseList.map((course, index) => (
            <Course_Card key={index} courses={course} />
          ))}
        </Item>
        <Box className='course-message' >
            <p>Not Satisfied with the Courses?</p>
            <p>
              Click the <b><Link to={"/create_course"}>Link</Link></b> to create your own Course
            </p>
          </Box>
          
      </Stack>
  </Box>
  }
  </Box>
  );
};

  

export default Courses;


