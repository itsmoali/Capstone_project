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
      <div>
        <ul key={course.course_id}>
        <p>{course.course_name}</p>
        <span>{course.course_description}</span>
      </ul>
    </div>
    )
  })

  return (


      <Grid container direction="row" lg={12} spacing={2} sx={{paddingLeft:'40px'}} >
          {Lst}
          <Link to="/create_course">
            <Button  variant='contained'>Create A Course</Button>
          </Link>
          
      </Grid>




  )
}

export default Courses