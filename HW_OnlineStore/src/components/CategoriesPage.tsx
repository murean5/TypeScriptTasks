import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { addCategory, updateCategory, removeCategory } from '../slices/categoriesSlice';
import { updateProductCategory } from '../slices/productsSlice';
import { Button, Typography, Box, List, ListItem, ListItemText, IconButton, Snackbar, Tooltip } from '@mui/material';
import { styled } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import CategoryForm from './CategoryForm';

const PageContainer = styled(Box)({
    padding: '20px',
    marginTop: '64px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
});

const TitleContainer = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '20px',
});

const AddCategoryButton = styled(Button)({
    marginTop: '20px',
    marginBottom: '20px',
});

const CategoriesPage: React.FC = () => {
    const dispatch = useDispatch();
    const products = useSelector((state: RootState) => state.products.products);
    const categories = useSelector((state: RootState) => state.categories.categories);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage] = useState('');

    useEffect(() => {
        const uniqueCategories = Array.from(new Set(products.map(product => product.category)));
        uniqueCategories.forEach(categoryName => {
            if (!categories.has(categoryName)) {
                dispatch(addCategory(categoryName));
            }
        });
    }, [products, categories, dispatch]);

    const handleAddCategory = () => {
        setSelectedCategory(null);
        setModalOpen(true);
    };

    const handleEditCategory = (category: string) => {
        setSelectedCategory(category);
        setModalOpen(true);
    };

    const handleDeleteCategory = (name: string) => {
        dispatch(removeCategory(name));
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedCategory(null);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handleSubmit = (category: string) => {
        if (selectedCategory) {
            dispatch(updateCategory({ oldName: selectedCategory, newName: category }));
            dispatch(updateProductCategory({ oldName: selectedCategory, newName: category }));
        } else {
            dispatch(addCategory(category));
        }
        handleCloseModal();
    };

    return (
        <PageContainer>
            <TitleContainer>
                <IconButton component={Link} to="/">
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h4">Управление категориями</Typography>
            </TitleContainer>
            <AddCategoryButton variant="contained" color="primary" onClick={handleAddCategory}>
                Добавить категорию
            </AddCategoryButton>
            <List>
                {Array.from(categories).map((category) => {
                    const hasProducts = products.some(product => product.category === category);
                    return (
                        <ListItem key={category}>
                            <ListItemText primary={category} />
                            <IconButton onClick={() => handleEditCategory(category)}>
                                <EditIcon />
                            </IconButton>
                            <Tooltip title={hasProducts ? "Невозможно удалить категорию, так как существуют товары с этой категорией." : ""}>
                                <span>
                                    <IconButton onClick={() => handleDeleteCategory(category)} disabled={hasProducts}>
                                        <DeleteIcon />
                                    </IconButton>
                                </span>
                            </Tooltip>
                        </ListItem>
                    );
                })}
            </List>
            <Modal open={modalOpen} onClose={handleCloseModal} title={selectedCategory ? "Редактирование категории" : "Добавление категории"}>
                <CategoryForm category={selectedCategory} onSubmit={handleSubmit} />
            </Modal>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            />
        </PageContainer>
    );
};

export default CategoriesPage;