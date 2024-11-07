import React, { useState } from 'react';
import CardList from './components/CardList';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import './App.css';
import styles from './components/Sidebar.module.css';

const App: React.FC = () => {
    const [isSidebarVisible, setSidebarVisible] = useState(true);

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };

    return (
        <div>
            <Navbar toggleSidebar={toggleSidebar} />
            <div style={{ display: 'flex' }}>
                <div className={isSidebarVisible ? styles.sidebar : `${styles.sidebar} ${styles.hidden}`}>
                    <Sidebar />
                </div>
                <CardList />
            </div>
        </div>
    );
};

export default App;