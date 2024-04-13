
import { TypeOfMenuPages } from '../index';
import DvrIcon from '@mui/icons-material/Dvr';
import { getAuthUser } from 'Services/Methods/AuthMethods';

const icons = { DvrIcon };
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
        icon: icons.DvrIcon,
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
            {
                id: 'billDetails',
                title: 'Order Reports',
                type: 'item',
                url: '/billDetails',
                breadcrumbs: true,
                permission: true,
                children: [],
            },
        ]
    }]
};
