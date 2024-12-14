import React, { useState } from 'react';
import CardList from './components/CardList';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import './App.css';

const App: React.FC = () => {
    const [isSidebarVisible, setSidebarVisible] = useState(false); // Set to false by default
    const [filters, setFilters] = useState({
        productName: '',
        inStockOnly: false,
        category: '',
    });

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };

    const applyFilters = (newFilters: { productName: string; inStockOnly: boolean; category: string }) => {
        setFilters(newFilters);
    };

    return (
        <div>
            <Navbar toggleSidebar={toggleSidebar} />
            <div style={{ display: 'flex', marginTop: '64px' }}>
                <Sidebar isVisible={isSidebarVisible} toggleVisibility={toggleSidebar} applyFilters={applyFilters} />
                <CardList filters={filters} />
            </div>
        </div>
    );
};

export default App;