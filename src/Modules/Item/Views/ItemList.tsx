import React from 'react';
import { type MRT_ColumnDef, MRT_RowData } from 'material-react-table';
import EditNoteIcon from '@mui/icons-material/EditNote';

import { PageOutLine } from "Components/OutLine/PageOutLine";
import { Modal } from 'Components/Modals/Modal';
import { Status } from 'Components/UtilsComponents';

import { Table } from 'Components/Table/Table';
import { TypeActions } from 'Components/Table/Components/TableActions';
import { TypeRowActions } from 'Components/Table/Components/MenuActions';

import { useAppDispatch, useAppSelector } from "Services/Hook/Hook";
import { getAuthUser } from 'Services/Methods/AuthMethods';

import { Item } from '../Types/Types';
import { ItemForm } from "../Components/ItemForm";
import { getItemListAction, getItemState, insertItemAction, getCategoryCompo } from "../Reducer/ItemAction";

type Props = {}

const TableComponent = React.memo(({ setOpenModal }: { setOpenModal: (data: any) => void }) => {
    const itemState = useAppSelector(getItemState);
    const exportOptionsField = ['name', 'sellingPrice', 'location', 'quantity', 'createdAt', 'status', 'offer', 'category'];
    const user = getAuthUser();

    const actions = React.useMemo<TypeActions[]>(() => [
        {
            name: 'Add', onClick: () => {
                setOpenModal({
                    open: true, data: {
                        ...itemState.item,
                        location: user?.location
                    }
                })
            },
            icon: <EditNoteIcon />
        },
    ], [])

    const columns = React.useMemo<MRT_ColumnDef<Item>[]>(
        () => [
            {
                accessorKey: 'name',
                header: 'Name',
                size:300
            },
            {
                accessorKey: 'category',
                header: 'Category',
            },
            {
                accessorKey: 'sellingPrice',
                header: 'Price',
                size:150
            },
            {
                accessorKey: 'quantity',
                header: 'Quantity',
                size:150
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
        [],);

    const rowActions = React.useMemo<TypeRowActions[]>(() => [
        { name: 'Edit', icon: <EditNoteIcon color='secondary' />, label: 'Edit' },
    ], [])

    const getRowActions = (name: string, data: MRT_RowData) => {
        if (name === 'Edit') {
            setOpenModal({
                open: true, data: {
                    ...data,
                    status: data.status === 'Active' ? true : false,
                    category: data.categoryId,
                    location: data.locationId
                }
            })
        }
    }

    return (<Table
        columns={columns}
        data={itemState.itemList}
        actions={actions}
        rowActions={rowActions}
        getRowActions={getRowActions}
        exportOptionsField={exportOptionsField}
        isEnableExportFileName='Item'
    />);
}, () => true);

const FormComponent = React.memo(({ openModal, setOpenModal }: { openModal: any, setOpenModal: (data: any) => void }) => {
    const formRef: React.MutableRefObject<any> = React.useRef(null);
    const dispatch = useAppDispatch();

    const handleSubmit = (data: any) => {
        dispatch(insertItemAction({ ...data, status: data.status === false ? 'InActive' : 'Active' })).then(res => {
            if (res) { setOpenModal({ open: false, data: {}, }) }
        })
    }

    const onAction = (name: string) => {
        if (name === 'success') {
            formRef.current.handleSubmit()
        }
        else {
            formRef.current.handleClear();
            setOpenModal({ open: false, data: {}, })
        }
    }

    return (
        <Modal title="Item Details" open={openModal.open}
            handleClose={() => setOpenModal({ open: false, data: {}, })}
            disableBackgroundClose
            onAction={onAction}>
            <ItemForm formRef={formRef} handleSubmit={handleSubmit} initialData={openModal.data} />
        </Modal>
    );
}, () => true);

const ItemList = ({ }: Props) => {
    const dispatch = useAppDispatch();
    const [openModal, setOpenModal] = React.useState(false);

    React.useEffect(() => {
        dispatch(getItemListAction({}));
        dispatch(getCategoryCompo({}));
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
}

export default ItemList;
