import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { styled } from '@mui/system';

const FormContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '100%',
});

type CategoryFormProps = {
    category: string | null;
    onSubmit: (category: string) => void;
};

const CategoryForm: React.FC<CategoryFormProps> = ({ category, onSubmit }) => {
    const [name, setName] = useState('');

    useEffect(() => {
        if (category) {
            setName(category);
        }
    }, [category]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(name);
    };

    return (
        <FormContainer component="form" onSubmit={handleSubmit}>
            <TextField
                label="Название категории"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                required
            />
            <Button type="submit" variant="contained" color="primary">
                Сохранить
            </Button>
        </FormContainer>
    );
};

export default CategoryForm;