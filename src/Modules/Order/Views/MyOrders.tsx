import React from 'react';
import { type MRT_ColumnDef } from 'material-react-table';
import dayjs from 'dayjs';

import { Table } from 'Components/Table/Table';
import { PageOutLine } from "Components/OutLine/PageOutLine";
import { Status } from 'Components/UtilsComponents';

import { useAppDispatch, useAppSelector } from "Services/Hook/Hook";
import { getOrderListAction, getOrderState, insertOrderAction } from "../Reducer/OrderAction";
import { Order } from '../Types/Types';
import { ItemList } from '../Components/ItemList';

const MyOrders = () => {
    const orderState = useAppSelector(getOrderState);
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(getOrderListAction({}));
        return () => { }
    }, [])

    const onChangeStatus = (data: string, id: string) => {
        dispatch(insertOrderAction({ _id: id, status: data }));
    }

    const renderExpandPanel = React.useCallback(
        (row: any) => {
            return <ItemList data={row} onChangeStatus={onChangeStatus} />
        }, [],)

    const columns = React.useMemo<MRT_ColumnDef<Order>[]>(
        () => [
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

    return (
        <PageOutLine>
            <Table
                columns={columns}
                data={orderState?.orderList}
                renderExpandPanel={renderExpandPanel}
                enableExpanding={true}
            />
        </PageOutLine>
    )
}

export default MyOrders
