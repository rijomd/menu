
import { TypeOfMenuPages } from '../index';
import CottageIcon from '@mui/icons-material/Cottage';
import DvrIcon from '@mui/icons-material/Dvr';
import { getAuthUser } from 'Services/Methods/AuthMethods';

const icons = { CottageIcon, DvrIcon };
const user = getAuthUser();

export const Dashboard: TypeOfMenuPages = {
    id: 'home',
    title: 'Home',
    type: 'group',
    url: "",
    permission: true,
    children: [
        {
            id: 'dashboard1',
            title: 'Home',
            type: 'item',
            icon: icons.CottageIcon,
            url: '/dashboard1',
            breadcrumbs: false,
            permission: true
        },
        {
            id: 'myOrder',
            title: 'My Order',
            type: 'item',
            icon: icons.DvrIcon,
            url: '/myOrders',
            breadcrumbs: true,
            permission: user?.userRole === 'User' ? true : false,
        }
    ]
};
