import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import CircleIcon from '@mui/icons-material/Circle';
import { List } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { red } from '@mui/material/colors';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import client from '../Auth/path.js';
import Loading from '../Loading/Loading.jsx';
import { Navigate } from 'react-router-dom';

const Course_Detail = () => {
    
    const {state} = useLocation();
    const navigate = useNavigate();

    

    


    

    
    const [currentIndex, setCurrentIndex] = useState(0);
    const topics = Object.entries(state.data.subtopics);
    const token = localStorage.getItem('token');
    const [listprogress, setProgress] = useState([]);
    const [loading, setLoading] = useState(true);
    const day = state.data.day;


    const course_details = Object.entries(state.current_course.course_details);
    const course_name = state.current_course.course_name;


    function progress(){
        client.post('/userstats/get_progress',{
            course_name: state.current_course.course_name,
            }, {
              headers: {
                Authorization: `Token ${token}`, 
                'Content-Type': 'application/json'
              }
            }).then((response) => {
            setProgress(response.data['progress'])
            }).catch((error) => {
              console.log(error)
            })}
    

    const update = () => {
        client.post('/userstats/update_module',{
            course_name: state.current_course.course_name,
            day: day,
          }, {
            headers: {
              Authorization: `Token ${token}`, 
              'Content-Type': 'application/json'
            }
          }).then((response) => {
            console.log(response)

            const url = `/courses/:topic/${course_name}`

            navigate(url, {state: {data: state.current_course}})
          }).catch((error) => {
            console.log(error)
          })}




    const handleNext = () => {
        setCurrentIndex(prevIndex => 
            
            prevIndex === topics.length - 1 ? prevIndex : prevIndex + 1);
      };

    const handlePrevious = () => {
        setCurrentIndex(prevIndex => 
            prevIndex === 0 ? prevIndex : prevIndex - 1);
      };

      useEffect(() => {
        window.scrollTo(0, 0)
        progress()
        setLoading(false)
    },[])
    
  return (

    <>
    {loading && <Loading/>}
    {!loading &&

    <Box sx={{mt:'10vh',p:5, display:'flex', alignItems:'center',flexDirection:'column'}}>
        

    
        {Object.entries(state.data.subtopics).map(([key, value] , index) => (

        
        <Box key={key} sx={{ display: index === currentIndex ? 'block' : 'none'}}>
            <Box sx={{display: 'flex' ,  justifyContent: 'space-around',pr:5}}>
            {console.log()}
                <Button variant= "contained" onClick={handlePrevious} sx={{visibility: currentIndex===0 ? 'hidden' : 'visible'}}>
                    Previous
                </Button>

                <Link to={`/courses/:topic/${state.current_course.course_name}`} state={{ data: state.current_course }}  >
                    <Button variant="contained" >
                        Main Menu
                    </Button>
                </Link>
                <Button variant= "contained" onClick={handleNext} sx={{visibility: currentIndex=== topics.length - 1  ? 'hidden' : 'visible'}}>
                    Next
                </Button>
            </Box>

            <Box sx={{display: 'flex' ,  justifyContent: 'center',pt:7}}>
                <Typography
                    variant="h1"
                    sx={{ textTransform: 'capitalize', fontWeight: 600, fontSize: 26}}
                    >
                    {key}
                    
                </Typography>
            </Box>

            
            {typeof value === 'object' && (
            <Box>
                {Object.entries(value[0]).map(([nestedKey, nestedValue]) => (

                    
                    
                    (typeof nestedValue === 'object' ? (
                        <Box>
                            {Object.entries(nestedValue).map(([nestedKey, nestedValue]) => (
                                
                                <List sx={{whiteSpace: 'pre-line',pt:3}}>
                                    <Typography sx={{justifyContent: 'center', display:'flex',fontSize: 18,fontWeight: 600}} >{nestedKey} </Typography>
                                    
                                    {typeof nestedValue === 'object' ? (
                                        <Box >
                                            {Object.entries(nestedValue).map(([nestedKey, nestedValue])=>(
                                                <List>
                                                    <ListItem sx={{mt:-2}}>
                                                        <CircleIcon sx={{fontSize: 10, margin:2}}/>
                                                        <ListItemText primary={nestedKey}  />
                                                    </ListItem>
                                                    <ListItem sx={{pl:10,mt:-3}}>
                                                        <ListItemText primaryTypographyProps={{lineHeight: 2.8}} primary={nestedValue} ></ListItemText>
                                                    </ListItem>
                                                
                                                </List>
                                            ))}
                                        </Box>
                                    ):(
                                        <ListItem >
                                            
                                        <ListItemText primaryTypographyProps={{lineHeight: 2.8}} primary={nestedValue}/>
                                        
                                      </ListItem>
                                    )}
                                    
                                    
                                </List>

                            ))}
                        </Box>
                    ) : (
                        <List>
                            <Typography sx={{justifyContent: 'center', display:'flex',fontSize: 18,fontWeight: 600}} >{nestedKey} </Typography>
                            <ListItemText primaryTypographyProps={{lineHeight: 1.8,margin:2, lineHeight:2.8}} primary={nestedValue} ></ListItemText>
                        </List>
                    
                    ))
                ))}
            </Box>
            )}
            
        </Box>
        
        ))}
                    
        {listprogress[day-1]===0 ?
        <Button variant= "contained" onClick={update}  sx={{visibility: currentIndex=== topics.length - 1  ? 'visible' : 'hidden'}}>
            Mark as Complete
        </Button> :
        <Button variant= "contained" sx={{visibility: currentIndex=== topics.length - 1  ? 'visible' : 'hidden'}}>
            Completed
        </Button>}
        
                    
    </Box>
}
</>
  )
}

export default Course_Detail