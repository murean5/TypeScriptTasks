import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserListPage } from './pages/UserListPage';
import { UserDetailPage } from './pages/UserDetailPage';

export const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<UserListPage />} />
                <Route path="/users/:id" element={<UserDetailPage />} />
            </Routes>
        </Router>
    );
};
