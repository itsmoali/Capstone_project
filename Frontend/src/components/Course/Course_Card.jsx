import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import CircleIcon from '@mui/icons-material/Circle';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Box, Grid, Stack } from '@mui/material';
import styled from '@mui/material/styles/styled';
import Button from '@mui/material/Button';


const Item = styled('div')(({ theme }) => ({
    display: 'flex',
    width: '100%',
    pr: 10,
  }));

const Course_Card = (courses) => {


    const [open, setOpen] = useState({});
    const handleEnter = (node) => {
        // You can access the DOM node (the collapsing container) here
        node.style.margin = '0px'; // Set the desired margin-left value
      };

    const handleClick = (topic) => {
        setOpen((prevState) => ({
          ...prevState,
          [topic]: !prevState[topic],
        }));
      };

    // const [topic, setTopic] = useState({});

    // const handleTopic = (courses) => {
    //     setTopic((prevState) => {
    //       const newTopicState = {};
      
    //       Object.entries(courses).forEach(([key, values], index) => {
    //         // values.course_details[index].day
    //         newTopicState[index] = values.course_details;
    //       });
      
    //       return {
    //         ...prevState,
    //         ...newTopicState,
    //       };
    //     });
    //   };

    // useEffect(() => {
    //     handleTopic(courses);
    // }, []);

    const course = Object.entries(courses).map((key,values) =>(
        
        
                <Stack  className="Main-box" key={key[1].course_name } sx={{mt:'20vh'}}>
                    <span style={{paddingBottom:'40px'}}>
                        <Link to={`/courses/:topic/${key[1].course_name}`} state={{data:courses.courses}} style={{ userSelect: 'none', textDecoration: 'none', color:'black' }}><b>{key[1].course_name}</b></Link>
                    </span>

                    <Stack  sx={{ width: '96%'}} >
                       
                        
                        
                            
                        {key[1].course_details.map((course) => (
                        <List key={course}>
                            
                            <Item >
                                <Button component={Link} to={`/courses/${course.topic}`} state={{data:course, current_course:key[1]}} sx={{flexGrow:1 ,textAlign:'start'}} >
                                    {/* <Link className='buttons' to={`/courses/${course.topic}`} state={{data:course, current_course:key[1]}} > */}
                                    
                                    <ListItemText  primary={`Day ${course.day} - ${course.topic}`}></ListItemText>
                                    
                                    {/* </Link> */}
                                    </Button>
                                <Button  onClick={() => handleClick(course.topic)} >
                                    {open[course.topic] ? <ExpandLess/> : <ExpandMore  />}
                                </Button>
                            </Item>

                            <Collapse in={open[course.topic]} timeout="auto" unmountOnExit> 
                                <List disablePadding >
                                    {Object.entries(course.subtopics).map((key,values) =>(
                                        <ListItemButton sx={{ pl: 4 }} key={key[0]}>
                                            <CircleIcon sx={{fontSize: 7, margin:2}}/>
                                            <ListItemText primary={key[0]} />
                                        </ListItemButton>
                                    
                                    ))}
                                    
                                </List>
                            </Collapse>
                        </List>
                        ))}
                    
                    </Stack>

                    <Box className="fotter">
                        {/* <div className="rating"> */}
                            <span><b>Rating:</b>4.6</span>
                        {/* </div> */}
                        {/* <div className="stats"> */}
                            <span><b>Difficulty:</b> {key[1].course_difficulty}</span>
                            <span><b>Time Required:</b> {key[1].course_duration}</span>
                        {/* </div> */}
                    </Box>
                </Stack>
            
    ))

    return(

        <Box>
            {course}
        </Box>
            

        
    )


}

export default Course_Card



    // Course_div = courseList.map((course) => {
    //   const jsonString = course.course_schedule.replace(/'/g, '"');
    //   const courseSchedule = JSON.parse(jsonString);
    //   return (
    //     
    //   );
