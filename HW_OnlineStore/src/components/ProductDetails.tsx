import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { removeProduct } from '../slices/productsSlice';
import { Typography, Button, Box, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import Modal from './Modal';
import EditProductForm from './EditProductForm';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const DetailsContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '84px',
    gap: '20px',
});

const ProductImage = styled('img')({
    width: '300px',
    height: 'auto',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

const TitleContainer = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    gap: '10px',
});

const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const product = useSelector((state: RootState) => state.products.find(p => p.id === Number(id)));
    const [editModalOpen, setEditModalOpen] = useState(false);

    if (!product) {
        return <Typography>Product not found</Typography>;
    }

    const handleEditProduct = () => {
        setEditModalOpen(true);
    };

    const handleEditProductClose = () => {
        setEditModalOpen(false);
    };

    const handleDeleteProduct = () => {
        if (id) {
            dispatch(removeProduct(Number(id)));
            navigate('/');
        }
    };

    return (
        <DetailsContainer>
            <TitleContainer>
                <IconButton onClick={() => navigate('/')}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h4">{product.name}</Typography>
            </TitleContainer>
            <ProductImage
                src={product.img_url || 'https://placehold.co/300x200/png?text=No+image'}
                alt={product.name}
            />
            <Typography>{product.description}</Typography>
            <Typography><strong>Категория:</strong> {product.category}</Typography>
            <Typography><strong>Количество:</strong> {product.quantity} {product.unit}</Typography>
            <Typography><strong>Цена:</strong> ${product.price}</Typography>
            <Button variant="contained" color="primary" onClick={handleEditProduct}>Изменить</Button>
            <Button variant="outlined" color="secondary" onClick={handleDeleteProduct}>Удалить</Button>
            <Modal open={editModalOpen} onClose={handleEditProductClose} title="Редактирование товара">
                <EditProductForm product={product} onClose={handleEditProductClose} />
            </Modal>
        </DetailsContainer>
    );
};

export default ProductDetails;