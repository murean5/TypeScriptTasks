// `todo-app/src/index.tsx`
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// Рендеринг компонента App в корневой элемент
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);