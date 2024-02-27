import auth from './Auth';
import home from './Home';

import category from './Category';
import item from './Item';
import user from './User';
import location from './Location';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const containers: any = {
    auth: auth,
    home: home,
    category: category,
    item: item,
    user: user,
    location: location
};

export default containers;
