import React from 'react';
import { AppBar, Toolbar, IconButton, Button } from '@mui/material';
import { styled } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useLocation } from 'react-router-dom';

const CustomAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
}));

const CustomButton = styled(Button)({
    color: '#ffffff',
    '&:hover': {
        color: '#c1ecff',
    },
});

type NavbarProps = {
    toggleSidebar: () => void;
};

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
    const location = useLocation();

    const isProductsPage = location.pathname === '/' || location.pathname === '/products';

    return (
        <CustomAppBar position="fixed">
            <Toolbar style={{ justifyContent: 'space-between' }}>
                <IconButton color="inherit" onClick={toggleSidebar} disabled={!isProductsPage}>
                    <SearchIcon />
                </IconButton>
                <CustomButton component={Link} to="/">Товары</CustomButton>
                <CustomButton component={Link} to="/categories">Категории</CustomButton>
                <CustomButton>Склады</CustomButton>
                <CustomButton>О системе</CustomButton>
                <CustomButton component={Link} to="/profile">Личный кабинет</CustomButton>
            </Toolbar>
        </CustomAppBar>
    );
};


export default Navbar;