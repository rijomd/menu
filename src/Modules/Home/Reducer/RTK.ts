import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getAuthToken } from 'Services/Methods/AuthMethods';
import { getMyAPiUrl } from "Services/Methods/AuthMethods";

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: getMyAPiUrl(),
        prepareHeaders: (headers, {  }) => {
            const token = getAuthToken();
            if (token) {
                headers.set('Authorization', token);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        insertOrder: builder.mutation({
            query: (data) => ({
                url: '/transaction/insertOrder',
                method: 'POST',
                body: data,
            }),
        }),
        getOrders: builder.mutation({
            query: () => ({
                url: '/transaction/orderList',
                method: 'get',
            }),
        }),
    }),

});

export const { useInsertOrderMutation, useGetOrdersMutation } = api;
export default api;
