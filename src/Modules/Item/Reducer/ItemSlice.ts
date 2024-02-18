import { createSlice } from '@reduxjs/toolkit';

export type CounterState = {
    isLoading: boolean;
}

const initialState: CounterState = {
    isLoading: false,
};

export const itemSlice = createSlice({
    name: 'item',
    initialState,
    reducers: {
    },
    extraReducers: () => {

    },
});

export const { } = itemSlice.actions;
export default itemSlice.reducer; 
