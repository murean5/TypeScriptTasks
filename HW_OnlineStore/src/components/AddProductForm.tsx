import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../slices/productsSlice';
import { RootState } from '../store';
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

const isValidUrl = (url: string) => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

const AddProductForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const dispatch = useDispatch();
    const categories = useSelector((state: RootState) => Array.from(state.categories.categories));

    const [product, setProduct] = useState({
        name: '',
        description: '',
        category: '',
        quantity: 0,
        unit: '',
        price: 0,
        img_url: '',
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
    ) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name as string]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!product.category) {
            alert('Выберите категорию');
            return;
        }

        const imgUrl = isValidUrl(product.img_url) ? product.img_url : 'https://placehold.co/300x200/png?text=No+image';

        const newProduct = {
            ...product,
            id: Date.now(),
            img_url: imgUrl,
        };

        dispatch(addProduct(newProduct));
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
                    <MenuItem key={cat} value={cat}>
                        {cat}
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