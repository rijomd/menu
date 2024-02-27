import { createSlice, } from "@reduxjs/toolkit";

import { getLocationListAction } from "./LocationAction";
import { errorMessage, successMessage } from "../Config/Constants";
import { Location } from '../Types/Types';


export type CounterState = {
    status: "idle" | "loading" | "success" | "failed";
    error: string | null | {};
    locationList: Location[];
    location: Location;
}

const initialState: CounterState = {
    status: "idle",
    error: null,
    locationList: [],
    location: {
        name: '',
        code: '',
        status: 'Active'
    }
};
export const LocationSlice = createSlice({
    name: 'Location',
    initialState,
    reducers: {
    },

    extraReducers: (builder) => {
        builder.addCase(getLocationListAction.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(getLocationListAction.fulfilled, (state, action) => {
            state.status = "success";
            state.locationList = action.payload;
            state.error = successMessage;
        });
        builder.addCase(getLocationListAction.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload || errorMessage;
        });
    },

});

export const { } = LocationSlice.actions;
export default LocationSlice.reducer; 
