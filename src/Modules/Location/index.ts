import locationSlice from './Reducer/LocationSlice';
import Routes from './Router';

const containers = {
    "reducer": locationSlice,
    "router": Routes,
    "moduleName": "Location",
    "parentModuleName": "Masters",
}

export default containers;