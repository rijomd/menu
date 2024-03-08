import React from 'react';
import { type MRT_ColumnDef, MRT_RowData } from 'material-react-table';
import EditNoteIcon from '@mui/icons-material/EditNote';

import { PageOutLine } from "Components/OutLine/PageOutLine";
import { Table } from 'Components/Table/Table';
import { Status } from 'Components/UtilsComponents/Status';
import { TypeRowActions } from 'Components/Table/Components/MenuActions';

import { useAppDispatch, useAppSelector } from "Services/Hook/Hook";
import { getCategoryListAction, getCategoryAction, insertCategoryAction } from "../Reducer/CategoryAction";

import { Category } from '../Types/Types';
import { CategoryForm } from '../Components/CategoryForm';

const CategoryList = () => {
  const categoryState = useAppSelector(getCategoryAction);
  const dispatch = useAppDispatch();
  const [formData, setFormData] = React.useState(categoryState.category);

  React.useEffect(() => {
    dispatch(getCategoryListAction({}));
    return () => { }
  }, [])

  const columns = React.useMemo<MRT_ColumnDef<Category>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Category Name',
        minSize: 300,
      },
      {
        accessorKey: 'image',
        header: 'Image',
        minSize: 300
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
        ),
        minSize: 300
      }
    ], [],);

  const rowActions = React.useMemo<TypeRowActions[]>(() => [
    { name: 'Edit', icon: <EditNoteIcon color='secondary' />, label: 'Edit' },
  ], [])

  const getRowActions = (name: string, data: MRT_RowData) => {
    if (name === 'Edit') {
      setFormData({ ...data, status: data.status === 'Active' ? true : false })
    }
  }

  const handleSubmit = (data: any) => {
    // URL.createObjectURL(data.image) for image preview
    
    dispatch(insertCategoryAction({ ...data, status: data.status === false ? 'InActive' : 'Active' }));
    if (data._id) { setFormData(categoryState.category) }
  }

  return (
    <PageOutLine>
      <CategoryForm initialData={formData} handleSubmit={handleSubmit} />
      <Table
        columns={columns}
        data={categoryState.categoryList}
        rowActions={rowActions}
        getRowActions={getRowActions}
      />
    </PageOutLine>
  )
}

export default React.memo(CategoryList);
