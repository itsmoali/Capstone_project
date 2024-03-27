import {useAuth} from './auth.js';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
import client from './path.js';

export default function Logout() {
    const auth = useAuth();
    const navigate = useNavigate();

    function handleLogout (e) {
        e.preventDefault();
        auth.logout();  
        navigate('/login');


    };

    return (
        <Button variant='contained' sx={{height:'38px'}} onClick={handleLogout}>
            LogOut
        </Button>
    );
};


