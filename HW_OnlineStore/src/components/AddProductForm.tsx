import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, Product } from '../slices/productsSlice';
import { RootState } from '../store';
import { TextField, Button, Box, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/system';

const FormContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '100%',
});

const AddProductForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const dispatch = useDispatch();
    const categories = useSelector((state: RootState) => state.categories.categories);
    const [product, setProduct] = useState<Omit<Product, 'id'>>({
        name: '',
        description: '',
        categoryId: '',
        quantity: 0,
        unit: '',
        price: 0,
        img_url: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name as string]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (product.price <= 0 || product.quantity <= 0) {
            alert('Цена и количество должны быть больше 0');
            return;
        }
        const productToSubmit = {
            ...product,
            id: Date.now(),
        };
        dispatch(addProduct(productToSubmit));
        onClose();
    };

    return (
        <FormContainer component="form" onSubmit={handleSubmit}>
            <TextField
                label="Название"
                name="name"
                value={product.name}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                size="small"
                required
            />
            <TextField
                label="Описание"
                name="description"
                value={product.description}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                size="small"
                required
            />
            <Select
                name="categoryId"
                value={product.categoryId}
                onChange={handleChange}
                displayEmpty
                fullWidth
                variant="outlined"
                size="small"
            >
                <MenuItem value="">Выберите категорию</MenuItem>
                {categories.map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>
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
                variant="outlined"
                size="small"
                required
            />
            <TextField
                label="Единица измерения"
                name="unit"
                value={product.unit}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                size="small"
                required
            />
            <TextField
                label="Цена"
                name="price"
                type="number"
                value={product.price}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                size="small"
                required
            />
            <TextField
                label="URL изображения"
                name="img_url"
                value={product.img_url}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                size="small"
            />
            <Button type="submit" variant="contained" color="primary">
                Сохранить
            </Button>
        </FormContainer>
    );
};

export default AddProductForm;