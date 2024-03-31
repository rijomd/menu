import React from 'react';

import { useAppDispatch, useAppSelector } from "Services/Hook/Hook";
import { getOrderListAction, getOrderState } from "../Reducer/OrderAction";


const MyOrders = () => {
    const orderState = useAppSelector(getOrderState);
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(getOrderListAction({}));
        return () => { }
    }, [])

    return (
        <div>MyOrders</div>
    )
}

export default MyOrders
