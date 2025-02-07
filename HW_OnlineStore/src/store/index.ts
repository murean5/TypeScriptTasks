import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../slices/productsSlice';
import categoriesReducer from '../slices/categoriesSlice';
import userReducer from '../slices/userSlice';

const store = configureStore({
    reducer: {
        products: productsReducer,
        categories: categoriesReducer,
        user: userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;