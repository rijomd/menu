import { getAuthUser } from 'Services/Methods/AuthMethods';
const user = getAuthUser();

const Routes = [
    {
        name: "Category",
        path: "/categoryList",
        elementPath: "CategoryList",
        auth: true,
        permission: user?.userRole === 'User' ? false : true,
    },
]

export default Routes;