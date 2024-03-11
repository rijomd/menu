import { getAuthUser } from 'Services/Methods/AuthMethods';

const Routes = [
    {
        name: "Settings",
        path: "/settingsList",
        elementPath: "SettingsList",
        auth: true,
        permission: getAuthUser()?.userRole === 'User' ? false : true,
    },
]

export default Routes;