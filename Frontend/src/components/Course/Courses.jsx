import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Stack, Grid, Box} from '@mui/material';
import { blue, pink } from '@mui/material/colors';
import Course_Card from "./Course_Card"
import SideBar from './SideBar';
import styled from '@mui/material/styles/styled';
import client from '../Auth/path.js';
import Course_preview from './Course_preview.jsx';
import Loading from '../Loading/Loading.jsx';
import Errors from '../Errors/Errors.jsx';
import { useAuth } from '../Auth/auth.js';


const Item = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: 'center',
  borderRadius: 2,
  // flexGrow: 1,
}));

const Courses = () => {
  const auth = useAuth();
  console.log(auth)
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCourseList();
  }, []);

  async function getCourseList() {
    try {
      const response = await client.get('/courses/', {
      });
      setCourseList(response.data);
      setLoading(false);

    } catch (error) {
      setLoading(false);
      setError(true);
      console.error(error);
    }
  }

 


  return (
    <Stack   direction={{ xs: 'column', xl: 'column' }}
    spacing={{ xs: 1, sm: 1, md: 6 }}
    sx={{bgcolor:'primary.main', display:'flex', justifyContent:'center', alignItems:'center',pb:10}}>
      
      {/* <Item>
        <SideBar></SideBar> 
      </Item> */}
      {loading && <Loading />}
      {error && <Errors />}
      {!loading && !error &&
      <>
    <Box>
      {courseList.map((course) => (
          <Course_preview courses={course} />
      ))}
    </Box>

      <Box className='course-message'>
          <p>Not Satisfied with the Courses?</p>
          <p>
            Click the <b><Link to={"/create_course"}>Link</Link></b> to create your own Course
          </p>
      </Box>
      </>
}
    </Stack>
  );
};

export default Courses;
