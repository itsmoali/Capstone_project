import React from 'react'
import {Button, Container, Stack, Dialog,DialogTitle, DialogContent, DialogActions,IconButton, Typography,
  Box, TextField, InputAdornment } from '@mui/material'
import axios from 'axios'
import { Link, useNavigate, useLocation} from 'react-router-dom'
import { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import dayjs from 'dayjs';
import client from '../Auth/path.js';
import Loading from '../Loading/Loading.jsx'
import Errors from '../Errors/Errors.jsx'




const defaultTheme = createTheme({
  components: {
    MuiButton: {
        styleOverrides: {
            root: {
                fontSize: '1.2rem',
                },
            },
        },
    },
});

function Schedule() {

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const location = useLocation(); 
  const courseList = location.state ;
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectDuration, setSelectDuration] = useState(null);
  const [selectTime, setSelectTime] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null)

  const timechange = (data) => {
    var time = data.hour() + ":" + data.minute()
    setSelectTime(time)
  }

  const datechange = (data) => {
    setSelectedDate(data.format())
  }

  const OpenModal = () => {
    setOpen(true);
  }

  const CloseModal = () => {
    setOpen(false);
  }
  

  async function save_info() {
    alert("Please wait while your course is being created. This may take a while.")
    setLoading(true);

    await Promise.all([
      client.post('/create/course', courseList),
          client.post('/create/schedulemaker', {
      "course_data": courseList,
      "start_date": selectedDate,  
      "daily_practice_time": selectDuration,
      "start_time": selectTime,
    })]).then((response) => {
        console.log("Information has beed added to database.")
        setLoading(false);
        alert("Your course has been created successfully.")
        navigate('/courses');
      }).catch((error) => {
        setLoading(false);
        setError(true);
        console.log("Error has been detected", error.response.data);
      })
  };



  const Course_Schedule = 
    
      <div class= "demo-schedule" id="demo-schedule">
            <div contenteditable="true">
              <span><b>{courseList['course']}</b></span>
              <br />
              {console.log(courseList)}
              <h3>Course Schedule</h3>
              {courseList['schedule'].map(item => (
                <div class="inner-schedule" id="inner-schedule">
                  <span ><b>Day {item.day}: {item.topic}</b></span>
                  <br />
                  {item.subtopics.map((subtopic, index) => (
                    <div style={{padding:'6px'}} >
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

  const Calendar = 
      <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box components={['DatePicker']}>
            <DatePicker label="Basic date picker"  onChange={(datechange)}/>
            <TextField 
            required id="outlined-end-adornment"
            variant="outlined"
            helperText="Time Spent Each Day"
            InputProps={{
              endAdornment: <InputAdornment position="end">Hours</InputAdornment>,
            }} 
            onChange={(e)=>setSelectDuration(e.target.value)} />

            <Box>
            <ThemeProvider theme={defaultTheme}>
              <MobileTimePicker defaultValue={dayjs()} onChange={(timechange)}/>
              </ThemeProvider>
            </Box>
            <Button variant='contained' sx={{mt:3}} onClick={(save_info)}>
              Submit
            </Button>
          </Box>
        </LocalizationProvider>
  
  const Schedule_Planning = 
        <Dialog
            onClose={CloseModal}
            aria-labelledby="customized-dialog-title"
            open={open}
            sx={{display:'flex', justifyContent:'center', direction:'row', textAlign:'center'}}
          >
            <Box sx={{display:'flex', justifyContent:'space-between', direction:'row', textAlign:'center'}}>
              <DialogTitle sx={{flexGrow: 1 }}>
              Schedule Planning
              </DialogTitle>
              <IconButton
                aria-label="close"
                onClick={(CloseModal)}
                sx={{borderRadius:0, margin: 2, padding:0   }}>
                <CloseIcon />
              </IconButton>
            </Box>
          <DialogContent>
            {Calendar}
          </DialogContent>
        </Dialog>
  


  return (

    <Stack spacing={{ xs: 1, sm: 2}} direction="column"  justifyContent="center" alignItems="center" sx={{mt:20}}>
      {loading && <Loading />}
      {error && <Errors />}
      {!loading && !error &&
      <>
        {Course_Schedule}
      <Container  sx={{display:'flex', justifyContent:'space-evenly',padding:'30px 0px 50px 0px'}}>
        <Button onClick={(OpenModal)} variant='contained'>Finalize</Button>
        {Schedule_Planning}
        <Link to="/#">
            <Button variant='contained'>Make Changes</Button>
        </Link>
    </Container> </>}
    </Stack>
  )
}

export default Schedule



