import { createSlice, } from "@reduxjs/toolkit";

import { getItemListAction, getCategoryCompo } from "../Reducer/ItemAction";
import { errorMessage, successMessage } from "../Config/Constants";
import { Item } from '../Types/Types';

export type CounterState = {
    status: "idle" | "loading" | "success" | "failed";
    error: string | null | {};
    itemList: Item[];
    item: Item,
    categoryCompo: { label: string, value: string }[],
}

const initialState: CounterState = {
    status: "idle",
    error: null,
    itemList: [],
    categoryCompo: [],
    item: {
        name: '',
        createdAt: '',
        location: '',
        status: 'Active',
        image: '',
        description: '',
        sellingPrice: 0,
        quantity: 0,
        offer: 0,
        category: '',
    }
};
export const itemSlice = createSlice({
    name: 'item',
    initialState,
    reducers: {
    },

    extraReducers: (builder) => {
        builder.addCase(getItemListAction.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(getItemListAction.fulfilled, (state, action) => {
            state.status = "success";
            state.itemList = action.payload;
            state.error = successMessage;
        });
        builder.addCase(getItemListAction.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload || errorMessage;
        });

        builder.addCase(getCategoryCompo.fulfilled, (state, action) => {
            state.status = "success";
            state.categoryCompo = action.payload;
        });

    },



});

export const { } = itemSlice.actions;
export default itemSlice.reducer; 
