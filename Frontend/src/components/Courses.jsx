import React from 'react'
import {Button, Container, Grid, Stack} from '@mui/material'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'




const Courses = () => {



  const [courseList, setCourseList] = useState([{"course_id": 1, "course_name": "Math", "course_description": "Mathematics is the study of numbers, shapes and patterns. The word comes from the Greek word \"μάθημα\" (máthema), meaning \"science, knowledge, or learning\", and is sometimes shortened to maths (in Englandsoogyhls.","skills_covered": "Algebra, Geometry, Calculus, Trigonometry, Statistics, and more","difficulty":"Easy","Time":"1 Month"}]);

  // useEffect(()=> {
  //   getCourseList();
    
  
  // }, []);

  // async function getCourseList() {
  //   try {
  //     const response = await axios.get('/courses');
  //     setCourseList(response.data);
  //     // console.log(response.data);
      
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  const Lst = courseList.map((course) => {
    return (
      <div class= "Main-box">
        <div class ="descriptions">
          <div class="desc-box">
            <div>
              <span><b>{course.course_name}</b></span>
              <br />
              <span>{course.course_description}</span>
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
            <span><b>Difficulty:</b> {course.difficulty}</span>
            
            <span><b>Time Required:</b> {course.Time}</span>
          </div>
        </div>
    </div>
    )
  })

  return (

    <Grid container direction="row" justifyContent="flex-start"  >
      <Stack sx={{ minWidth:'15vw', alignItems:"flex-end"}}>
        {/* <div>This is the side bar</div> */}
        <Link to="/create_course">
          <Button  variant='contained'>Create A Course</Button>
        </Link>
      </Stack>
      <Stack sx={{alignItems:'center',
      justifyContent:'center',
        flexGrow:'1'}}>
          {Lst}


      </Stack>

      </Grid>





  )
}

export default Courses