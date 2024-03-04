import React from 'react'
import { Grid, Box,Typography, Icon, SvgIcon,ImageListItem  } from '@mui/material'
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import { useState, useEffect, useRef } from 'react';
import WestIcon from '@mui/icons-material/West';
import SouthIcon from '@mui/icons-material/South';
import EastIcon from '@mui/icons-material/East';
import Create from '../Styles/pics/Create.png'
import calendar from '../Styles/pics/calendar.png'
import study from '../Styles/pics/study.jpg'
import signup from '../Styles/pics/signup.gif'
import AI from '../Styles/pics/AI.jpg'
import progress from '../Styles/pics/progress.png'
import { styled } from '@mui/material/styles';

import { createRef } from 'react';

const CustomItem = ({ image, text, alt }) => {
  return (
    <Grid item xs={4} sm={4} md={4} sx={{ bgcolor: 'red', textAlign: 'center' }}>
      <img src={image} alt={alt} style={{ width: '40%' }} />
      <Typography variant="h6" align="center" gutterBottom>
        {text}
      </Typography>
    </Grid>
  );
};

const About = () => {
    
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { rootMargin: "-300px" }
    );
    console.log(isIntersecting);
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [isIntersecting]);


  useEffect(() => {
    if (isIntersecting) {
      showItems();
    }

  }, [isIntersecting])
    

  function showItems() {
    const gridItems = document.querySelectorAll('.grid-item');
    const entries = Object.entries(gridItems);
    const midpoint = Math.ceil(entries.length / 2);
    
    const firstHalf = entries.slice(0, midpoint);
    const secondHalfReversed = entries.slice(midpoint).reverse();
    
    const result = [...firstHalf, ...secondHalfReversed];
    result.forEach((item, index) => {
      const delay = index * 850; // Adjust the delay as needed
      item[1].style.transition = `opacity 0.5s ease-in-out ${delay}ms`;
      item[1].style.opacity = '1';
    });
  }

  




  return (
    <Box  sx={{ flexGrow: 1, height: '90vh', display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems: 'center',}}>
      <Typography component="h3" variant="h3" align="center" gutterBottom>
        How it works
        
      </Typography>
      
      
      <Grid ref={ref}  container  columns={{ xs: 14, sm: 14, md: 14 }}  spacing={2} sx={{display: 'flex',  justifyContent: 'center' }}>
        
            <Grid id='0' className="grid-item" item xs={4} sm={4} md={4} sx={{alignSelf:'center', textAlign: 'center',opacity: 0}}>
              <img src={signup} alt="signup" style={{width: '40%'}}/>
              <Typography variant="h5" align="center" gutterBottom sx={{pt:2}}>
                Sign Up to get started
              </Typography>
            </Grid>

            <Grid id='1' className="grid-item" item xs={1} sm={1} md={1} sx={{ alignSelf: 'center',opacity: 0,}}>
              <SvgIcon sx={{fontSize: 70 }} >
                <EastIcon/>
                
              </SvgIcon>
              
            </Grid>
            
            <Grid id='2' className="grid-item" item xs={4} sm={4} md={4} sx={{textAlign: 'center',opacity: 0,}}>
              <img src={Create} alt="Create" style={{width: '30%'}}/>
              <Typography variant="h5" align="center" gutterBottom sx={{whiteSpace:'pre-line', pt:2}}>
                Create your desired  {'\n'}
                Course using our  {'\n'}
                Course Builder {'\n'}
              </Typography>
            </Grid>
            <Grid id='3' className="grid-item" item xs={1} sm={1} md={1} sx={{ alignSelf: 'center',opacity: 0,}}>
            <SvgIcon sx={{fontSize: 70 }} >
                <EastIcon/>
              </SvgIcon>
            </Grid>
            
            
            <Grid id='4' className="grid-item" item xs={4} sm={4} md={4} sx={{textAlign: 'center',opacity: 0,}}>
            <img src={calendar} alt="calendar" style={{width: '25%'}}/>
            <Typography variant="h5" paragraph  gutterBottom sx={{ whiteSpace:'pre-line', pt:2}} >
                Integrate you Course {'\n'}
                Schedule with your {'\n'}
                Personal Calendar {'\n'}
                to recieve reminders
              </Typography>
              <Box >
              <SvgIcon sx={{fontSize: 70 }} >
              <SouthIcon/>
              </SvgIcon>
              </Box>
            </Grid>
            
            <Grid id='5' className="grid-item" item xs={4} sm={4} md={4} sx={{ textAlign: 'center',opacity: 0,}}>
            <img src={study} alt="study" style={{width: '35%'}}/>
            <Typography variant="h5" align="center" gutterBottom whiteSpace={'pre-line'} sx={{pt:2}}>
                Study the Course you created {'\n'}
                based on your personal schedule {'\n'}
              </Typography>
            </Grid>

            <Grid id='6' className="grid-item" item xs={1} sm={1} md={1} sx={{ alignSelf: 'center',opacity: 0,}}>
            <SvgIcon sx={{fontSize: 70 }} >
                <WestIcon/>
              </SvgIcon>
            </Grid>

            <Grid id='7' className="grid-item" item xs={4} sm={4} md={4} sx={{ textAlign: 'center',opacity: 0,}}>
            <img src={AI} alt="AI" style={{width: '35%'}}/>
            <Typography variant="h5" align="center" gutterBottom whiteSpace={'pre-line'} sx={{pt:2}}>
                Utilize AI to solve your doubts {'\n'}
                 and test your knowledge
              </Typography>
            </Grid>
            <Grid id='8' className="grid-item" item xs={1} sm={1} md={1}sx={{ alignSelf: 'center',opacity: 0,}}>
            <SvgIcon sx={{fontSize: 70 }} >
                <WestIcon/>
              </SvgIcon>
            </Grid>
            <Grid id='9' className="grid-item" item xs={4} sm={4} md={4} sx={{ textAlign: 'center',opacity: 0}} >
            <img src={progress} alt="progress" style={{width: '45%',height:'50%'}}/>
            <Typography variant="h5" align="center" gutterBottom whiteSpace={'pre-line'} sx={{pt:2}} >
            
                Keep track of your progress {'\n'}
                 and improve your learning
              </Typography>
            </Grid>
          </Grid>
        </Box>
  )
}

export default About