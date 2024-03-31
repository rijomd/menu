import { createSlice, } from "@reduxjs/toolkit";

import { getOrderListAction } from "./OrderAction";
import { errorMessage, successMessage } from "../Config/Constants";
import { Order } from '../Types/Types';

export type CounterState = {
    status: "idle" | "loading" | "success" | "failed";
    error: string | null | {};
    orderList: Order[];
}

const initialState: CounterState = {
    status: "idle",
    error: null,
    orderList: [],

};
export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
    },

    extraReducers: (builder) => {
        builder.addCase(getOrderListAction.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(getOrderListAction.fulfilled, (state, action) => {
            state.status = "success";
            state.orderList = action.payload;
            state.error = successMessage;
        });
        builder.addCase(getOrderListAction.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload || errorMessage;
        });
    },
});

export const { } = orderSlice.actions;
export default orderSlice.reducer; 
