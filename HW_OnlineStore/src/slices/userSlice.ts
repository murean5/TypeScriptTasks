import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserState = {
    name: string;
    email: string;
    avatar: string;
    group: string;
};

const initialState: UserState = {
    name: 'Антон Муравьев',
    email: 'ayumuravev@edu.hse.ru',
    avatar: '',
    group: 'Студент',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUserProfile: (state, action: PayloadAction<{ name: string; email: string; avatar: string; group: string }>) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.avatar = action.payload.avatar;
            state.group = action.payload.group;
        },
    },
});

export const { updateUserProfile } = userSlice.actions;
export default userSlice.reducer;