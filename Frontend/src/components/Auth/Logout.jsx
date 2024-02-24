import {useAuth} from './auth.js';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';

export default function Logout() {
    const auth = useAuth();
    const Navigate = useNavigate();

    function handleLogout (e) {
        e.preventDefault();
        axios.post('/logout')
        .then((response) => {
            console.log('User has been logged out',response.data);
            auth.logout();
            Navigate('/Login');
        }).catch((error) => {
            console.log('Erros has been detected',error.response.data);
        });


    };

    return (
        <Button onClick={handleLogout}>
            LogOut
        </Button>
    );
};


