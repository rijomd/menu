import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import Module from "../../Modules";
import { setupListeners } from '@reduxjs/toolkit/query';

import customizationReducer from 'Themes/Reducer/customizationSlice';
import { api } from 'Modules/Home/Reducer/RTK';

// Adding reducers of each modules
let reducer = {};
for (const item in Module) {
  const reducers = Module[item].reducer;
  reducer = {
    ...reducer,
    [item]: reducers,
  };
}
if (Object.keys(reducer).length !== 0) {
  reducer = {
    ...reducer,
    customization: customizationReducer,
    [api.reducerPath]: api.reducer,
  };
}

export const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
