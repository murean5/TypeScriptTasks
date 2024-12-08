import React, { createContext, useContext, useState } from 'react';
import { Switch, CssBaseline, Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// создание контекста для управления темой
const ThemeContext = createContext({
    darkMode: false,
    toggleDarkMode: () => {},
});

// компонент ThemeProviderWithToggle для управления темой
export const ThemeProviderWithToggle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    // функция для переключения темы
    const toggleDarkMode = () => setDarkMode(!darkMode);

    // создание темы в зависимости от состояния darkMode
    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
        },
    });

    return (
        // предоставление контекста и темы для дочерних компонентов
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};

// компонент ThemeSwitcher для переключения темы
export const ThemeSwitcher: React.FC = () => {
    // получение текущего состояния темы и функции переключения из контекста
    const { darkMode, toggleDarkMode } = useContext(ThemeContext);

    return (
        // отображение переключателя темы
        <Box display="flex" alignItems="center" gap={0.5} mb={3}>
            <Box fontSize="30px">{darkMode ? '🌙' : '🌞'}</Box>
            <Switch checked={darkMode} onChange={toggleDarkMode} />
        </Box>
    );
};