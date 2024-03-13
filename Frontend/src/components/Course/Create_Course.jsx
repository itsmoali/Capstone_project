import { TextField, Grid, Button, Paper, styled, Box , Menu, MenuItem, Link, Typography, FormControl, InputLabel, Select, InputAdornment, OutlinedInput} from '@mui/material'
import axios from 'axios'
import Loading from '../Loading/Loading'
import Errors from '../Errors/Errors'
import { Form, useNavigate } from 'react-router-dom'
import {useState, useEffect} from 'react'
import { useAuth } from '../Auth/auth';


const Create_Course = () => {



  const auth = useAuth();
  

  useEffect(() => {
    
    localStorage.setItem('isLoggedIn', auth.isLoggedIn);
    console.log(auth.isLoggedIn);
  },[auth.isLoggedIn]);

    const [anchorEl, setAnchorEl]= useState(null);
    const [Course_name, setCourse_name] = useState(null);
    const [Course_duration, setCourse_duration] = useState('');
    const [Course_difficulty, setCourse_difficulty] = useState('');
    const [Course_duration_custom, setCourse_duration_custom] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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
  
  axios.post('/create/schedule',{
    course:Course_name,
    duration:Course_duration,
    difficulty:Course_difficulty
  }).then((response) => {
    setLoading(false);
    setError(false);
    navigate('/schedule', {state: response.data});
  }).catch((error) => {
    console.log('Erros has been detected',error.response.data);
    setLoading(false);
    setError(true);
  });
}


  return (
    
    <Box  sx={{display:'flex',height:'75vh', alignContent:'center', alignItems:'center',flexDirection:'column',mt:'15vh'}}>
      {loading && <Loading/>}

      {console.log(Course_duration)}

      {!loading && error && <Errors/>}

          
      {!loading && !error &&
      <Grid container spacing={4}  sx={{justifyContent:'center', flexDirection:'column', alignItems:'center',paddingBottom:'20px',
      paddingTop:'40px'}}>
                <Grid item  >
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
            sx={{width:'11.5vw'}} 
            required
            placeholder={"Specify a Course"}
            label = "Course"
            onChange = {(e) => setCourse_name(e.target.value)}>
            </TextField>
        </Grid>

        <Grid item >
          {Course_duration==='Custom' && 
                <TextField sx={{
                  width: '11.5vw',
                  '& input[type=number]': {
                    '-moz-appearance': 'textfield',
                    '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
                      '-webkit-appearance': 'none',
                      margin: 0,
                    },
                  },
                }}

                        required
                        label="Duration"
                        type="number"

                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end" >
                              Weeks
                            </InputAdornment>
                          ),
                        }}
                        onChange={(e) => setCourse_duration_custom(e.target.value)}
                        
                      />
          
          }


          {Course_duration!=='Custom' && 
                        <FormControl sx={{width:'11.5vw'}} required>
                        <InputLabel>Course Duration</InputLabel>
                        <Select
                          value={Course_duration}
                          label="Course Duration"
                          onChange={(e) => setCourse_duration(e.target.value)}
                          
                        >
                          <MenuItem value={'7 Days'}>1 Week</MenuItem>
                          <MenuItem value={'14 Days'}>2 Week</MenuItem>
                          <MenuItem value={'21 Days'}>3 Week</MenuItem>
                          <MenuItem value={'28 Days'}>4 Week</MenuItem>
                          <MenuItem value={'Custom'}>Custom</MenuItem>
            
                        </Select>
                      </FormControl>  
          }

        </Grid>

        <Grid item>
            <FormControl sx={{width:'11.5vw'}} required fullWidth>
            <InputLabel >Course Difficulty</InputLabel>
            <Select
              value={Course_difficulty}
              label="Course Difficulty"
              onChange={(e) => setCourse_difficulty(e.target.value)}
            >
              <MenuItem value={'Beginner'}>Beginner</MenuItem>
              <MenuItem value={'Intermediate'}>Intermediate</MenuItem>
              <MenuItem value={'Expert'}>Expert</MenuItem>
            </Select>
          </FormControl>
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

