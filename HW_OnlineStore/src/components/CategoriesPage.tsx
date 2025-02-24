import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { fetchCategories, addCategory, editCategory, removeCategory } from '../slices/categoriesSlice';
import { Button, Typography, Box, List, ListItem, ListItemText, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from './Modal';
import CategoryForm from './CategoryForm';

const CategoriesPage: React.FC = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state: RootState) => state.categories);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<{ id: number, name: string } | null>(null);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleAddCategory = () => {
        setSelectedCategory(null);
        setModalOpen(true);
    };

    const handleEditCategory = (category: { id: number, name: string }) => {
        setSelectedCategory(category);
        setModalOpen(true);
    };

    const handleDeleteCategory = (id: number) => {
        dispatch(removeCategory(id));
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedCategory(null);
    };

    const handleSubmit = (name: string) => {
        if (selectedCategory) {
            dispatch(editCategory({ id: selectedCategory.id, name }));
        } else {
            dispatch(addCategory(name));
        }
        handleCloseModal();
    };

    return (
        <Box>
            <Typography variant="h4">Categories</Typography>
            <Box display="flex" justifyContent="flex-start" mb={2} mt={4}>
                <Button variant="contained" color="primary" onClick={handleAddCategory}>
                    Добавить категорию
                </Button>
            </Box>
            <List>
                {categories.map((category) => (
                    <ListItem key={category.id}>
                        <ListItemText primary={category.name} />
                        <IconButton onClick={() => handleEditCategory(category)}>
                            <EditIcon />
                        </IconButton>
                        <Tooltip title="Delete">
                            <IconButton onClick={() => handleDeleteCategory(category.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </ListItem>
                ))}
            </List>
            <Modal open={modalOpen} onClose={handleCloseModal} title={selectedCategory ? "Редактирование категории" : "Добавление категории"}>
                <CategoryForm category={selectedCategory?.name || ''} onSubmit={handleSubmit} />
            </Modal>
        </Box>
    );
};

export default CategoriesPage;