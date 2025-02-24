import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { updateProduct } from '../slices/productsSlice';
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

type EditProductFormProps = {
    product: {
        id: number;
        name: string;
        description: string;
        category: string;
        quantity: number;
        unit: string;
        price: number;
        img_url: string;
    };
    onClose: () => void;
};

const EditProductForm: React.FC<EditProductFormProps> = ({ product, onClose }) => {
    const dispatch = useDispatch();
    const categories = useSelector((state: RootState) => state.categories);
    const [editedProduct, setEditedProduct] = useState(product);

    useEffect(() => {
        setEditedProduct(product);
        dispatch(fetchCategories());
    }, [product, dispatch]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
        const { name, value } = e.target;
        setEditedProduct((prevProduct) => ({
            ...prevProduct,
            [name as string]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(updateProduct(editedProduct));
        onClose();
    };

    return (
        <FormContainer component="form" onSubmit={handleSubmit}>
            <TextField
                label="Название товара"
                name="name"
                value={editedProduct.name}
                onChange={handleChange}
                fullWidth
                required
            />
            <TextField
                label="Описание"
                name="description"
                value={editedProduct.description}
                onChange={handleChange}
                fullWidth
                required
            />
            <Select
                name="category"
                value={editedProduct.category}
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
                value={editedProduct.quantity}
                onChange={handleChange}
                fullWidth
                required
            />
            <TextField
                label="Единица измерения"
                name="unit"
                value={editedProduct.unit}
                onChange={handleChange}
                fullWidth
                required
            />
            <TextField
                label="Цена"
                name="price"
                type="number"
                value={editedProduct.price}
                onChange={handleChange}
                fullWidth
                required
            />
            <TextField
                label="URL изображения"
                name="img_url"
                value={editedProduct.img_url}
                onChange={handleChange}
                fullWidth
            />
            <Button type="submit" variant="contained" color="primary">
                Сохранить изменения
            </Button>
        </FormContainer>
    );
};

export default EditProductForm;