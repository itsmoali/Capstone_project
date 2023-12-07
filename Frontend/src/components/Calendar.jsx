import React from 'react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect, useState } from 'react'
import { Box, TextField, InputAdornment, Button, Typography} from '@mui/material';

export default function Calendar() {

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectTime, setSelectTime] = useState(null);
    

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box components={['DatePicker']}>
        <DatePicker label="Basic date picker"  onChange={setSelectedDate}/>
        
        <TextField 
        required id="outlined-end-adornment"
        variant="outlined"
        helperText="Time Spent Each Day"
        InputProps={{
          endAdornment: <InputAdornment position="end">Hours</InputAdornment>,
        }} 
        onChange={setSelectTime} />
        
        <Button variant='contained'>
          Submit
        </Button>
      </Box>
    </LocalizationProvider>
  );
}