import React from 'react';
import styles from './Navbar.module.css';

type NavbarProps = {
    toggleSidebar: () => void;
};

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => (
    <nav className={styles.navbar}>
        <button onClick={toggleSidebar}>Боковое меню</button>
        <button>Товары</button>
        <button>Склады</button>
        <button>О системе</button>
        <button>Личный кабинет</button>
    </nav>
);

export default Navbar;