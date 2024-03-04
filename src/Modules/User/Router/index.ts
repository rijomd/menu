import { getAuthUser } from 'Services/Methods/AuthMethods';

const Routes = [
    {
        name: "user",
        path: "/userList",
        elementPath: "UserList",
        auth: true,
        permission: getAuthUser()?.userRole === 'User' ? false : true,
    },
]

export default Routes;