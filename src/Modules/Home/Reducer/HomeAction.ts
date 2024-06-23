/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import dayjs from "dayjs";

import { RootState } from 'Services/Store/Store';
import { fetchApi } from "Services/Request";

import axios from "Services/Request";
import { encryptUser } from "Services/Methods/AuthMethods";
import { closeBill } from "./HomeSlice";

import { itemList, categoryList, insertOrder, closeOrder } from "../Config/urlConstants";
import { settingList } from "Modules/Settings/Config/urlConstants";
import { orderList } from "Modules/Order/Config/urlConstants";
import { useNotify } from "Services/Hook/useNotify";

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

export const getOrderHomeListAction = async (body: any) => {
    try {
        const data = await fetchApi(body, orderList, 'get', false);
        return data?.['OrderList'];
    } catch (error: any) {
        return error;
    }
}

export const closeOrderAction = createAsyncThunk(
    "Home/closeOrderAction",
    async (body: any, thunkAPI) => {
        try {
            const formData = new FormData();
            formData.append('file', body.orderDocument, `menu_kart-bill-${dayjs().format('DD-MM-YYYY')}-${Math.floor(100 + Math.random() * 900)}.pdf`);
            formData.append('encryptedCredentials', encryptUser(body));
            const res = await axios.post(closeOrder, formData, {
                headers: { 'Content-Type': 'multipart/form-data', },
            });
            thunkAPI.dispatch(closeBill(res.data));
            useNotify(res.data.message, "success");
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);