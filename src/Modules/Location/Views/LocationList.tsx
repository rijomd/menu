import React from 'react';
import { type MRT_ColumnDef, MRT_RowData } from 'material-react-table';
import EditNoteIcon from '@mui/icons-material/EditNote';

import { PageOutLine } from "Components/OutLine/PageOutLine";
import { Modal } from 'Components/Modals/Modal';
import { Status } from 'Components/UtilsComponents/Status';

import { Table } from 'Components/Table/Table';
import { TypeActions } from 'Components/Table/Components/TableActions';
import { TypeRowActions } from 'Components/Table/Components/MenuActions';

import { useAppDispatch, useAppSelector } from "Services/Hook/Hook";

import { Location } from '../Types/Types';
import { LocationForm } from "../Components/LocationForm";
import { getLocationListAction, getLocationState, insertLocationListAction } from "../Reducer/LocationAction";

const TableComponent = React.memo(({ setOpenModal }: { setOpenModal: (data: any) => void }) => {
    const LocationState = useAppSelector(getLocationState);
    const exportOptionsField = ['name', 'createdAt', 'code', 'status'];

    const actions = React.useMemo<TypeActions[]>(() => [
        { name: 'Add', onClick: () => { setOpenModal({ open: true, data: LocationState.location }) }, icon: <EditNoteIcon /> },
    ], [])

    const columns = React.useMemo<MRT_ColumnDef<Location>[]>(
        () => [
            {
                accessorKey: 'name',
                header: 'Email',
            },
            {
                accessorKey: 'code',
                header: 'Code',
            },
            {
                accessorFn: (row) => row.createdAt ? new Date(row.createdAt) : "-",
                id: 'createdAt',
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
                    <Status value={cell.getValue<string>()} />
                )
            }
        ],
        []);

    const rowActions = React.useMemo<TypeRowActions[]>(() => [
        { name: 'Edit', icon: <EditNoteIcon color='secondary' />, label: 'Edit' },
    ], [])

    const getRowActions = (name: string, data: MRT_RowData) => {
        if (name === 'Edit') {
            setOpenModal({ open: true, data: data })
        }
    }

    return (
        <Table
            columns={columns}
            data={LocationState.locationList}
            actions={actions}
            rowActions={rowActions}
            getRowActions={getRowActions}
            exportOptionsField={exportOptionsField}
            isEnableExportFileName='Location'
        />
    );
}, () => true);

const FormComponent = React.memo(({ openModal, setOpenModal }: { openModal: any, setOpenModal: (data: any) => void }) => {
    const formRef: React.MutableRefObject<any> = React.useRef(null);
    const dispatch = useAppDispatch();

    const handleSubmit = (data: any) => {
        dispatch(insertLocationListAction({ ...data, status: data.status === false ? 'InActive': 'Active' })).then(res => {
            if (res) { setOpenModal({ open: false, data: {} }) }
        })
    }

    const onAction = (name: string) => {
        if (name === 'success') {
            formRef.current.handleSubmit()
        }
        else {
            formRef.current.handleClear();
            setOpenModal({ open: false, data: {} })
        }
    }

    return (
        <Modal title="Location Details" open={openModal.open}
            handleClose={() => setOpenModal({ open: false, data: {} })}
            disableBackgroundClose
            onAction={onAction}>
            <LocationForm formRef={formRef} handleSubmit={handleSubmit} initialData={openModal.data} />
        </Modal>
    );
}, () => true);

const LocationList = React.memo(() => {
    const [openModal, setOpenModal] = React.useState({ open: false, data: {} });
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(getLocationListAction({}));
        return () => { }
    }, [])

    return (
        <PageOutLine>
            <TableComponent
                setOpenModal={(data) => { setOpenModal(data) }}
            />
            <FormComponent
                setOpenModal={(data) => { setOpenModal(data) }}
                openModal={openModal}
            />
        </PageOutLine>
    )
});
export default LocationList;



