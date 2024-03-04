import React from 'react'
import { Avatar, Box, Container, Grid, List, ListItem, ListItemText, Typography } from '@mui/material'
import scheduling from '../Styles/pics/scheduling.png'
import interactive from '../Styles/pics/interactive.png'
import statistics from '../Styles/pics/statistics.png'
import thinking from '../Styles/pics/thinking.png'
import { styled } from '@mui/system'


const Icons = styled('div')(({ theme }) => ({
  maxWidth: '12%',
  height: '10%', // Adjust the height to maintain a square aspect ratio
  border: '2px solid black',
  borderRadius: '20%', // To make a circle, set borderRadius to 50%
  overflow: 'hidden',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  
  '& img': {
    width: '75%',
    height: 'auto',
    objectFit: 'cover',
  },
}));

const CustomListItem = ({ iconSrc, title, description }) => (
  <ListItem sx={{ display: 'flex' ,flexDirection: { xs: 'column', md: 'row' }, columnGap:'30px'}}>
    <Icons>
      <img src={iconSrc} alt={iconSrc} />
    </Icons>
    
    
    
    <ListItemText >
      <Typography variant="h4" sx={{ fontWeight:'bold', pb:'10px'}}>{title}</Typography>
      <Typography variant="h5" sx={{maxWidth: { xs: '100%', lg: '70%' },}}>{description}</Typography>
    </ListItemText>
  </ListItem>
);


const Info = () => {
  return (
    <Box sx={{color: 'primary.main', minHeight: '90vh', flexGrow: 1, bgcolor:'#D8E4E9',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
    }}>

      <Grid container justifyContent="center" alignItems="center"  direction={{xs: 'column', md: 'row'}} >
        <Grid item xs={3} md={6} >
          
            <List>
              <Typography variant="h2" sx={{fontWeight:'bold',textAlign:'center'}}>
                  Why Us?
                </Typography>
                

              <CustomListItem
                iconSrc={scheduling}
                title="Efficiency and Automation"
                description="Streamline course creation and scheduling with AI tools, saving time and effort."
              />
              <CustomListItem
                iconSrc={interactive}
                title="Personalized Learning Experience"
                description="Receive tailored support and insights through AI interactions for a more customized educational journey."
              />
              <CustomListItem
                iconSrc={statistics}
                title="Effective Progress Tracking"
                description="Easily monitor and visualize course progress, assessments, and achievements."
              />
              <CustomListItem
                iconSrc={thinking}
                title="Immediate Clarifications"
                description="Interact with the AI agent to promptly address questions and receive clarifications during the learning process."
              />
            </List>
          
        </Grid>
        <Grid item sx={{width:'35vw', height:'60vh',border: '1px solid black', borderRadius:'5%', overflow:'hidden'}} xs={4} md={5} >
          
          <iframe  width="100%" height="100%" border="100" src="https://www.youtube.com/embed/oEXFMGK7IC0" title="Strange the Dreamer - Savfk" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          
        </Grid>
      </Grid>
      
        
    </Box>
  )
}

export default Info