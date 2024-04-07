/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";

import { RootState } from 'Services/Store/Store';
import { fetchApi } from "Services/Request";

import { orderList, insertOrder } from "../Config/urlConstants";

export const getOrderState = (state: RootState) => state.orders;

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

export const insertOrderAction = createAsyncThunk(
    "Order/insertOrderAction",
    async (body: any, thunkAPI) => {
        try {
            await fetchApi(body, insertOrder, 'post', false);
            thunkAPI.dispatch(getOrderListAction({}));
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);