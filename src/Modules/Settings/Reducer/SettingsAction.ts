/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";

import { RootState } from 'Services/Store/Store';
import { fetchApi } from "Services/Request";

import { settingList, insertSettings } from "../Config/urlConstants";

export const getSettingsState = (state: RootState) => state.settings;

export const getSettingListAction = createAsyncThunk(
    "Settings/getSettingListAction",
    async (body: any, thunkAPI) => {
        try {
            const data = await fetchApi(body, settingList, 'get', false);
            return data?.['MiscList'];
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const insertSettingsAction = createAsyncThunk(
    "Settings/insertSettingsAction",
    async (body: any, thunkAPI) => {
        try {
            await fetchApi(body, insertSettings, 'post',true);
            thunkAPI.dispatch(getSettingListAction({}));
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
