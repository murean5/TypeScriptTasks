import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProducts, createProduct, updateProduct as apiUpdateProduct, deleteProduct } from '../services/api';
import { ProductAttributes } from '../models/Product';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await getProducts();
    return response.data as ProductAttributes[];
});

export const addProduct = createAsyncThunk('products/addProduct', async (product: ProductAttributes) => {
    const response = await createProduct(product);
    return response.data;
});

export const updateProduct = createAsyncThunk('products/updateProduct', async ({ id, product }: { id: number, product: ProductAttributes }) => {
    const response = await apiUpdateProduct(id, product);
    return response.data;
});

export const removeProduct = createAsyncThunk('products/removeProduct', async (id: number) => {
    await deleteProduct(id);
    return id;
});

const productsSlice = createSlice({
    name: 'products',
    initialState: [] as ProductAttributes[],
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.fulfilled, (state, action) => action.payload)
            .addCase(addProduct.fulfilled, (state, action) => { state.push(action.payload); })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.findIndex(product => product.id === action.payload.id);
                if (index !== -1) state[index] = action.payload;
            })
            .addCase(removeProduct.fulfilled, (state, action) => {
                return state.filter(product => product.id !== action.payload);
            });
    },
});

export default productsSlice.reducer;