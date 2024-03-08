import { createSlice } from '@reduxjs/toolkit';

import { getCategoryListAction } from "../Reducer/CategoryAction";
import { errorMessage, successMessage } from "../Config/Constants";
import { Category } from '../Types/Types';

import { getAuthUser } from 'Services/Methods/AuthMethods';

export type CounterState = {
    status: "idle" | "loading" | "success" | "failed";
    error: string | null | {};
    categoryList: Category[];
    category: Category,
}

const initialState: CounterState = {
    status: "idle",
    error: null,
    categoryList: [],
    category: {
        name: '',
        image: null,
        location: getAuthUser()?.location,
        status: 'Active'
    }
};

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getCategoryListAction.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(getCategoryListAction.fulfilled, (state, action) => {
            state.status = "success";
            state.categoryList = action.payload;
            state.error = successMessage;
        });
        builder.addCase(getCategoryListAction.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload || errorMessage;
        });
    },
});

export const { } = categorySlice.actions;
export default categorySlice.reducer; 
