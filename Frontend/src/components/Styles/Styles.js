import { createTheme } from "@mui/material/styles";

// Remove the HTML link tag and add the following import statement

const fontFamilies = [
    'Nunito Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000',
    'Libre Franklin:ital,wght@0,100..900;1,100..900',
  ].join('&family=');
  
  // Create a link element to load the font
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${fontFamilies}&display=swap`;
  document.head.appendChild(link);

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

    spacing: 11,
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    backgroundColor: Colors.buttons,
                    fontFamily: 'Roboto',
                    
                    color: Colors.textcolor,
                    '&:hover': {
                        backgroundColor: Colors.primaryhover,
                    },
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    fontFamily : 'Roboto',
                },

            },
        },
    },



});



export default theme;