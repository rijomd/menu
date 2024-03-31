import { getAuthUser } from 'Services/Methods/AuthMethods';

const userRole = getAuthUser()?.userRole;

const Routes = [
    {
        name: "Order",
        path: "/orderList",
        elementPath: "OrderList",
        auth: true,
        permission: userRole === 'User' ? false : true,
    },
    {
        name: "Order",
        path: "/myOrders",
        elementPath: "MyOrders",
        auth: true,
        permission: userRole === 'User' ? true : false,
    },
]

export default Routes;