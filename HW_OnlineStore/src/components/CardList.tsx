import React, { useState } from 'react';
import Card from './Card'; // Corrected import statement
import { Typography, Tooltip, Dialog, DialogTitle, DialogContent, Pagination } from '@mui/material';
import { styled } from '@mui/system';

type Product = {
    name: string;
    description: string;
    category: string;
    quantity: number;
    unit: string;
    image?: string;
};

type CardListProps = {
    filters: {
        productName: string;
        inStockOnly: boolean;
        category: string;
    };
};

const CardListContainer = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    padding: '20px',
    height: '100vh',
    width: '100vw',
}));

const CardListWrapper = styled('div')({
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
    marginTop: '20px',
});

const PaginationContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginBottom: '20px',
});

const CardList: React.FC<CardListProps> = ({ filters }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [page, setPage] = useState(1);
    const productsPerPage = 10;

    const products: Product[] = [
        {
            name: 'Яблоки',
            description: 'Обычные зеленые яблоки.',
            category: 'Фрукты',
            quantity: 2,
            unit: 'кг',
            image: '/src/imgs/apples.png',
        },
        {
            name: 'Алоэ',
            description: 'Супер длинное описание алоэ, чтобы продемонстрировать перенос строки и замену с помощью многоточия, когда текст длиннее одной строки.',
            category: 'Растения',
            quantity: 14,
            unit: 'шт',
            image: undefined,
        },
        {
            name: 'Сок',
            description: 'Очень вкусный апельсиновый сок.',
            category: 'Напитки',
            quantity: 3,
            unit: 'л',
            image: '/src/imgs/juice.png',
        },
        {
            name: 'Сок',
            description: 'Очень вкусный апельсиновый сок.',
            category: 'Напитки',
            quantity: 3,
            unit: 'л',
            image: '/src/imgs/juice.png',
        },
        {
            name: 'Сок',
            description: 'Очень вкусный апельсиновый сок.',
            category: 'Напитки',
            quantity: 3,
            unit: 'л',
            image: '/src/imgs/juice.png',
        },
        {
            name: 'Сок',
            description: 'Очень вкусный апельсиновый сок.',
            category: 'Напитки',
            quantity: 3,
            unit: 'л',
            image: '/src/imgs/juice.png',
        },
        {
            name: 'Сок',
            description: 'Очень вкусный апельсиновый сок.',
            category: 'Напитки',
            quantity: 3,
            unit: 'л',
            image: '/src/imgs/juice.png',
        },
        {
            name: 'Сок',
            description: 'Очень вкусный апельсиновый сок.',
            category: 'Напитки',
            quantity: 0,
            unit: 'л',
            image: '/src/imgs/juice.png',
        },
        {
            name: 'Сок',
            description: 'Очень вкусный апельсиновый сок.',
            category: 'Напитки',
            quantity: 0,
            unit: 'л',
            image: '/src/imgs/juice.png',
        },
        {
            name: 'Сок',
            description: 'Очень вкусный апельсиновый сок.',
            category: 'Напитки',
            quantity: 0,
            unit: 'л',
            image: '/src/imgs/juice.png',
        },
        {
            name: 'Сок',
            description: 'Очень вкусный апельсиновый сок.',
            category: 'Напитки',
            quantity: 3,
            unit: 'л',
            image: '/src/imgs/juice.png',
        },
        {
            name: 'Сок',
            description: 'Очень вкусный апельсиновый сок.',
            category: 'Напитки',
            quantity: 3,
            unit: 'л',
            image: '/src/imgs/juice.png',
        },
        {
            name: 'Сок',
            description: 'Очень вкусный апельсиновый сок.',
            category: 'Напитки',
            quantity: 3,
            unit: 'л',
            image: '/src/imgs/juice.png',
        }
    ];

    const handleCardClick = (product: Product) => {
        setSelectedProduct(product);
        setModalOpen(true);
    };

    const handleClose = () => {
        setModalOpen(false);
        setSelectedProduct(null);
    };

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const filteredProducts = products.filter(product => {
        const matchesName = new RegExp(filters.productName, 'i').test(product.name);
        const matchesCategory = filters.category === '' || product.category === filters.category;
        const matchesStock = !filters.inStockOnly || product.quantity > 0;
        return matchesName && matchesCategory && matchesStock;
    });

    const paginatedProducts = filteredProducts.slice((page - 1) * productsPerPage, page * productsPerPage);

    return (
        <CardListContainer>
            <PaginationContainer>
                <Pagination
                    count={Math.ceil(filteredProducts.length / productsPerPage)}
                    page={page}
                    onChange={handlePageChange}
                />
            </PaginationContainer>
            <CardListWrapper>
                {paginatedProducts.map((product, index) => (
                    <Tooltip key={index} title={product.description}>
                        <div>
                            <Card
                                name={product.name}
                                description={product.description}
                                category={product.category}
                                quantity={product.quantity}
                                unit={product.unit}
                                image={product.image}
                                onClick={() => handleCardClick(product)}
                            />
                        </div>
                    </Tooltip>
                ))}
            </CardListWrapper>
            <Dialog open={modalOpen} onClose={handleClose} maxWidth="md" fullWidth>
                {selectedProduct && (
                    <>
                        <DialogTitle>{selectedProduct.name}</DialogTitle>
                        <DialogContent>
                            <Typography>{selectedProduct.description}</Typography>
                            <br></br>
                            <Typography><strong>Категория:</strong> {selectedProduct.category}</Typography>
                            <Typography><strong>Количество:</strong> {selectedProduct.quantity} {selectedProduct.unit}
                            </Typography>
                            <br></br>
                            <img src={selectedProduct.image || 'https://placehold.co/600x400/png?text=No+image'}
                                 alt={selectedProduct.name} style={{width: '100%'}} onError={(e) => {
                                e.currentTarget.src = 'https://placehold.co/600x400/png?text=No+image';
                            }}/>
                        </DialogContent>
                    </>
                )}
            </Dialog>
        </CardListContainer>
    );
};

export default CardList;