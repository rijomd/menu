import { getAuthUser } from 'Services/Methods/AuthMethods';
const userRole = getAuthUser()?.userRole;

const Routes = [
    {
        name: "Bill",
        path: "/billList",
        elementPath: "BillList",
        auth: true,
        permission: userRole === 'User' ? false : true,
    }
]

export default Routes;