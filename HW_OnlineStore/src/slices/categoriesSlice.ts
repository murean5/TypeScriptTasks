import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../services/api';

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
    const response = await getCategories();
    return response.data;
});

export const addCategory = createAsyncThunk('categories/addCategory', async (name: string) => {
    const response = await createCategory(name);
    return response.data;
});

export const editCategory = createAsyncThunk('categories/editCategory', async ({ id, name }: { id: number, name: string }) => {
    const response = await updateCategory(id, name);
    return response.data;
});

export const removeCategory = createAsyncThunk('categories/removeCategory', async (id: number) => {
    await deleteCategory(id);
    return id;
});

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.fulfilled, (state, action) => action.payload)
            .addCase(addCategory.fulfilled, (state, action) => { state.push(action.payload); })
            .addCase(editCategory.fulfilled, (state, action) => {
                const index = state.findIndex(category => category.id === action.payload.id);
                if (index !== -1) state[index] = action.payload;
            })
            .addCase(removeCategory.fulfilled, (state, action) => {
                return state.filter(category => category.id !== action.payload);
            });
    },
});

export default categoriesSlice.reducer;