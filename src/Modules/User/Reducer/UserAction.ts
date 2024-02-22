/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";

import { RootState } from 'Services/Store/Store';
import { fetchApi } from "Services/Request";
import { encryptUser } from "Services/Methods/AuthMethods";

import { userList } from "../Config/urlConstants";

export const getUserState = (state: RootState) => state.user;

export const getUserListAction = createAsyncThunk(
    "user/getUserListAction",
    async (body: any, thunkAPI) => {
        // const encryptedCredentials = encryptUser(body);
        try {
            const data = await fetchApi(body, userList, 'get');
            return data?.['UserList'];
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);


