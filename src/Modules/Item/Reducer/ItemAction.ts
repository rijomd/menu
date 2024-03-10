/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";

import { RootState } from 'Services/Store/Store';
import { fetchApi } from "Services/Request";
import axios from "Services/Request";
import { encryptUser } from "Services/Methods/AuthMethods";

import { itemList, insertItem, categoryCompo } from "../Config/urlConstants";

export const getItemState = (state: RootState) => state.item;

export const getItemListAction = createAsyncThunk(
    "Item/getItemListAction",
    async (body: any, thunkAPI) => {
        try {
            const data = await fetchApi(body, itemList, 'get', false);
            return data?.['ItemList'];
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const insertItemAction = createAsyncThunk(
    "category/insertItemAction",
    async (body: any, thunkAPI) => {
        try {
            const formData = new FormData();
            formData.append('file', body.image);
            formData.append('encryptedCredentials', encryptUser(body));
            await axios.post(insertItem, formData, {
                headers: { 'Content-Type': 'multipart/form-data', },
            });
            thunkAPI.dispatch(getItemListAction({}));
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);


export const getCategoryCompo = createAsyncThunk(
    "Item/getCategoryCompo",
    async (body: any, thunkAPI) => {
        try {
            const data = await fetchApi(body, categoryCompo, 'get');
            return data?.['CategoryCompo'];
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

