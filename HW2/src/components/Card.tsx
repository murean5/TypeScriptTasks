import React from 'react';
import styles from './Card.module.css';

type CardProps = {
    name: string;
    description: string;
    category: string;
    quantity: number;
    unit: string;
    image?: string;
    onClick: () => void;
};

const Card: React.FC<CardProps> = ({ name, description, category, quantity, unit, image, onClick }) => {
    return (
        <div className={styles.card} onClick={onClick}>
            {image ? (
                <img src={image} alt={name} className={styles['card-image']}/>
            ) : (
                <div className={styles['card-image-placeholder']}>Изображение отсутствует</div>
            )}
            <h3 className={styles['card-title']}>{name}</h3>
            <p className={styles['card-category']}>{category}</p>
            <p className={styles['card-description']}>
                {description.length > 70 ? `${description.substring(0, 67)}...` : description}
            </p>
            <p className={styles['card-unit']}>Единица: {unit}</p>
            <p className={styles['card-quantity']}>Осталось позиций: {quantity}</p>
        </div>
    );
};

export default Card;