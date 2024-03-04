import { createSlice, } from "@reduxjs/toolkit";

import { getUserListAction, getLocationCompo } from "../Reducer/UserAction";
import { errorMessage, successMessage } from "../Config/Constants";
import { User } from '../Types/Types';

export type CounterState = {
    status: "idle" | "loading" | "success" | "failed";
    error: string | null | {};
    userList: User[];
    user: User,
    locationCompo: { label: string, value: string }[],
}

const initialState: CounterState = {
    status: "idle",
    error: null,
    userList: [],
    locationCompo: [],
    user: {
        name: '',
        email: '',
        createdAt: '',
        location: '',
        userRole: '',
        status: 'Active'
    }
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
       
        builder.addCase(getLocationCompo.fulfilled, (state, action) => {
            state.status = "success";
            state.locationCompo = action.payload;
        });
       
    },



});

export const { } = userSlice.actions;
export default userSlice.reducer; 
