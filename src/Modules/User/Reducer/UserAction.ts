/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";

import { RootState } from 'Services/Store/Store';
import { fetchApi } from "Services/Request";

import { userList, insertUser, locationCompo } from "../Config/urlConstants";

export const getUserState = (state: RootState) => state.user;

export const getUserListAction = createAsyncThunk(
    "user/getUserListAction",
    async (body: any, thunkAPI) => {
        try {
            const data = await fetchApi(body, userList, 'get', false);
            return data?.['UserList'];
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const insertUserAction = createAsyncThunk(
    "user/insertUserAction",
    async (body: any, thunkAPI) => {
        console.log(body);
        try {
            await fetchApi(body, insertUser, 'post', true);
            thunkAPI.dispatch(getUserListAction({}));
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const getLocationCompo = createAsyncThunk(
    "user/getLocationCompo",
    async (body: any, thunkAPI) => {
        try {
            const data = await fetchApi(body, locationCompo, 'get');
            return data?.['locationCompo'];
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

