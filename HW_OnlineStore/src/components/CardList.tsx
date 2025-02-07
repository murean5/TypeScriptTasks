import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store';
import { removeProduct, Product } from '../slices/productsSlice';
import Card from './Card';
import { Typography, Tooltip, Dialog, DialogTitle, DialogContent, Pagination, Button, Box } from '@mui/material';
import { styled } from '@mui/system';
import Modal from './Modal';
import AddProductForm from './AddProductForm';

const CardListContainer = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    padding: '20px',
    height: 'calc(100vh - 64px)',
    width: '100%',
    overflow: 'hidden',
    boxSizing: 'border-box',
    marginTop: '64px',
}));

const CardListWrapper = styled(Box)({
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
    marginTop: '20px',
});

const PaginationContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    marginTop: '20px',
    marginBottom: '20px',
});

const AddButtonContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
});

const CardContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px',
    '& button': {
        marginTop: '10px',
    },
});

type CardListProps = {
    filters: { productName: string; inStockOnly: boolean; category: string };
};

const CardList: React.FC<CardListProps> = ({ filters }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const products = useSelector((state: RootState) => state.products.products);
    const [modalOpen, setModalOpen] = useState(false);
    const [addProductModalOpen, setAddProductModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [page, setPage] = useState(1);
    const productsPerPage = 10;

    const handleCardClick = (product: Product) => {
        navigate(`/products/${product.id}`);
    };

    const handleClose = () => {
        setModalOpen(false);
        setSelectedProduct(null);
    };

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleDeleteProduct = (id: number) => {
        dispatch(removeProduct(id));
    };

    const handleAddProduct = () => {
        setAddProductModalOpen(true);
    };

    const handleAddProductClose = () => {
        setAddProductModalOpen(false);
    };

    const filteredProducts = products.filter((product) => {
        if (filters.productName && !product.name.toLowerCase().includes(filters.productName.toLowerCase())) {
            return false;
        }
        if (filters.inStockOnly && product.quantity === 0) {
            return false;
        }
        if (filters.category && product.category !== filters.category) {
            return false;
        }
        return true;
    });

    const paginatedProducts = filteredProducts.slice((page - 1) * productsPerPage, page * productsPerPage);

    return (
        <CardListContainer>
            <CardListWrapper>
                {paginatedProducts.map((product, index) => (
                    <Tooltip key={index} title={product.description}>
                        <CardContainer>
                            <Card
                                name={product.name}
                                description={product.description}
                                category={product.category}
                                quantity={product.quantity}
                                unit={product.unit}
                                image={product.img_url}
                                onClick={() => handleCardClick(product)}
                            />
                            <Button variant="outlined" color="secondary" onClick={() => handleDeleteProduct(product.id)}>Удалить</Button>
                        </CardContainer>
                    </Tooltip>
                ))}
            </CardListWrapper>
            <PaginationContainer>
                <Pagination
                    count={Math.ceil(filteredProducts.length / productsPerPage)}
                    page={page}
                    onChange={handlePageChange}
                />
            </PaginationContainer>
            <AddButtonContainer>
                <Button variant="contained" color="primary" onClick={handleAddProduct}>Добавить товар</Button>
            </AddButtonContainer>
            <Dialog open={modalOpen} onClose={handleClose} maxWidth="md" fullWidth>
                {selectedProduct && (
                    <>
                        <DialogTitle>{selectedProduct.name}</DialogTitle>
                        <DialogContent>
                            <Typography>{selectedProduct.description}</Typography>
                            <br></br>
                            <Typography><strong>Категория:</strong> {selectedProduct.category}</Typography>
                            <Typography><strong>Количество:</strong> {selectedProduct.quantity} {selectedProduct.unit}</Typography>
                            <br></br>
                            <img src={selectedProduct.img_url || 'https://placehold.co/600x400/png?text=No+image'}
                                 alt={selectedProduct.name} style={{ width: '100%' }} onError={(e) => {
                                e.currentTarget.src = 'https://placehold.co/600x400/png?text=No+image';
                            }}/>
                        </DialogContent>
                    </>
                )}
            </Dialog>
            <Modal open={addProductModalOpen} onClose={handleAddProductClose} title="Добавить товар">
                <AddProductForm onClose={handleAddProductClose} />
            </Modal>
        </CardListContainer>
    );
};

export default CardList;