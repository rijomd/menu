import { getAuthUser } from 'Services/Methods/AuthMethods';
const user = await getAuthUser();

const Routes = [
    {
        name: "Item",
        path: "/itemList",
        elementPath: "ItemList",
        auth: true,
        permission: getAuthUser()?.userRole === 'User' ? false : true,
    },
]

export default Routes;