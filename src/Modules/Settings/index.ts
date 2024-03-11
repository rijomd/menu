import settingsSlice from './Reducer/SettingsSlice';
import Routes from './Router';

const containers = {
    "reducer": settingsSlice,
    "router": Routes,
    "moduleName": "Settings",
    "parentModuleName": "Settings",
}

export default containers;