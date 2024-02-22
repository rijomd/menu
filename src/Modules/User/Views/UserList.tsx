import React from 'react';
import { type MRT_ColumnDef, MRT_RowData } from 'material-react-table';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Box } from '@mui/material';

import { PageOutLine } from "Components/OutLine/PageOutLine";
import { Modal } from 'Components/Modals/Modal';

import { Table } from 'Components/Table/Table';
import { TypeActions } from 'Components/Table/Components/TableActions';
import { TypeRowActions } from 'Components/Table/Components/MenuActions';

import { useAppDispatch, useAppSelector } from "Services/Hook/Hook";
import { getStatusColor } from 'Utils/TableUtils';

import { User } from '../Types/Types';
import { UserForm } from "../Components/UserForm";
import { getUserListAction, getUserState } from "../Reducer/UserAction";

type Props = {}

const UserList = ({ }: Props) => {
    const userState = useAppSelector(getUserState);
    const dispatch = useAppDispatch();
    const [openModal, setOpenModal] = React.useState(false);

    const formRef: React.MutableRefObject<any> = React.useRef(null);
    const exportOptionsField = ['firstName', 'email', 'jobTitle']

    const actions = React.useMemo<TypeActions[]>(() => [
        { name: 'Add', onClick: () => { setOpenModal(true) }, icon: <EditIcon /> },
        { name: 'Save', color: 'success' },
    ], [])

    const columns = React.useMemo<MRT_ColumnDef<User>[]>(
        () => [
            {
                accessorKey: 'name',
                header: 'Email',
            },
            {
                accessorKey: 'email',
                header: 'Email',
            },
            {
                accessorKey: 'location',
                header: 'Location',
            },
            {
                accessorKey: 'userRole',
                header: 'Type',
            },
            {
                accessorFn: (row) => row.createdAt ? new Date(row.createdAt) : "-",
                id: 'startDate',
                header: 'Created',
                filterVariant: 'date',
                filterFn: 'lessThan',
                sortingFn: 'datetime',
                Cell: ({ cell }) => cell.getValue<Date>()?.toLocaleDateString(),
                Header: ({ column }) => <em>{column.columnDef.header}</em>,
            },
            {
                accessorKey: 'status',
                filterVariant: 'autocomplete',
                header: 'Status',
                Cell: ({ cell }) => (
                    <Box
                        component="span"
                        sx={() => ({
                            backgroundColor: getStatusColor(cell.getValue),
                            borderRadius: '0.25rem',
                            color: '#fff',
                            maxWidth: '9ch',
                            p: '0.25rem',
                        })}
                    >
                        {cell.getValue<string>()}
                    </Box>
                )
            }
        ],
        [],);

    const rowActions = React.useMemo<TypeRowActions[]>(() => [
        { name: 'Edit', icon: <EditIcon color='primary' />, label: 'Edit' },
        { name: 'Delete', icon: <DeleteIcon color='error' />, label: 'Delete' }
    ], [])


    React.useEffect(() => {
        dispatch(getUserListAction({}));
        return () => { }
    }, [])

    const onAction = (name: string) => {
        name === 'success' ? formRef.current.handleSubmit() : formRef.current.handleClear()
    }

    const getRowActions = (name: string, data: MRT_RowData) => {
        console.log(name, data);
    }


    return (
        <PageOutLine>
            <>
                <Table
                    columns={columns}
                    data={userState.userList}
                    actions={actions}
                    rowActions={rowActions}
                    getRowActions={getRowActions}
                    exportOptionsField={exportOptionsField}
                    isEnableExportFileName='User'
                />
                <Modal title="Add Sample Data" open={openModal} handleClose={() => setOpenModal(false)} onAction={onAction}>
                    <UserForm formRef={formRef} />
                </Modal>
            </>
        </PageOutLine>
    )
}

export default UserList;
