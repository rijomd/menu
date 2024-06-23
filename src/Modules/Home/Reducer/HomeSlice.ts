import { createSlice, } from "@reduxjs/toolkit";

import { getCategoryListAction, getItemListAction, getSettingListAction } from "../Reducer/HomeAction";
import { errorMessage } from "../Config/Constants";
import { Item, Category } from '../Types/Types';
import { Settings } from "Modules/Settings/Types/Types";

export type CounterState = {
    status: "idle" | "loading" | "success" | "failed";
    orderStatus: "idle" | "loading" | "billSuccess" | "failed";
    error: string | null | {};
    itemList: Item[];
    CategoryList: Category[];
    settingsList: Settings[];
    billOrderList: any[];
    orderTotalAmount: number;
    orderListId: string[];
}

const initialState: CounterState = {
    status: "idle",
    orderStatus: 'idle',
    error: null,
    itemList: [],
    CategoryList: [],
    settingsList: [],
    billOrderList: [],
    orderTotalAmount: 0,
    orderListId: []
};
export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setBillData: (state, action) => {
            state.orderStatus = "billSuccess";

            const groupedOrders = action.payload?.length > 0 ? action.payload.reduce((acc: any, order: any) => {
                const { userName, ...rest } = order;
                if (!acc[userName]) {
                    acc[userName] = { orders: [], userName };
                }
                acc[userName].orders.push({ ...rest });
                return acc;
            }, {}) : []
            const groupedOrdersArray = Object.values(groupedOrders);
            state.billOrderList = groupedOrdersArray;
            state.orderTotalAmount = action.payload.reduce((acc: any, item: any) => { return acc = acc + item.totalAmount || 0 }, 0);

            state.orderListId = action.payload.map((item: any) => item._id);
        },
        closeBill: (state, action) => {
            state.orderStatus = "idle";
            state.billOrderList = [];
            state.error = action.payload.message;
        }
    },

    extraReducers: (builder) => {
        builder.addCase(getItemListAction.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(getItemListAction.fulfilled, (state, action) => {
            state.status = "success";
            state.itemList = action.payload;
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

export const { setBillData, closeBill } = homeSlice.actions;
export default homeSlice.reducer; 
