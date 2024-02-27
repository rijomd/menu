/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";

import { RootState } from 'Services/Store/Store';
import { fetchApi } from "Services/Request";
import { useNotify } from "Services/Hook/useNotify";

import { locationList, insertLocation } from "../Config/urlConstants";

export const getLocationState = (state: RootState) => state.location;

export const getLocationListAction = createAsyncThunk(
    "user/getLocationListAction",
    async (body: any, thunkAPI) => {
        try {
            const data = await fetchApi(body, locationList, 'get');
            return data?.['locationList'];
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const insertLocationListAction = createAsyncThunk(
    "user/insertLocationListAction",
    async (body: any, thunkAPI) => {
        try {
            await fetchApi(body, insertLocation, 'post');
            thunkAPI.dispatch(getLocationListAction({}));
            useNotify("Successfully Completed", "error");
        } catch (error: any) {
            useNotify(error, "error");
            return thunkAPI.rejectWithValue(error);
        }
    }
);


