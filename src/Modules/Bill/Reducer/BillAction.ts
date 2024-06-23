/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";

import { RootState } from 'Services/Store/Store';
import { fetchApi } from "Services/Request";

import { BillList } from "../Config/urlConstants";

export const getBillState = (state: RootState) => state.bills;

export const getBillListAction = createAsyncThunk(
    "Bill/getBillListAction",
    async (body: any, thunkAPI) => {
        try {
            const data = await fetchApi(body, BillList, 'get', false);
            return data?.['billLists'];
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
