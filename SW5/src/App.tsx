import React from 'react';
import { ArticlesPage } from './pages/ArticlesPage';
import { ThemeProviderWithToggle } from './components/ThemeSwitcher';

const App: React.FC = () => {
    return (
        <ThemeProviderWithToggle>
            <ArticlesPage />
        </ThemeProviderWithToggle>
    );
};

export default App;
