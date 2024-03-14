/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";

import { RootState } from 'Services/Store/Store';
import { fetchApi } from "Services/Request";

import { itemList, categoryList } from "../Config/urlConstants";

export const getHomeAction = (state: RootState) => state.home;

export const getCategoryListAction = createAsyncThunk(
    "Home/getCategoryListAction",
    async (body: any, thunkAPI) => {
        try {
            const data = await fetchApi(body, categoryList, 'get', false);
            return data?.['CategoryList'];
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const getItemListAction = createAsyncThunk(
    "Home/getItemListAction",
    async (body: any, thunkAPI) => {
        try {
            const data = await fetchApi(body, itemList, 'get', false);
            return data?.['ItemList'];
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
