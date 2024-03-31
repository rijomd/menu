import orderSlice from './Reducer/OrderSlice';
import Routes from './Router';

const containers = {
    "reducer": orderSlice,
    "router": Routes,
    "moduleName": "Order",
    "parentModuleName": "Transaction",
}

export default containers;