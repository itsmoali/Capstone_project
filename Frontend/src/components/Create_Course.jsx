import { TextField, Grid, Button, Paper, styled, Box , Menu, MenuItem, Link} from '@mui/material'
import axios from 'axios'

import { useNavigate } from 'react-router-dom'
import {useState, useEffect} from 'react'
import { useAuth } from './auth';





const Item = styled('div') ({
  color: 'white',
  padding:'20px 20px 10px 10px',
  borderRadius: '10px',
})



const Create_Course = () => {



  const auth = useAuth();
  

  useEffect(() => {
    
    localStorage.setItem('isLoggedIn', auth.isLoggedIn);
    // setIsLoggedIn(auth.isLoggedIn);
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
  
  axios.post('/course/schedule',{
    course:Course_name,
    duration:Course_duration,
    difficulty:Course_difficulty
  }).then((response) => {
    setLoading(false);
    navigate('/schedule', {state: response.data});
  }).catch((error) => {
    console.log('Erros has been detected',error.response.data);
  });
}


  return (

   
    
    <Box >
      {loading && <p>Loading...</p>}
    
      <Menu
          sx ={{position: 'absolute'}}

          id = 'login-menu'
          anchorEl={anchorEl}
          open= {open}
          onClose = {handleClose}
          MenuListProps={{
          'aria-labelledby': 'basic-button',
          }}>
    <MenuItem onClick={handleClose} sx={{ fontWeight: 'bold' }}>
        <Link href="/login" >
          Login
        </Link>
        &nbsp; to Create a Course
    </MenuItem>

      </Menu>
      {!loading &&
      <Grid container spacing={2} >
        <Grid item xs={12} xl={12}>
          <Item>
            <TextField 
            placeholder={"Specify a Course"}
            label = "Course"
            onChange = {(e) => setCourse_name(e.target.value)}
            multiline maxRows={4}>
              
            </TextField>
          </Item>
        </Grid>
        <Grid item xs={12} xl={12}>
          <Item>
            <TextField placeholder={"Desired Course Duration"}
            label = "Duration"
            onChange = {(e) => setCourse_duration(e.target.value)}>
              
            </TextField>
          </Item>
        </Grid>
        <Grid item xs={12} xl={12}>
          <Item>
            <TextField placeholder={"Course Difficulty Level"}
            label = "Difficulty"
            onChange = {(e) => setCourse_difficulty(e.target.value)}>
            </TextField>
          </Item>
        </Grid>
        <Grid item xs={12} xl={12} width = '100px'>
          <Item>
            <TextField placeholder={"What would your desired schedule be?"} label = "Schedule">
            </TextField>
          </Item>
        </Grid>
      </Grid>}
      {auth.isLoggedIn && ((<Button 
      aria-controls={open ? "login-menu" : undefined}
      aria-haspopup="true"
      aria-expanded={open ? "true" : undefined} 
      variant='contained' 
      onClick={(submit_info)}>Submit</Button>))}

      {!auth.isLoggedIn && ((<Button variant='contained' onClick={handleClick}>Submit</Button>))}

  </Box>
  )


}

export default Create_Course

