
import React from 'react';
import { MRT_ColumnDef } from 'material-react-table';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { Box, Typography } from '@mui/material';

import { Bill } from '../Types/Types';
import { getBillListAction, getBillState } from '../Reducer/BillAction';

import { Table } from 'Components/Table/Table';
import { PageOutLine } from 'Components/OutLine/PageOutLine';

import { useAppDispatch, useAppSelector } from 'Services/Hook/Hook';
import { api_Image } from 'Services/Config/ApiConstants';

import { downloadFile } from 'Utils/DownLoadFile';

const BillList = () => {
    const billState = useAppSelector(getBillState);
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(getBillListAction({}));
        return () => { }
    }, [])

    // api_Image + cell.getValue
    const columns = React.useMemo<MRT_ColumnDef<Bill>[]>(
        () => [

            {
                accessorKey: 'ClosedBy',
                header: 'Closed By',
                size: 300
            },
            {
                accessorKey: 'location',
                header: 'Location',
                size: 300
            },
            {
                accessorFn: (row) => row.closedOn ? new Date(row.closedOn) : "-",
                id: 'closedOn',
                header: 'Closed On',
                filterVariant: 'date',
                filterFn: 'lessThan',
                sortingFn: 'datetime',
                Cell: ({ cell }) => cell.getValue<Date>()?.toLocaleDateString(),
                size: 300
            },
            {
                accessorKey: 'document',
                header: 'Document',
                Cell: ({ cell }) => (
                    <Box sx={{ display: "flex" }}>
                        <Typography mr={2}>{cell.getValue<string>()}</Typography>
                        <CloudDownloadIcon color='secondary' onClick={() => { downloadFile(api_Image + cell.getValue<string>(), cell.getValue<string>()) }} />
                    </Box>
                ),
                size: 300
            },
        ],
        [],);
    return (
        <PageOutLine>
            <Table
                columns={columns}
                data={billState.billList}
            />
        </PageOutLine>
    )
}
export default BillList;