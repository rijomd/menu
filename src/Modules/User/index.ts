import userSlice from './Reducer/UserSlice';
import Routes from './Router';

const containers = {
    "reducer": userSlice,
    "router": Routes,
    "moduleName": "User",
    "parentModuleName": "Masters",
}

export default containers;