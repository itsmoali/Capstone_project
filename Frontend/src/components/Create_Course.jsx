import { TextField, Grid, Button } from '@mui/material'
import axios from 'axios'
import OpenAI from "openai"
import {useState, useEffect} from 'react'

// const openai = new OpenAI(process.env.REACT_APP_KEY);
// console.log(openai)
// const key = process.env.REACT_APP_KEY

const openai = new OpenAI({
    apiKey: process.env.REACT_APP_KEY,
    dangerouslyAllowBrowser: true, 
  });








const Create_Course = () => {

    const [course_info, setCourse_info] = useState([]);
    const [Userinfo, setUserinfo] = useState(null);

    async function gpt_info(e) {
        e.preventDefault();
        try {
            console.log(Userinfo)
            const response = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                  {
                    "role": "user",
                    "content": Userinfo
                  }
                ],
                temperature: 0,
                max_tokens: 100,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
              });
              setCourse_info(response.choices[0]['message']['content'])                
        }
        catch (error) {
            console.error(error);
        }
    }


    
  return (

   
    
    <Grid container direction="row" xl={12}  align="center">
        <Grid item direction="column" xl={12} sm={4} >
        <TextField
          required
          fullWidth
          id="outlined-required"
          defaultValue="Course that you want to create"
          sx={{padding:'20px 20px 10px 10px'}}
          onChange = {(e)=>setUserinfo(e.target.value)}
        />
        </Grid>
        <Grid item  xl={12} sm={4}>
            <Button variant='contained' onClick={(gpt_info)}>
                Create
            </Button>
            <div>
                {course_info ? (
                    // Display the fetched data
                    <div>{course_info}</div>
                ) : (
                    // Show a loading indicator or alternative UI while data is being fetched
                    <div>Loading...</div>
                )}
            </div>
        </Grid>

        
    </Grid>
    
  )
}

export default Create_Course
