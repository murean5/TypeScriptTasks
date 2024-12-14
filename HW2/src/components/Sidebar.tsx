import React, { useState } from 'react';
import { TextField, Checkbox, FormControlLabel, Select, MenuItem, Button, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { styled } from '@mui/system';
import theme from '../theme';

type SidebarProps = {
    isVisible: boolean;
    toggleVisibility: () => void;
    applyFilters: (filters: { productName: string; inStockOnly: boolean; category: string }) => void;
};

const SidebarContainer = styled('div')(({ isVisible }: { isVisible: boolean }) => ({
    width: '250px',
    height: 'calc(100% - 40px)',
    padding: '20px',
    marginTop: '20px',
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    position: 'fixed',
    top: '40px',
    left: '0',
    zIndex: 200,
    transition: 'transform 0.3s ease-in-out',
    willChange: 'transform',
    boxShadow: '3px 0px 15px 0px rgb(0 0 0 / 22%)',
    transform: isVisible ? 'translateX(0)' : 'translateX(-101%)',
}));

const InputContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    gap: '1px',
});

const Sidebar: React.FC<SidebarProps> = ({ isVisible, toggleVisibility, applyFilters }) => {
    const [productName, setProductName] = useState('');
    const [inStockOnly, setInStockOnly] = useState(false);
    const [category, setCategory] = useState('');

    const handleSearch = () => {
        applyFilters({ productName, inStockOnly, category });
        toggleVisibility();
    };

    const handleReset = () => {
        setProductName('');
        setInStockOnly(false);
        setCategory('');
        applyFilters({ productName: '', inStockOnly: false, category: '' });
    };

    const clearProductName = () => {
        setProductName('');
    };

    const clearCategory = () => {
        setCategory('');
    };

    return (
        <SidebarContainer isVisible={isVisible}>
            <InputContainer>
                <TextField
                    label="Название товара"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    fullWidth
                />
                <IconButton onClick={clearProductName}>
                    <ClearIcon />
                </IconButton>
            </InputContainer>
            <InputContainer>
                <Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    displayEmpty
                    fullWidth
                    variant="outlined"
                >
                    <MenuItem value="">Все категории</MenuItem>
                    <MenuItem value="Фрукты">Фрукты</MenuItem>
                    <MenuItem value="Растения">Растения</MenuItem>
                    <MenuItem value="Напитки">Напитки</MenuItem>
                </Select>
                <IconButton onClick={clearCategory}>
                    <ClearIcon />
                </IconButton>
            </InputContainer>
            <FormControlLabel
                control={<Checkbox checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} />}
                label="В наличии"
            />
            <Button variant="contained" color="primary" onClick={handleSearch}>Поиск</Button>
            <Button variant="outlined" color="secondary" onClick={handleReset}>Сброс</Button>
        </SidebarContainer>
    );
};

export default Sidebar;