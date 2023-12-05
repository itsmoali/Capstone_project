import React from 'react'
import {Button, Container, Grid, Stack, colors} from '@mui/material'
import axios from 'axios'
import { Link, useNavigate, useLocation} from 'react-router-dom'
import { useEffect, useState } from 'react'




function Schedule() {


  const location = useLocation();
  const courseList = location.state ;
  console.log(courseList);

  const navigate = useNavigate();


    // const [courseList, setCourseList] = useState([{
    //     "course_name": "Piano Basics for Beginners",
    //     "course_difficulty": "Beginner",
    //     "course_duration": "10 days",
    //     "course_schedule": "[{'day': 1, 'topic': 'Introduction to Piano', 'subtopics': ['Parts of the piano', 'Proper hand position', 'Basic music theory']}, {'day': 2, 'topic': 'Finger Exercises and Scales', 'subtopics': ['Finger strengthening exercises', 'Major and minor scales', 'Playing scales with proper fingering']}, {'day': 3, 'topic': 'Reading Sheet Music', 'subtopics': ['Understanding musical notes', 'Identifying notes on the staff', 'Basic rhythm and timing']}, {'day': 4, 'topic': 'Playing Simple Melodies', 'subtopics': ['Learning to play simple tunes', 'Using both hands together', 'Basic melody interpretation']}, {'day': 5, 'topic': 'Chords and Chord Progressions', 'subtopics': ['Understanding basic chords', 'Playing common chord progressions', 'Accompaniment techniques']}, {'day': 6, 'topic': 'Rhythm and Dynamics', 'subtopics': ['Mastering basic rhythms', 'Understanding dynamics (loudness and softness)', 'Applying dynamics to music']}, {'day': 7, 'topic': 'Mid-Term Review and Practice', 'subtopics': ['Recap of key concepts', 'Practice session', 'Feedback and Q&A']}, {'day': 8, 'topic': 'Introduction to Music Theory', 'subtopics': ['Understanding scales and intervals', 'Chord construction', 'Basic harmony']}, {'day': 9, 'topic': 'Exploring Different Musical Styles', 'subtopics': ['Introduction to various music genres', 'Playing simple pieces from different styles', 'Developing musical preferences']}, {'day': 10, 'topic': 'Course Conclusion and Performance', 'subtopics': ['Review of course highlights', 'Performance preparation', 'Final performance and certificates']}]"
    // }]);

    // const [courseList, setCourseList] = useState([])
    
    // const [courseSchedule, setCourseSchedule] = useState([])

      // useEffect(()=> {
      //   getCourseList();
        
      
      // }, []);
    
      // async function getCourseList() {
      //   try {
      //     const response = await axios.post('/course/schedule');
      //     setCourseList(response.data);
      //     // setCourseSchedule(JSON.parse(response.data[0].course_schedule.replace(/'/g, "\"")));
      //     console.log(response.data);
          
      //   } catch (error) {
      //     console.error(error);
      //   }
      // }

      function save_info() {


        axios.post('/courses/create', courseList).then((response) => {
          console.log("Information has beed abbed to database.")
          navigate('/courses')

        }).catch((error) => {
          console.log("Error has been detected", error.response.data);
        })


      }




      const Lst = 
        
          <div class= "demo-schedule" >

                <div>
                  <span><b>{courseList['course']}</b></span>
                  <br />
                  <h3>Course Schedule</h3>
                  {courseList['schedule'].map(item => (
                    <div>
                      <span><b>Day {item.day}: {item.topic}</b></span>
                      <br />
                      {item.subtopics.map((subtopic, index) => (
                        <div>
                          <span>{index+1}. {subtopic}</span>
                          <br />
                        </div>
                      
                      ))}
                    </div>
                  
                  ))}
                  <br />
                </div>
                <span><b>Difficulty:</b> {courseList['difficulty']}</span>
                <span><b>Time Required:</b> {courseList['duration']}</span>
           
          </div>
      
    
      return (
    

    
        <Stack spacing={{ xs: 1, sm: 2}} direction="column"  justifyContent="center" alignItems="center" sx={{mt:20}}>
            {Lst}
          {/* <div>This is the side bar</div> */}
          <Container  sx={{display:'flex', justifyContent:'space-evenly',padding:'30px 0px 50px 0px'}}>

              <Button onClick={(save_info)} variant='contained'>Finalize</Button>

            <Link to="/#">
                <Button  variant='contained'>Make Changes</Button>
            </Link>
        </Container>


        </Stack> 

    
    
    
    
    
      )
}

export default Schedule