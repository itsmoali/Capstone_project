import { TextField, Grid, Button, Paper, styled, Box , Menu, MenuItem, Link, Typography} from '@mui/material'
import axios from 'axios'

import { useNavigate } from 'react-router-dom'
import {useState, useEffect} from 'react'
import { useAuth } from '../Auth/auth';
import client from '../Auth/path.js';

const Create_Course = () => {



  const auth = useAuth();
  

  useEffect(() => {
    
    localStorage.setItem('isLoggedIn', auth.isLoggedIn);
    console.log(auth.isLoggedIn);
  },[auth.isLoggedIn]);

    const [anchorEl, setAnchorEl]= useState(null);
    const [Course_name, setCourse_name] = useState(null);
    const [Course_duration, setCourse_duration] = useState(null);
    const [Course_difficulty, setCourse_difficulty] = useState(null);
    const [loading, setLoading] = useState(false);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    } 

    const handleClose = () => {
      setAnchorEl(null);
    }
    
    
const navigate = useNavigate();

function submit_info(e){
  e.preventDefault();
  setLoading(true);

  //This code snippet uses the axios library to make a POST request to the '/create/schedule' endpoint.
  //The POST request includes data related to a course, such as its name, duration, and difficulty.
  client.post('/create/schedule',{
    course:Course_name,
    duration:Course_duration,
    difficulty:Course_difficulty
  }).
  //# The 'then' block executes when the POST request is successful and sends
  // the user and course data to the '/schedule' endpoint. 
  then((response) => {
    setLoading(false);
    navigate('/schedule', {state: response.data});
  }).
  // The 'catch' block executes when the POST request is unsuccessful.
  catch((error) => {
    console.log('Erros has been detected',error.response.data);
  });
}


  return (
    
    <Box  sx={{display:'flex',height:'75vh', alignContent:'center', alignItems:'center',flexDirection:'column',mt:'15vh'}}>
      {loading && <h1>Loading...</h1>}

      
      {!loading &&
      <Grid container spacing={4}  sx={{justifyContent:'center', flexDirection:'column', alignItems:'center',paddingBottom:'20px',
      paddingTop:'40px'}}>
                <Grid item >
          <Typography variant='h4'>Course Creation</Typography>
        </Grid>
        <Grid item>
          <Typography variant='h6'> Enter the following information to create a Course Schedule:</Typography>
        </Grid>
        <Grid item>
          <Typography variant='h6'>Course Name: The Subject that you would want to learn about</Typography>
        </Grid>
        <Grid item>
          <Typography variant='h6'>Duration: The total duration of the course, in days.</Typography>
        </Grid>
        <Grid item>
          <Typography variant='h6'>Difficulty: The difficulty level you would prefer.</Typography>
        </Grid>
        <Grid item >
            <TextField 
            required
            placeholder={"Specify a Course"}
            label = "Course"
            onChange = {(e) => setCourse_name(e.target.value)}>
            </TextField>
        </Grid>

        <Grid item >
            <TextField placeholder={"Desired Course Duration"}
            required
            label = "Duration"
            onChange = {(e) => setCourse_duration(e.target.value)}>
            </TextField>
        </Grid>

        <Grid item >
            <TextField placeholder={"Desired Difficulty Level"}
            required
            label = "Difficulty"
            onChange = {(e) => setCourse_difficulty(e.target.value)}>
            </TextField>
        </Grid>    
        <Grid item >
          {auth.isLoggedIn && ((<Button 
          aria-controls={open ? "login-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined} 
          variant='contained' 
          onClick={(submit_info)}>Submit</Button>))}

          {!auth.isLoggedIn && ((<Button variant='contained' onClick={handleClick}>Submit</Button>))}
        </Grid>
        <Menu
          id = 'login-menu'
          anchorEl={anchorEl}
          open= {open}
          onClose = {handleClose}
          MenuListProps={{
          'aria-labelledby': 'basic-button',
          }}>
          <MenuItem onClick={handleClose} >
              <Link href="/login" >
                <b>Login</b>
              </Link>
              &nbsp; to Create a Course
          </MenuItem>
      </Menu>
      </Grid>}


  </Box>
  )


}

export default Create_Course

