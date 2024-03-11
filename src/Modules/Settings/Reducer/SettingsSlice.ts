import { createSlice } from "@reduxjs/toolkit";

import { getSettingListAction } from "./SettingsAction";
import { errorMessage, successMessage } from "../Config/Constants";
import { Settings } from '../Types/Types';

export type CounterState = {
    status: "idle" | "loading" | "success" | "failed";
    error: string | null | {};
    settingsList: Settings[];
    settings: Settings,
}

const initialState: CounterState = {
    status: "idle",
    error: null,
    settingsList: [],
    settings: {
        updatedAt: '',
        location: '',
        amountLimit: 0,
        countLimit: 0,
        multipleCategorySelection: false,
    }
};
export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
    },

    extraReducers: (builder) => {
        builder.addCase(getSettingListAction.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(getSettingListAction.fulfilled, (state, action) => {
            state.status = "success";
            state.settingsList = action.payload;
            state.settings = action.payload?.length > 0 && action.payload[0];
            state.error = successMessage;
        });
        builder.addCase(getSettingListAction.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload || errorMessage;
        });
    },



});

export const { } = settingsSlice.actions;
export default settingsSlice.reducer; 
