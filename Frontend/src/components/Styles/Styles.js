import { createTheme } from "@mui/material/styles";

const Colors = {
    primary: '#161616',
    secondary: '#1a232f',
    primaryhover: '#151921',
    buttons: '#0066FF',
    design1: '#2EA58C',
    design2: '#4B0795',
    textcolor: '#FFFFFF',
    textcolor2: '#000000',
    cards: '#242526',
  }
  


const theme = createTheme({

    palette: {
        primary: {
            main: Colors.primary,
            secondary: Colors.textcolor,
            background: Colors.cards,
            getContrastText: Colors.textcolor,
            
            
        },
        secondary: {
            main: Colors.secondary,
            secondary: Colors.cards,
        }
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