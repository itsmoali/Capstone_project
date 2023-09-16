import './App.css';

import { BrowserRouter, Routes, Route, Router} from 'react-router-dom';
import { Box } from '@mui/system';
import {Login, Help, Courses, Navbar,  Signup, Home, Chess_Demo} from './components';



function App() {
  return (

      <BrowserRouter>
      
        <Box sx={{mb:12}}>
          <Navbar/>
        </Box>
        <Routes>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/help" element={<Help/>}></Route>
          <Route path="/courses" element={<Courses/>}></Route>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/chess_demo" element={<Chess_Demo/>}></Route>
          
        </Routes>
      </BrowserRouter>

  );
}

export default App;
