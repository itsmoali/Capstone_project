import React from 'react'
import { useLocation } from 'react-router-dom';
import Course_Card from './Course_Card';
import { useEffect } from 'react';
import { Box } from '@mui/material';
const Individual_Details = () => {
  const {state} = useLocation();
  
  return (
    
    <Box sx={{p:7}}>
        <Course_Card courses = {state.data}></Course_Card>
    </Box>
  )
}

export default Individual_Details