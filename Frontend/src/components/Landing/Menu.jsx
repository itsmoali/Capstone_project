import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '../Auth/Logout';
import { Link } from 'react-router-dom';
import { useAuth } from '../Auth/auth';
import { useNavigate } from 'react-router-dom';


export default function AccountMenu() {
    const auth = useAuth();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    function handleLogout (e) {
        e.preventDefault();
        auth.logout();  
        navigate('/');

    };

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Menu">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        backgroundColor: '#212121', // Dark gray background
                        color: '#fff', // White text color
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleClose}>
                    <Link to={"/Courses"} style={{ textDecoration: 'none' }}>
                        <Typography variant="body1" sx={{ color: '#fff', textDecoration: 'none' }}>Course</Typography>
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Link to="/create_course" style={{ textDecoration: 'none' }}>
                        <Typography variant="body1" sx={{ color: '#fff', textDecoration: 'none' }}>Create A Course</Typography>
                    </Link>
                </MenuItem>
                <Divider />
                {auth.isLoggedIn &&
                <MenuItem onClick={handleClose}>
                    
                        
                            <Link to="/Profile" style={{ textDecoration: 'none' }}>
                                <Typography variant="body1" sx={{ color: '#fff', textDecoration: 'none' }}>Profile</Typography>
                            </Link>
                        

                </MenuItem>}
                {auth.isLoggedIn &&
                <MenuItem onClick={handleLogout} >
                      
                    <Typography variant="body1"  sx={{ color: '#fff', textDecoration: 'none' }}>
                                Logout
                    </Typography>
  
                        

                </MenuItem>}
                {!auth.isLoggedIn &&
                <MenuItem onClick={handleClose}>
                    
                <Link to={"/Login"} style={{ textDecoration: 'none' }}>
                    <Typography variant="body1" sx={{ color: '#fff', textDecoration: 'none' }}>Login</Typography>
                </Link>

                        
                </MenuItem>}
            </Menu>
        </React.Fragment>
    );
}
