import React from 'react';
import { type MRT_ColumnDef } from 'material-react-table';
import EditNoteIcon from '@mui/icons-material/EditNote';
import dayjs from 'dayjs';

import { PageOutLine } from "Components/OutLine/PageOutLine";
import { Modal } from 'Components/Modals/Modal';
import { Status } from 'Components/UtilsComponents';
import { Table } from 'Components/Table/Table';
import { TypeActions } from 'Components/Table/Components/TableActions';

import { useAppDispatch, useAppSelector } from "Services/Hook/Hook";
import { getAuthUser } from 'Services/Methods/AuthMethods';

import { Order } from '../Types/Types';
import { getOrderListAction, getOrderState, insertOrderAction } from "../Reducer/OrderAction";
import { ItemList } from '../Components/ItemList';

type Props = {}

const TableComponent = React.memo(({ setOpenModal }: { setOpenModal: (data: any) => void }) => {
    const orderState = useAppSelector(getOrderState);
    const dispatch = useAppDispatch();

    const exportOptionsField = ['userName', 'totalAmount', 'totalItems', 'updatedAt', 'createdAt', 'status'];
    const user = getAuthUser();

    const onChangeStatus = (data: string, id: string) => {
        dispatch(insertOrderAction({ _id: id, status: data }));
    }

    const actions = React.useMemo<TypeActions[]>(() => [
        {
            name: 'Add', onClick: () => {
                setOpenModal({
                    open: true, data: {
                        ...orderState.order,
                        location: user?.location
                    }
                })
            },
            icon: <EditNoteIcon />
        },
    ], [])

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
        actions={actions}
        exportOptionsField={exportOptionsField}
        isEnableExportFileName='Orders'
        renderExpandPanel={renderExpandPanel}
        enableExpanding={true}
    />);
}, () => true);

const FormComponent = React.memo(({ openModal, setOpenModal }: { openModal: any, setOpenModal: (data: any) => void }) => {
    const formRef: React.MutableRefObject<any> = React.useRef(null);
    const dispatch = useAppDispatch();

    const handleSubmit = (data: any) => {
        dispatch(insertOrderAction({ ...data, status: data.status === false ? 'InActive' : 'Active' })).then(res => {
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
        <Modal title="Order Details" open={openModal.open}
            handleClose={() => setOpenModal({ open: false, data: {}, })}
            disableBackgroundClose
            onAction={onAction}>
            {/* <ItemForm formRef={formRef} handleSubmit={handleSubmit} initialData={openModal.data} /> */}
            <></>
        </Modal>
    );
}, () => true);

const OrderList = ({ }: Props) => {
    const dispatch = useAppDispatch();
    const [openModal, setOpenModal] = React.useState(false);

    React.useEffect(() => {
        dispatch(getOrderListAction({}));
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

export default OrderList;
