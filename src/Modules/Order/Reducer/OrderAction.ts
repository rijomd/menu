/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";

import { RootState } from 'Services/Store/Store';
import { fetchApi } from "Services/Request";

import { orderList } from "../Config/urlConstants";

export const getOrderState = (state: RootState) => state.order;

export const getOrderListAction = createAsyncThunk(
    "Order/getOrderListAction",
    async (body: any, thunkAPI) => {
        try {
            const data = await fetchApi(body, orderList, 'get', false);
            return data?.['OrderList'];
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
