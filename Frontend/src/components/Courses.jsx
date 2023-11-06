import React from 'react'
import {Button, Container, Grid} from '@mui/material'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

// const course_list = ['Chess', 'Japanese','Python','Robotics']




// async function getCourseList() {
//   try {
//     const response = await axios.get('/courses');
//     console.log(response.data);
    
//   } catch (error) {
//     console.error(error);
//   }
// }



const Courses = () => {



  const [courseList, setCourseList] = useState([]);

  useEffect(()=> {
    getCourseList();
    
  
  }, []);

  async function getCourseList() {
    try {
      const response = await axios.get('/courses');
      setCourseList(response.data);
      // console.log(response.data);
      
    } catch (error) {
      console.error(error);
    }
  }

  const Lst = courseList.map((course) => {
    return (
      <li key={course.course_id}>
      <p>{course.course_name}</p>
      <span>{course.course_description}</span>
    </li>
    )
  })

  return (


      <Grid container direction="row" lg={12} spacing={2} >
        <Grid item direction="column" lg={4} sm={6}  spacing ={2} sx={{ width: 128, height: 80 }}>
          <h5>Chess</h5>
          </Grid>
          <Grid item direction="column" lg={4} sm={6} spacing ={12} sx={{ width: 128, height:80 }}>
          <h5>Python</h5>
          
          </Grid>

          <ul>{Lst}</ul>
          <Link to="/create_course">
            <Button  variant='contained'>Create A Course</Button>
          </Link>
          
      </Grid>




  )
}

export default Courses