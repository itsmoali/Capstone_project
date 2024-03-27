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
import { Box, Grid, Menu, MenuItem, Stack } from '@mui/material';
import styled from '@mui/material/styles/styled';
import Button from '@mui/material/Button';
import { useAuth } from '../Auth/auth';



const Item = styled('div')(({ theme }) => ({
    display: 'flex',
    width: '100%',
    pr: 10,
  }));

const Course_Card = ({courses, enrolled}) => {


    const auth = useAuth();
    const [anchorEl, setAnchorEl]= useState(null);





    const opened = Boolean(anchorEl);
    const menuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    } 

    const menuClose = () => {
      setAnchorEl(null);
    }

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

    
    const course = Object.entries({courses}).map((key,values) =>(

                <Stack  key={key[1].course_name } sx={{bgcolor:'primary.background',color:'primary.getContrastText',borderRadius:'10px',boxSizing:'border-box'}}>

                    <Stack  sx={{ width: '50vw',p:1.5}} >
                        {console.log(key[1].course_name)}
                               
                        {key[1].course_details.map((course) => (
                        <List key={course}>
                            
                            <Item sx={{fontSize: '140%'}} >


                                {auth.user === null  && 
    
                                    <Button onClick={menuOpen} sx={{flexGrow:1 ,textAlign:'start'}} >
                                        <ListItemText primaryTypographyProps={{fontSize:'20px'}} primary={`Day ${course.day} - ${course.topic}`} ></ListItemText>
                                    </Button>
                                }
                                {auth.user !== null && enrolled===false  && 

                                    <Button onClick={menuOpen} sx={{flexGrow:1 ,textAlign:'start'}} >
                                        <ListItemText primaryTypographyProps={{fontSize:'20px'}} primary={`Day ${course.day} - ${course.topic}`} ></ListItemText>
                                    </Button>
                                }
                                
                                {auth.user !== null && enrolled===true  &&
                                <Button component={Link} to={`/courses/${course.topic}`} state={{data:course, current_course:key[1]}} sx={{flexGrow:1 ,textAlign:'start'}} >
                                    <ListItemText primaryTypographyProps={{fontSize:'20px'}} primary={`Day ${course.day} - ${course.topic}`} ></ListItemText>
                                </Button>}
                                
                                
                                <Button  onClick={() => handleClick(course.topic)} >
                                    {open[course.topic] ? <ExpandLess/> : <ExpandMore  />}
                                </Button>
                            </Item>

                            <Collapse in={open[course.topic]} timeout="auto" unmountOnExit> 
                                <List disablePadding >
                                    {Object.entries(course.subtopics).map((key,values) =>(
                                        <ListItemButton sx={{ pl: 4 }} key={key[0]}>
                                            <CircleIcon sx={{fontSize: 7, margin:2}}/>
                                            <ListItemText primaryTypographyProps={{fontSize:'20px'}}  primary={key[0]} />
                                        </ListItemButton>
                                    
                                    ))}
                                    
                                </List>
                            </Collapse>
                        </List>
                        ))}
                    </Stack>
                    
        <Menu
          id = 'login-menu'
          anchorEl={anchorEl}
          open= {opened}
          onClose = {menuClose}
          MenuListProps={{
          'aria-labelledby': 'basic-button',
          }}>
            {auth.user === null &&
          <MenuItem onClick={menuClose} >
              <Link href="/login" >
                <b>Login</b>
              </Link>
              &nbsp; to View Course Details
          </MenuItem>}
          {auth.user !== null && enrolled === false &&
            <MenuItem onClick={menuClose} >
                <b>Enroll </b>&nbsp; to View Course Details
            </MenuItem>}
      </Menu>
    </Stack>
            
    ))

    return(

        <Box sx={{bgcolor:'primary.main'}}>

            {course}

        </Box>
            

        
    )

}

export default Course_Card

