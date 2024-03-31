
import { TypeOfMenuPages } from '../index';
import SettingsIcon from '@mui/icons-material/Settings';
import { getAuthUser } from 'Services/Methods/AuthMethods';

const icons = { SettingsIcon };
const user = getAuthUser();

export const Order: TypeOfMenuPages = {
    id: 'transaction',
    title: 'Transaction',
    type: 'group',
    url: "",
    permission: user?.userRole === 'User' ? false : true,
    children: [{
        id: 'order',
        title: 'Order',
        type: 'collapse',
        icon: icons.SettingsIcon,
        url: "",
        permission: user?.userRole === 'User' ? false : true,
        children: [
            {
                id: 'orderList',
                title: 'Order List',
                type: 'item',
                url: '/orderList',
                breadcrumbs: true,
                permission: true,
                children: [],
            },
        ]
    }]
};
