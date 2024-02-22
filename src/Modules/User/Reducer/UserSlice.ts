import { createSlice, } from "@reduxjs/toolkit";

import { getUserListAction } from "../Reducer/UserAction";
import { errorMessage, successMessage } from "../Config/Constants";
import { User } from '../Types/Types';

export type CounterState = {
    status: "idle" | "loading" | "success" | "failed";
    error: string | null | {};
    userList: User[];
}

const initialState: CounterState = {
    status: "idle",
    error: null,
    userList: []
};
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    },

    extraReducers: (builder) => {
        builder.addCase(getUserListAction.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(getUserListAction.fulfilled, (state, action) => {
            state.status = "success";
            state.userList = action.payload;
            state.error = successMessage;
        });
        builder.addCase(getUserListAction.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload || errorMessage;
        });
    },

});

export const { } = userSlice.actions;
export default userSlice.reducer; 
