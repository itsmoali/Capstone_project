import client from '../Auth/path.js';
import { TextField, Grid, Button, Paper, styled, Box , Menu, MenuItem, Link, Typography, FormControl, InputLabel, Select, InputAdornment, OutlinedInput} from '@mui/material'
import Loading from '../Loading/Loading'
import Errors from '../Errors/Errors'
import { Form, useNavigate } from 'react-router-dom'
import {useState, useEffect} from 'react'
import { useAuth } from '../Auth/auth';
import Message from '../Errors/Message'


const Create_Course = () => {
  
  const auth = useAuth();
  


  useEffect(() => {
    
    localStorage.setItem('isLoggedIn', auth.isLoggedIn);

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
    setError(false);
    navigate('/schedule', {state: response.data});
  }).
  // The 'catch' block executes when the POST request is unsuccessful.
  catch((error) => {
    setLoading(false);
    setError(true);
    console.error(error);
  });
}


  return (
    
    <Box  sx={{display:'flex',height:'100vh', alignItems:'center',flexDirection:'column',mt:'10vh'}}>
      {loading && <Loading />}
      {error && <Errors />}
      
      {!loading && !error &&
      <Grid container spacing={4}  sx={{flexDirection:'column',paddingBottom:'20px',
      paddingTop:'40px', textAlign:'center', maxWidth: { xs: '50%', sm:'50%',md:'70%', lg: '70%' }}} xs={12} md={12}>
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
            sx={{width:'15vw'}}
            required
            placeholder={"Specify a Course"}
            label = "Course"
            onChange = {(e) => setCourse_name(e.target.value)}>
            </TextField>
        </Grid>

        <Grid item >
          {Course_duration==='Custom' && 
                <TextField sx={{
                  width: '15vw',
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
                        <FormControl   sx={{width:'15vw',textAlign:'start'}} required>
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
{/* 
        <Grid item >
            <TextField placeholder={"Desired Course Duration"}
            required
            label = "Duration"
            onChange = {(e) => setCourse_duration(e.target.value)}>
            </TextField>
        </Grid> */}

        <Grid item>
            <FormControl sx={{width:'15vw',textAlign:'start'}} required fullWidth>
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
          variant='contained' 
          onClick={(submit_info)}>Submit</Button>))}

          {!auth.isLoggedIn && ((<Message auth="Login" message="Submit" buttonStyles={{bgcolor:'red',width:'8vw',p:'10px',mt:'20px'}}></Message>))}
          
        </Grid>
      </Grid>}



  </Box>
  )


}

export default Create_Course




