import React, { useState, useEffect } from 'react';
import { TextField, Checkbox, FormControlLabel, Select, MenuItem, Button, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { styled } from '@mui/system';
import theme from '../theme';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { addCategory } from '../slices/categoriesSlice';

type SidebarProps = {
    isVisible: boolean;
    toggleVisibility: () => void;
    applyFilters: (filters: { productName: string; inStockOnly: boolean; category: string }) => void;
};

const SidebarContainer = styled('div')<{ isVisible: boolean; isMainPage: boolean }>(({ isVisible, isMainPage }) => ({
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
    transition: isMainPage ? 'transform 0.3s ease-in-out' : 'none',
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
    const location = useLocation();
    const isMainPage = location.pathname === '/';
    const dispatch = useDispatch();
    const categories = useSelector((state: RootState) => Array.from(state.categories.categories));
    const products = useSelector((state: RootState) => state.products.products);

    useEffect(() => {
        if (categories.length === 0) {
            const uniqueCategories = new Set(products.map(product => product.category));
            uniqueCategories.forEach(cat => dispatch(addCategory(cat)));
        }
    }, [categories, products, dispatch]);

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
        <SidebarContainer isVisible={isVisible} isMainPage={isMainPage}>
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
                    {categories.map((cat) => (
                        <MenuItem key={cat} value={cat}>
                            {cat}
                        </MenuItem>
                    ))}
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