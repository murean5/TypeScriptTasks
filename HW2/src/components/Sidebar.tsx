import React from 'react';
import styles from './Sidebar.module.css';

const Sidebar: React.FC = () => (
    <aside className={styles.sidebar}>
        <input type="text" placeholder="Поиск товара" />
        <label>
            <input type="checkbox" /> Только товары в наличии
        </label>
        <select>
            <option>Все категории</option>
        </select>
    </aside>
);

export default Sidebar;
