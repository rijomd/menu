import BillSlice from './Reducer/BillSlice';
import Routes from './Router';

const containers = {
    "reducer": BillSlice,
    "router": Routes,
    "moduleName": "Bill",
    "parentModuleName": "Transaction",
}

export default containers;