import React from 'react'
import {Button, Container, Grid, Stack} from '@mui/material'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'




const Courses = () => {



  const [courseList, setCourseList] = useState([])

  useEffect(()=> {
    getCourseList();
    
  
  }, []);

  async function getCourseList() {
    try {
      const response = await axios.get('/courses');
      setCourseList(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const Course_div = courseList.map((course) => {

    return (
      <div class= "Main-box">
        <div class ="descriptions">
          <div class="desc-box">
            <div>
              <span><b>{course.course_name}</b></span>
              <br />
              <span>{course.course_schedule}</span>
              <br />
            </div>
            <div>
              <span><b>Skills Learned:</b> {course.skills_covered}</span>
            </div>
          </div>

          <div class="image">
            <img id="img-bx" src="https://images.unsplash.com/photo-1619441207978-3d326c46e2c9?w=500&auto=format" />
          </div>
          
        </div>
        <div class="fotter">
          
          <div class="rating">
            <span><b>Rating:</b>4.6</span>
          </div>
          <div class="stats">
            <span><b>Difficulty:</b> {course.course_difficulty}</span>
            
            <span><b>Time Required:</b> {course.course_duration}</span>
          </div>
        </div>
    </div>
    )
  })

  return (

      <Stack sx={{alignItems:'center',
      justifyContent:'center',
        flexGrow:'1'}}>
          {Course_div}
        <div class='course-message'>
          <p>Not Satisfied with the Courses?</p>
          <p>Click the <b><Link to={"/create_course"}>Link</Link></b> to create your own Course</p>
          
        </div>
      </Stack>

  )
}

export default Courses