import { createTheme } from '@mui/material/styles';

// создание темы с использованием MUI
export const theme = createTheme({
    palette: {
        primary: {
            main: '#007bff',
        },
        secondary: {
            main: '#6c757d',
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
    },
});