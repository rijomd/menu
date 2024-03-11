import React from 'react';

import { PageOutLine } from "Components/OutLine/PageOutLine";
import { getSettingListAction, getSettingsState, insertSettingsAction } from "../Reducer/SettingsAction";

import { TableComponent } from '../Components/TableComponent';
import { SettingsForm } from '../Components/SettingsForm';

import { useAppDispatch, useAppSelector } from "Services/Hook/Hook";
import { getAuthUser } from 'Services/Methods/AuthMethods';



const SettingsList = () => {
    const itemState = useAppSelector(getSettingsState);
    const dispatch = useAppDispatch();
    const user = getAuthUser();

    React.useEffect(() => {
        dispatch(getSettingListAction({}));
        return () => { }
    }, [])

    const handleSubmit = (data: any) => {
        dispatch(insertSettingsAction(data));
    }

    return (
        <PageOutLine>
            {user?.userRole === 'superAdmin' ? <TableComponent list={itemState.settingsList} /> :
                <SettingsForm initialData={{ ...itemState.settings, location: user?.location }} handleSubmit={handleSubmit} />}

        </PageOutLine>
    )
}
export default SettingsList;
