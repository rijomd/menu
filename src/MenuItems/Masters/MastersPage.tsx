
import { TypeOfMenuPages } from '../index';
import BusinessIcon from '@mui/icons-material/Business';
import { getAuthUser } from 'Services/Methods/AuthMethods';

const icons = { BusinessIcon };

export const Masters: TypeOfMenuPages = {
    id: 'mastersGroup',
    title: 'Master',
    type: 'group',
    url: "",
    permission: getAuthUser()?.userRole === 'User' ? false : true,
    children: [{
        id: 'masters',
        title: 'Masters',
        type: 'collapse',
        icon: icons.BusinessIcon,
        url: "",
        permission: getAuthUser()?.userRole === 'User' ? false : true,
        children: [
            {
                id: 'userList',
                title: 'User',
                type: 'item',
                url: '/userList',
                breadcrumbs: true,
                children: [],
                permission: true
            },
            {
                id: 'locationList',
                title: 'Location',
                type: 'item',
                url: '/locationList',
                breadcrumbs: true,
                children: [],
                permission: getAuthUser()?.userRole === 'superAdmin' ? true : false,
            },
            {
                id: 'categoryList',
                title: 'Category',
                type: 'item',
                url: '/categoryList',
                breadcrumbs: true,
                children: [],
                permission: true
            },
            {
                id: 'itemList',
                title: 'Item',
                type: 'item',
                url: '/itemList',
                breadcrumbs: true,
                children: [],
                permission: true
            }
        ]
    }]
};
