import './App.css';

import { BrowserRouter, Routes, Route, Router} from 'react-router-dom';
import { Box } from '@mui/system';
import {Login, Help, Courses, Navbar,  Signup, Home, Chess_Demo, Logout, Create_Course, Schedule, Calendar} from './components';

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
          <Route path="/help" element={<Help/>}></Route>
          <Route path="/courses" element={<Courses/>}></Route>
          <Route path="/create_course" element={<Create_Course/>}></Route>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/chess_demo" element={<Chess_Demo/>}></Route>
          <Route path="/schedule" element={<Schedule/>}></Route>
          <Route path="/calendar" element={<Calendar/>}></Route>
          
        </Routes>
      </BrowserRouter>
    </AuthProvider>

  );
}

export default App;
