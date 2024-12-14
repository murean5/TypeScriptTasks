import React from 'react';
import { AppBar, Toolbar, IconButton, Button } from '@mui/material';
import { styled } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';

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

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => (
    <CustomAppBar position="fixed">
        <Toolbar style={{ justifyContent: 'space-between' }}>
            <IconButton color="inherit" onClick={toggleSidebar}>
                <SearchIcon />
            </IconButton>
            <CustomButton>Товары</CustomButton>
            <CustomButton>Склады</CustomButton>
            <CustomButton>О системе</CustomButton>
            <CustomButton>Личный кабинет</CustomButton>
        </Toolbar>
    </CustomAppBar>
);

export default Navbar;