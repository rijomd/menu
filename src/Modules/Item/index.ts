import itemSlice from './Reducer/ItemSlice';
import Routes from './Router';

const containers = {
    "reducer": itemSlice,
    "router": Routes,
    "moduleName": "Item",
    "parentModuleName": "Masters",
}

export default containers;