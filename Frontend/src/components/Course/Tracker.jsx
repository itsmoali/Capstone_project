import React, { useEffect } from 'react'
import { Stack, Box, Typography } from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress';
import styled from '@mui/material/styles/styled';


const Progress = styled(LinearProgress)(({}) => ({
    height: 20,
    borderRadius: 5,
    width: '55%',
    '& .MuiLinearProgress-bar': {
      borderRadius: 5,
      backgroundColor:'#40e0d0',
    },
}));


const Tracker = ({percentage}) => {



  return (
    <Box sx={{mt:10,display:'flex',alignItems:'center',flexDirection:'column'}}>
        <Typography  sx={{fontWeight:900,mb:1}}>Your Progress</Typography>
        <Progress variant="determinate"  value={percentage}></Progress>
    </Box>
  )
}

export default Tracker