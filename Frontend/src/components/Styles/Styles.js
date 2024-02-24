import { createTheme } from "@mui/material";

const Colors = {
    primary: '#161616',
    secondary: '#1a232f',
    primaryhover: '#151921',
    buttons: '#0066FF',
    design1: '#2EA58C',
    design2: '#4B0795',
    textcolor: '#FFFFFF',
    textcolor2: '#000000',
  }
  


const theme = createTheme({

    palette: {
        primary: {
            main: Colors.primary,
        },
        secondary: {
            main: Colors.secondary,
        },
        text: {
            primary: Colors.textcolor,
            secondary: Colors.textcolor2,
            
        },
    },

    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    backgroundColor: Colors.buttons,
                    color: Colors.textcolor,
                    '&:hover': {
                        backgroundColor: Colors.primaryhover,
                    },
                },
            },
        },
    },



});



export default theme;