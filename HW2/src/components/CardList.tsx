import React, { useState } from 'react';
import Card from './Card';
import Modal from './Modal';
import styles from './CardList.module.css';

type Product = {
    name: string;
    description: string;
    category: string;
    quantity: number;
    unit: string;
    image?: string;
};

const CardList: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const products: Product[] = [
        {
            name: 'Яблоки',
            description: 'Обычные зеленые яблоки',
            category: 'Фрукты',
            quantity: 2,
            unit: 'кг',
            image: 'https://clck.ru/3EU4SD',
        },
        {
            name: 'Алоэ',
            description: 'Супер длинное описание алоэ, чтобы продемонстрировать перенос строки и замену с помощью многоточия, когда текст длиннее трех строк',
            category: 'Растения',
            quantity: 14,
            unit: 'шт',
        },
        {
            name: 'Сок',
            description: 'Очень вкусный апельсиновый сок',
            category: 'Напитки',
            quantity: 3,
            unit: 'л',
            image: 'https://clck.ru/3EU4Sk',
        }
    ];

    const handleCardClick = (product: Product) => {
        setSelectedProduct(product);
        setModalOpen(true);
    };

    return (
        <div className={styles.cardList}>
            {products.map((product, index) => (
                <Card
                    key={index}
                    name={product.name}
                    description={product.description}
                    category={product.category}
                    quantity={product.quantity}
                    unit={product.unit}
                    image={product.image}
                    onClick={() => handleCardClick(product)}
                />
            ))}
            {modalOpen && selectedProduct && (
                <Modal onClose={() => setModalOpen(false)}>
                    <div>
                        <h2>{selectedProduct.name}</h2>
                        <p>{selectedProduct.description}</p>
                        <p>Категория: {selectedProduct.category}</p>
                        <p>Количество: {selectedProduct.quantity} {selectedProduct.unit}</p>
                        {selectedProduct.image ? (
                            <img src={selectedProduct.image} alt={selectedProduct.name} style={{ width: '100%' }} />
                        ) : (
                            <p>Изображение отсутствует</p>
                        )}
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default CardList;
