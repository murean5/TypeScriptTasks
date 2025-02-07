import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Product = {
    id: number;
    name: string;
    description: string;
    category: string;
    quantity: number;
    unit: string;
    price: number;
    img_url: string;
};

type ProductsState = {
    products: Product[];
};

const initialState: ProductsState = {
    products: [
        {
            id: 1,
            name: 'Яблоки',
            description: 'Свежие зеленые яблоки',
            category: 'Фрукты',
            quantity: 100,
            unit: 'кг',
            price: 1.2,
            img_url: '../src/images/apples.png',
        },
        {
            id: 2,
            name: 'Апельсиновый сок',
            description: 'Свежевыжатый апельсиновый сок',
            category: 'Напитки',
            quantity: 50,
            unit: 'л',
            price: 3.5,
            img_url: '../src/images/juice.png',
        },
        {
            id: 3,
            name: 'Розовое дерево',
            description: 'Красивое розовое дерево',
            category: 'Растения',
            quantity: 20,
            unit: 'шт',
            price: 15.0,
        },
    ],
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<Product>) => {
            state.products.push(action.payload);
        },
        removeProduct: (state, action: PayloadAction<number>) => {
            state.products = state.products.filter(product => product.id !== action.payload);
        },
        updateProduct: (state, action: PayloadAction<Product>) => {
            const index = state.products.findIndex(product => product.id === action.payload.id);
            if (index !== -1) {
                state.products[index] = action.payload;
            }
        },
        updateProductCategory: (state, action: PayloadAction<{ oldName: string, newName: string }>) => {
            state.products.forEach(product => {
                if (product.category === action.payload.oldName) {
                    product.category = action.payload.newName;
                }
            });
        },
    },
});

export const { addProduct, removeProduct, updateProduct, updateProductCategory } = productsSlice.actions;
export default productsSlice.reducer;