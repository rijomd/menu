import { createSlice, } from "@reduxjs/toolkit";

import { getCategoryListAction, getItemListAction, getSettingListAction } from "../Reducer/HomeAction";
import { errorMessage, successMessage } from "../Config/Constants";
import { Item, Category } from '../Types/Types';
import { Settings } from "Modules/Settings/Types/Types";

export type CounterState = {
    status: "idle" | "loading" | "success" | "failed";
    error: string | null | {};
    itemList: Item[];
    CategoryList: Category[];
    settingsList: Settings[]
}

const initialState: CounterState = {
    status: "idle",
    error: null,
    itemList: [],
    CategoryList: [],
    settingsList: []
};
export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
    },

    extraReducers: (builder) => {
        builder.addCase(getItemListAction.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(getItemListAction.fulfilled, (state, action) => {
            state.status = "success";
            state.itemList = action.payload;
            state.error = successMessage;
        });
        builder.addCase(getItemListAction.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload || errorMessage;
        });

        builder.addCase(getCategoryListAction.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(getCategoryListAction.fulfilled, (state, action) => {
            state.status = "success";
            state.CategoryList = action.payload;
            state.error = successMessage;
        });
        builder.addCase(getCategoryListAction.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload || errorMessage;
        });

        builder.addCase(getSettingListAction.fulfilled, (state, action) => {
            state.status = "success";
            state.settingsList = action.payload;
        });
    },
});

export const { } = homeSlice.actions;
export default homeSlice.reducer; 
