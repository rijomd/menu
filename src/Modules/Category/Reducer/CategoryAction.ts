/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";

import { RootState } from 'Services/Store/Store';
import { fetchApi } from "Services/Request";

import { categoryList, insertCategory } from "../Config/urlConstants";
import axios from "../../../Services/Request";
import { encryptUser } from "Services/Methods/AuthMethods";

export const getCategoryAction = (state: RootState) => state.category;

export const getCategoryListAction = createAsyncThunk(
    "category/getCategoryListAction",
    async (body: any, thunkAPI) => {
        try {
            const data = await fetchApi(body, categoryList, 'get', false);
            return data?.['CategoryList'];
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const insertCategoryAction = createAsyncThunk(
    "category/insertCategoryAction",
    async (body: any, thunkAPI) => {
        try {
            const formData = new FormData();
            formData.append('file', body.image);
            formData.append('encryptedCredentials', encryptUser(body));
            await axios.post(insertCategory, formData, {
                headers: { 'Content-Type': 'multipart/form-data', },
            });
            thunkAPI.dispatch(getCategoryListAction({}));
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
