import React from 'react';
import { Box } from '@mui/material';

import { PageOutLine } from "Components/OutLine/PageOutLine";
import { getAuthUser } from 'Services/Methods/AuthMethods';
import { useAppDispatch, useAppSelector } from "Services/Hook/Hook";

import { CategoryList } from '../Components/CategoryList';
import { ItemList } from '../Components/ItemList';

import { getHomeAction, getCategoryListAction, getItemListAction, getSettingListAction } from "../Reducer/HomeAction";
import '../Style/style.css';

const DashBoard = () => {
    const user = getAuthUser();
    const homeState = useAppSelector(getHomeAction);
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(getCategoryListAction({}));
        dispatch(getItemListAction({}));
        dispatch(getSettingListAction({}));
        return () => { }
    }, [])

    const getItemByCategory = (id: string) => {
        dispatch(getItemListAction({ category: id }));
    }

    const getAllItem = () => {
        dispatch(getItemListAction({}));
    }

    return (
        <PageOutLine>
            {user.userRole === 'User' ?
                <Box sx={{ padding: '8px', position: 'relative' }}>
                    <CategoryList getItemByCategory={getItemByCategory} categoryList={homeState.CategoryList} />
                    <ItemList items={homeState.itemList} getAllItem={getAllItem} isLoading={homeState.loading === 'loading'} settingsList={homeState.settingsList} />
                </Box> :
                <></>}
        </PageOutLine>
    )
}
export default DashBoard

