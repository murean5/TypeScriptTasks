import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addProduct, fetchProducts } from '../slices/productsSlice';
import { fetchCategories } from '../slices/categoriesSlice';
import { TextField, Button, Select, MenuItem, Box } from '@mui/material';
import { styled } from '@mui/system';

const FormContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '100%',
    maxWidth: '500px',
    margin: '0 auto',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

const AddProductForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const dispatch = useDispatch();
    const categories = useSelector((state: RootState) => state.categories);
    const [product, setProduct] = useState({
        name: '',
        description: '',
        category: '',
        quantity: 0,
        price: 0,
        unit: '',
        img_url: '',
    });

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name as string]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(addProduct(product)).then(() => {
            dispatch(fetchProducts());
        });
        onClose();
    };

    return (
        <FormContainer component="form" onSubmit={handleSubmit}>
            <TextField
                label="Название товара"
                name="name"
                value={product.name}
                onChange={handleChange}
                fullWidth
                required
            />
            <TextField
                label="Описание"
                name="description"
                value={product.description}
                onChange={handleChange}
                fullWidth
                required
            />
            <Select
                name="category"
                value={product.category}
                onChange={handleChange}
                displayEmpty
                fullWidth
                required
            >
                <MenuItem value="">Выберите категорию</MenuItem>
                {categories.map((cat) => (
                    <MenuItem key={cat.id} value={cat.name}>
                        {cat.name}
                    </MenuItem>
                ))}
            </Select>
            <TextField
                label="Количество"
                name="quantity"
                type="number"
                value={product.quantity}
                onChange={handleChange}
                fullWidth
                required
            />
            <TextField
                label="Единица измерения"
                name="unit"
                value={product.unit}
                onChange={handleChange}
                fullWidth
                required
            />
            <TextField
                label="Цена"
                name="price"
                type="number"
                value={product.price}
                onChange={handleChange}
                fullWidth
                required
            />
            <TextField
                label="URL изображения"
                name="img_url"
                value={product.img_url}
                onChange={handleChange}
                fullWidth
            />
            <Button type="submit" variant="contained" color="primary">
                Добавить товар
            </Button>
        </FormContainer>
    );
};

export default AddProductForm;