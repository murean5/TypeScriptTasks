import React from 'react';
import { Card as MuiCard, CardMedia, Typography } from '@mui/material';
import { styled } from '@mui/system';

type CardProps = {
    name: string;
    description: string;
    category: string;
    quantity: number;
    unit: string;
    image?: string;
    onClick: () => void;
};

const CustomCard = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '250px',
    padding: '20px',
    backgroundColor: theme.palette.background.default,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '8px',
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    cursor: 'pointer',
    margin: '10px',
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
    },
}));

const CardImage = styled(CardMedia)({
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    backgroundColor: '#e0e0e0',
    flexShrink: 0,
});

const CardTitle = styled(Typography)({
    fontWeight: 'bold',
    fontSize: '18px',
    color: '#2c3e50',
    margin: '10px 0 6px',
});

const CardCategory = styled(Typography)(({ theme }) => ({
    fontSize: '15px',
    color: theme.palette.secondary.main,
    marginBottom: '10px',
}));

const CardDescription = styled(Typography)({
    fontSize: '13px',
    color: '#34495e',
    textAlign: 'center',
    marginBottom: '10px',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
});

const CardQuantityText = styled(Typography)({
    fontSize: '15px',
    color: '#34495e',
    marginTop: 'auto',
});

const CardQuantityNumber = styled(Typography)<{ isZero: boolean }>(({ isZero }) => ({
    fontSize: '15px',
    color: isZero ? '#e74c3c' : '#27ae60',
    marginLeft: '4px',
}));

const CardUnit = styled(Typography)({
    fontSize: '15px',
    color: '#34495e',
    marginTop: '4px',
});

const Card: React.FC<CardProps> = ({ name, description, category, quantity, unit, image, onClick }) => {
    return (
        <CustomCard onClick={onClick}>
            <CardImage
                image={image || "https://placehold.co/200x150/png?text=No+image"}
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/200x150/png?text=No+image'; }}
            />
            <CardTitle>{name}</CardTitle>
            <CardCategory>{category}</CardCategory>
            <CardDescription>{description}</CardDescription>
            <CardUnit>Единица: {unit}</CardUnit>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <CardQuantityText>Осталось позиций:</CardQuantityText>
                <CardQuantityNumber isZero={quantity === 0}>{quantity}</CardQuantityNumber>
            </div>
        </CustomCard>
    );
};

export default Card;