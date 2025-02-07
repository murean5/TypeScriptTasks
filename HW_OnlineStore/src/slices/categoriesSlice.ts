import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CategoriesState = {
    categories: Set<string>;
};

const initialState: CategoriesState = {
    categories: new Set(),
};

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        addCategory: (state, action: PayloadAction<string>) => {
            state.categories.add(action.payload);
        },
        removeCategory: (state, action: PayloadAction<string>) => {
            state.categories.delete(action.payload);
        },
        updateCategory: (state, action: PayloadAction<{ oldName: string, newName: string }>) => {
            if (state.categories.delete(action.payload.oldName)) {
                state.categories.add(action.payload.newName);
            }
        },
    },
});

export const { addCategory, removeCategory, updateCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;