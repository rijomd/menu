
import { TypeOfMenuPages } from '../index';
import SettingsIcon from '@mui/icons-material/Settings';
import { getAuthUser } from 'Services/Methods/AuthMethods';

const icons = { SettingsIcon };
const user = getAuthUser();

export const Setting: TypeOfMenuPages = {
    id: 'miscSettings',
    title: 'Misc',
    type: 'group',
    url: "",
    permission: user?.userRole === 'User' ? false : true,
    children: [{
        id: 'settingsGroup',
        title: 'Settings',
        type: 'collapse',
        icon: icons.SettingsIcon,
        url: "",
        permission: user?.userRole === 'User' ? false : true,
        children: [
            {
                id: 'orderSettings',
                title: 'Order Settings',
                type: 'item',
                url: '/settingsList',
                breadcrumbs: true,
                permission: true,
                children: [],
            },
        ]
    }]
};
