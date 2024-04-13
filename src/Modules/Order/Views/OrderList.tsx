import React from 'react';
import { type MRT_ColumnDef } from 'material-react-table';
import dayjs from 'dayjs';

import { PageOutLine } from "Components/OutLine/PageOutLine";
import { Status } from 'Components/UtilsComponents';
import { Table } from 'Components/Table/Table';

import { useAppDispatch, useAppSelector } from "Services/Hook/Hook";
import { getAuthUser } from 'Services/Methods/AuthMethods';

import { Order } from '../Types/Types';
import { getOrderListAction, getOrderState, insertOrderAction } from "../Reducer/OrderAction";
import { ItemList } from '../Components/ItemList';

type Props = {}

const TableComponent = React.memo(() => {
    const orderState = useAppSelector(getOrderState);
    const dispatch = useAppDispatch();

    const exportOptionsField = ['userName', 'totalAmount', 'totalItems', 'updatedAt', 'createdAt', 'status'];
    const user = getAuthUser();

    const onChangeStatus = (data: string, id: string) => {
        dispatch(insertOrderAction({ _id: id, status: data }));
    }

    const columns = React.useMemo<MRT_ColumnDef<Order>[]>(
        () => [
            {
                accessorKey: 'userName',
                header: 'User',
            },
            {
                accessorKey: 'totalAmount',
                header: 'Amount',
            },
            {
                accessorKey: 'totalItems',
                header: 'Items',
            },
            {
                accessorFn: (row) => row.createdAt ? new Date(row.createdAt) : "-",
                id: 'createdAt',
                header: 'Created',
                filterVariant: 'date',
                filterFn: 'lessThan',
                sortingFn: 'datetime',
                Cell: ({ cell }) => dayjs(cell.getValue<Date>())?.format('DD/MM/YYYY'),
            },
            {
                accessorFn: (row) => row.updatedAt ? new Date(row.updatedAt) : "-",
                id: 'updatedAt',
                header: 'Modified',
                filterVariant: 'date',
                filterFn: 'lessThan',
                sortingFn: 'datetime',
                Cell: ({ cell }) => dayjs(cell.getValue<Date>())?.format('DD/MM/YYYY'),
            },
            {
                accessorKey: 'status',
                filterVariant: 'autocomplete',
                header: 'Status',
                Cell: ({ cell }) => (
                    <Status value={cell.getValue<string>()} />
                )
            }
        ], []);

    const renderExpandPanel = React.useCallback(
        (row: any) => {
            return <ItemList data={row} onChangeStatus={onChangeStatus} role={user.userRole} />
        }, [],)

    return (<Table
        columns={columns}
        data={orderState.orderList}
        exportOptionsField={exportOptionsField}
        isEnableExportFileName='Orders'
        renderExpandPanel={renderExpandPanel}
        enableExpanding={true}
    />);
}, () => true);


const OrderList = ({ }: Props) => {
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(getOrderListAction({}));
        return () => { }
    }, [])

    return (
        <PageOutLine>
            <TableComponent />
        </PageOutLine>
    )
}

export default OrderList;
