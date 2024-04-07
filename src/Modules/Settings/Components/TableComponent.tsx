import React from 'react';
import { type MRT_ColumnDef } from 'material-react-table';

import { Table } from 'Components/Table/Table';
import { Settings } from '../Types/Types';


export const TableComponent = React.memo(({ list }: { list: Settings[] }) => {

    const columns = React.useMemo<MRT_ColumnDef<Settings>[]>(
        () => [
            {
                accessorKey: 'location',
                header: 'Location',
            },
            {
                accessorKey: 'amountLimit',
                header: 'Amount Limit',
            },
            {
                accessorKey: 'countLimit',
                header: 'Count Limit',
            },
            {
                accessorKey: 'orderLimit',
                header: 'Order Limit',
            },
            {
                accessorKey: 'multipleCategorySelection',
                header: 'Multiple',
                Cell: ({ cell }) => cell.getValue<boolean>() === true ? 'Yes' : 'No',
            },
            {
                accessorFn: (row) => row.updatedAt ? new Date(row.updatedAt) : "-",
                id: 'updatedAt',
                header: 'Date',
                filterVariant: 'date',
                filterFn: 'lessThan',
                sortingFn: 'datetime',
                Cell: ({ cell }) => cell.getValue<Date>()?.toLocaleDateString(),
                Header: ({ column }) => <em>{column.columnDef.header}</em>,
            },
        ],
        [],);

    return (<Table
        columns={columns}
        data={list}
    />);
}, () => true);