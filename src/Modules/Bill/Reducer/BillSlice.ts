import { createSlice, } from "@reduxjs/toolkit";

import { getBillListAction } from "./BillAction";
import { errorMessage, successMessage } from "../Config/Constants";
import { Bill } from '../Types/Types';

export type CounterState = {
    status: "idle" | "loading" | "success" | "failed";
    error: string | null | {};
    billList: Bill[];
}

const initialState: CounterState = {
    status: "idle",
    error: null,
    billList: [],

};
export const billSlice = createSlice({
    name: 'bill',
    initialState,
    reducers: {
    },

    extraReducers: (builder) => {
        builder.addCase(getBillListAction.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(getBillListAction.fulfilled, (state, action) => {
            state.status = "success";
            state.billList = action.payload;
            state.error = successMessage;
        });
        builder.addCase(getBillListAction.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload || errorMessage;
        });
    },
});

export const { } = billSlice.actions;
export default billSlice.reducer; 
