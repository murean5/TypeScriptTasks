import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import CardList from './components/CardList';
import ProductDetails from './components/ProductDetails';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import UserProfile from './components/UserProfile';
import CategoriesPage from './components/CategoriesPage';
import { Box, styled } from '@mui/material';

const MainContainer = styled(Box)({
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
});

const ContentContainer = styled(Box)({
    flex: 1,
    overflow: 'hidden',
});

const App: React.FC = () => {
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    const [filters, setFilters] = useState({ productName: '', inStockOnly: false, category: '' });
    const location = useLocation();

    useEffect(() => {
        if (location.pathname !== '/' && location.pathname !== '/products') {
            setSidebarVisible(false);
        }
    }, [location]);

    const toggleSidebar = () => {
        if (location.pathname === '/' || location.pathname === '/products') {
            setSidebarVisible(!isSidebarVisible);
        } else {
            setSidebarVisible(false);
        }
    };

    const applyFilters = (newFilters: { productName: string; inStockOnly: boolean; category: string }) => {
        setFilters(newFilters);
    };

    return (
        <MainContainer>
            <Navbar toggleSidebar={toggleSidebar} />
            <ContentContainer>
                <Routes>
                    <Route path="/products/:id" element={<ProductDetails />} />
                    <Route path="/products" element={<CardList filters={filters} />} />
                    <Route path="/" element={<CardList filters={filters} />} />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="/categories" element={<CategoriesPage />} />
                </Routes>
            </ContentContainer>
        </MainContainer>
    );
};

const AppWrapper: React.FC = () => (
    <Router>
        <App />
    </Router>
);

export default AppWrapper;