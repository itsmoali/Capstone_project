import React from 'react'
import { Stack, Box } from '@mui/material'


const SideBar = () => {
  return (
    <Stack sx={{backgroundColor:'red',height: '100%' }}>
        <h1>Filter By</h1>
        <Box>Duration</Box>
        <Box>Difficulty</Box>
        <Box>Subject</Box>
    </Stack>
  )
}

export default SideBar