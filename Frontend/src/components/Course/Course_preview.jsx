import React from 'react'
import client from '../Auth/path.js';
import { useState, useEffect } from 'react';
import styled from '@mui/material/styles/styled';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import CircleIcon from '@mui/icons-material/Circle';
import { Link, useParams } from 'react-router-dom';
import { Box, Grid, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';


const Item = styled('div')(({ theme }) => ({
    padding: theme.spacing(1),
    textAlign: 'center',
    borderRadius: 2,
    flexGrow: 1,
  }));
  

const Course_preview = (courses) => {

    const course = Object.entries(courses).map((key,values) =>(
        
        
        <Stack key={key[1].course_name } sx={{mt:'20vh',bgcolor:'primary.background',color:'primary.getContrastText',width:'33vw',maxHeight:'60vh',display:'flex', boxSizing:'border-box', borderRadius:'10px'}}>
            
            <Box sx={{width:'30vw', display:'flex', justifyContent:'space-around'}}>
              <img src={key[1].course_image} alt="course_image" style={{width:'90%',height:'250px', borderRadius: '10px', objectFit:'fill'}}/>
            </Box>

            <Box sx={{p:2, display:'flex',flexDirection:'column'}}  >
              <span style={{paddingBottom:'40px',pt:2}}>
                
                  <Link to={`/courses/:topic/${key[1].course_name}`} state={{data:courses.courses, course_name:key[1].course_name}} style={{ userSelect: 'none', textDecoration: 'none', color:'white', fontSize:'20px'}}><b>{key[1].course_name}</b></Link>
              </span>

              
              <Typography sx={{fontSize: 15,fontWeight: 400, pb:2}}>
                <b>Skills you'll Gain:</b> {key[1].course_skills}
              </Typography>

              <Typography sx={{fontSize: 15,fontWeight: 400, display: 'flex', justifyContent: 'space-between', alignContent:'flex-end'}}>
                <span ><b>Rating:</b>4.6</span>
                <span><b>Difficulty:</b> {key[1].course_difficulty}</span>
                <span><b>Time Required:</b> {key[1].course_duration}</span>
              </Typography>

            </Box>

        </Stack>
    
))


  return (

    <Box>
        {course}
    </Box>
  )
}

export default Course_preview