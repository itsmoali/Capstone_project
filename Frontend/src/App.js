import './App.css';

import { BrowserRouter, Routes, Route, Router} from 'react-router-dom';
import { Box } from '@mui/system';
import {Login, Courses, Navbar, Course_details, Signup, Home, Logout, Create_Course, Schedule} from './components';

import AuthProvider, { AuthContext } from './components/auth.js';





function App() {
  return (

    <AuthProvider>
      <BrowserRouter>
      
        <Box sx={{mb:12}}>
          <Navbar/>
        </Box>
        <Routes>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/logout" element={<Logout/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/courses" element={<Courses/>}></Route>
          <Route path="/create_course" element={<Create_Course/>}></Route>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/schedule" element={<Schedule/>}></Route>
          <Route path="/course_details/:id" element={<Course_details/>}></Route>
          
        </Routes>
      </BrowserRouter>
    </AuthProvider>

  );
}

export default App;
