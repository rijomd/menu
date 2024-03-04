import { getAuthUser } from 'Services/Methods/AuthMethods';

const Routes = [
    {
        name: "location",
        path: "/locationList",
        elementPath: "LocationList",
        auth: true,
        permission: getAuthUser()?.userRole === 'superAdmin' ? true : false,
    },
]

export default Routes;