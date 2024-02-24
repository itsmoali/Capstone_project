import React from 'react'
import { Container, Typography, Button, Stack, Box,ImageList, ImageListItem, CardMedia, Grid } from '@mui/material'
import main from '../Styles/pics/main.jpg'



const Main = () => {
  
  return (
    
    <Box sx={{color: 'primary.secondary', height: '90vh', flexGrow: 1, bgcolor: 'primary.main'}}>
        <Grid container  columns={16}
                        justifyContent="space-around"
                        alignItems="center" >
            <Grid  item xs={6} md={4} sx={{width:'50vw'}} >
                <Typography component="h3" variant="h3"  gutterBottom>
                    Sabaq
                </Typography>
                <Typography variant="h2" paragraph>
                 Revolutionizing Education With AI
                </Typography>
                <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="start">
                    <Button variant="contained" href='/Signup'>Join Now</Button>
                    <Button variant="contained" href='/create_course'>View Demo</Button>
                </Stack>
            </Grid>
            <Grid item xs={6} md={8} sx={{width:'35vw', height:'60vh'}}>
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/oEXFMGK7IC0" title="Strange the Dreamer - Savfk" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </Grid>

        </Grid>
        


    </Box>
    


  );
}

export default Main


{/* <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 'sm', color: 'text.primary', height: '90vh'}}>
<Box sx={{width: '50%', bgcolor:'pink'}}>
  <Typography component="h1" variant="h2" align="center" gutterBottom>
    Sabaq
  </Typography>
  <Typography variant="h5" align="center" paragraph>
    Unlock the future of learning! Dive into AI-powered courses,
    effortlessly master new skills, get personalized support,
    and soar to success!
  </Typography>

  <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
    <Button variant="contained" href='/Signup'>Join Now</Button>
    <Button variant="contained" href='/create_course'>View Demo</Button>
  </Stack>
</Box>

<Box>
  
</Box>
</Box> */}