import auth from './Auth';
import home from './Home';

import category from './Category';
import item from './Item';
import user from './User';
import location from './Location';
import settings from './Settings';
import orders from './Order';
import bills from './Bill';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const containers: any = {
    auth: auth,
    home: home,
    category: category,
    item: item,
    user: user,
    location: location,
    settings: settings,
    orders: orders,
    bills: bills
};

export default containers;
