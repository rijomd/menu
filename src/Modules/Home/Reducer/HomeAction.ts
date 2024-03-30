/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";

import { RootState } from 'Services/Store/Store';
import { fetchApi } from "Services/Request";

import { itemList, categoryList, insertOrder } from "../Config/urlConstants";
import { settingList } from "Modules/Settings/Config/urlConstants";

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

export const getSettingListAction = createAsyncThunk(
    "Home/getSettingListAction",
    async (body: any, thunkAPI) => {
        try {
            const data = await fetchApi(body, settingList, 'get', false);
            return data?.['MiscList'];
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const placeOrderAction = createAsyncThunk(
    "Home/placeOrderAction",
    async (body: any, thunkAPI) => {
        try {
            const data = await fetchApi(body, insertOrder, 'post', false);
            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);