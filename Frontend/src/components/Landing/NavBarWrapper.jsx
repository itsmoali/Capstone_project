import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar'; // Import your Navbar component
import {useAuth} from '../Auth/auth.js';

function NavBarWrapper() {

  const location = useLocation();
  const [isHidden, setIsHidden] = useState(true);


  useEffect(() => {
    const hiddenNavbarPaths = ['/login', '/signup', '/Login'];
    setIsHidden(hiddenNavbarPaths.includes(location.pathname));

  }, [location]);

  return isHidden ? null : <Navbar />;
}

export default NavBarWrapper;
