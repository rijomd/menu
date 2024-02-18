import { createSlice } from '@reduxjs/toolkit';

export type CounterState = {
    isLoading: boolean;
}

const initialState: CounterState = {
    isLoading: false,
};

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
    },
    extraReducers: () => {

    },
});

export const { } = categorySlice.actions;
export default categorySlice.reducer; 
