import React, { useEffect, useState } from 'react';
import { Button, Container, Grid, Stack } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Courses = () => {
  const [courseList, setCourseList] = useState([]);

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
    } catch (error) {
      console.error(error);
    }
  }

  let Course_div;

  if (Array.isArray(courseList) && courseList.length > 0) {
    Course_div = courseList.map((course) => {
      const jsonString = course.course_schedule.replace(/'/g, '"');
      const courseSchedule = JSON.parse(jsonString);
      return (
        <div className="Main-box" key={course.course_id}>
          <div className="descriptions">
            <div className="desc-box">
              <div>
                <span><b>{course.course_name}</b></span>
                <br />
                {courseSchedule.map((Schedule) => (
                  <div key={Schedule.day}>
                    <h4>Day {Schedule.day}: {Schedule.topic}</h4>
                  </div>
                ))}
                <br />
              </div>
            </div>
          </div>
          <div className="fotter">
            <div className="rating">
              <span><b>Rating:</b>4.6</span>
            </div>
            <div className="stats">
              <span><b>Difficulty:</b> {course.course_difficulty}</span>
              <span><b>Time Required:</b> {course.course_duration}</span>
            </div>
          </div>
        </div>
      );
    });
  } else {
    Course_div = <p>No courses available.</p>;
  }

  return (
    <Stack sx={{ alignItems: 'center', justifyContent: 'center', flexGrow: '1' }}>
      {Course_div}
      <div className='course-message'>
        <p>Not Satisfied with the Courses?</p>
        <p>
          Click the <b><Link to={"/create_course"}>Link</Link></b> to create your own Course
        </p>
      </div>
    </Stack>
  );
};

export default Courses;