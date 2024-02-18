
import { TypeOfMenuPages } from '../index';
import CottageIcon from '@mui/icons-material/Cottage';

const icons = { CottageIcon };

export const Masters: TypeOfMenuPages = {
    id: 'mastersGroup',
    title: 'Master',
    type: 'group',
    url: "",
    children: [{
        id: 'masters',
        title: 'Masters',
        type: 'collapse',
        icon: icons.CottageIcon,
        url: "",
        children: [
            {
                id: 'categoryList',
                title: 'Category',
                type: 'item',
                url: '/categoryList',
                breadcrumbs: true,
                children: []
            },
            {
                id: 'itemList',
                title: 'Item',
                type: 'item',
                url: '/itemList',
                breadcrumbs: true,
                children: []
            }
        ]
    }]
};
