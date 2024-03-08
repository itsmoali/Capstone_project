import './App.css';

import { BrowserRouter, Routes, Route, Router} from 'react-router-dom';
import { Box } from '@mui/system';
import {Login, Courses, Navbar, Signup, Home, Logout, Create_Course, Schedule, Course_Detail, Individual_Details} from './components';

import AuthProvider, { AuthContext } from './components/Auth/auth.js';
import theme from './components/Styles/Styles.js';
import { ThemeProvider } from "@mui/material/styles";



function App() {
  return (

    <ThemeProvider theme={theme}>
      <AuthProvider>
        
        <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/logout" element={<Logout/>}></Route>
            <Route path="/signup" element={<Signup/>}></Route>
            <Route path="/courses" element={<Courses/>}></Route>
            <Route path="/courses/:topic/:subtopic" element={<Individual_Details/>}></Route>
            <Route path="/courses/:topic" element={<Course_Detail/>}></Route>
            <Route path="/create_course" element={<Create_Course/>}></Route>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/schedule" element={<Schedule/>}></Route>
            

            
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
    
  );
}

export default App;
