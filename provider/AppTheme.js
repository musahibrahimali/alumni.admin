import {createTheme} from '@mui/material';

// Create a appTheme instance.
const appTheme = createTheme({
    palette: {
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#19857b',
        },
        background: {
            default: '#fff',
        },
        c_dark: {
            main: '#0A1929',
        }
    },
});

export default appTheme;