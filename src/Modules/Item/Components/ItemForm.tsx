import * as Yup from 'yup';
import { Box } from "@mui/material";

import { GeneralForm, TypeFormValues, FormButtonField } from 'Components/FormElements'
import { useAppSelector } from "Services/Hook/Hook";

import { getItemState } from "../Reducer/ItemAction";

export const ItemForm = ({ formRef, handleSubmit, initialData, }: { formRef?: any, handleSubmit: (data: any) => void, initialData: any, }) => {
    const itemState = useAppSelector(getItemState);

    const Schema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        category: Yup.string().required('Required'),
        location: Yup.string().required('Required'),
        sellingPrice: Yup.number()
            .required('Required')
            .min(5, 'Price at least 5 required')
            .max(5000, 'Price at most 5000 possible'),
        quantity: Yup.number()
            .required('Required')
            .min(1, 'Quantity at least 1 required')
            .max(5000, 'Quantity at most 5000 possible'),
        offer: Yup.number()
            .min(0, '-ve not allowed')
            .max(100, 'Offer within 100%'),
    });

    const formValues: TypeFormValues[] = [
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            required: true,
            grid: { largeDevice: 4, mediumDevice: 4 }
        },
        {
            name: 'category',
            label: 'Category',
            type: 'autocomplete',
            options: itemState.categoryCompo,
            required: true,
            disabled: initialData._id ? true : false,
            grid: { largeDevice: 4, mediumDevice: 4 }
        },
        {
            name: 'sellingPrice',
            label: 'Selling Price',
            type: 'number',
            required: true,
            grid: { largeDevice: 4, mediumDevice: 4 }
        },
        {
            name: 'quantity',
            label: 'Quantity',
            type: 'number',
            required: true,
            grid: { largeDevice: 4, mediumDevice: 4 }
        },
        {
            name: 'offer',
            label: 'Offer',
            type: 'number',
            grid: { largeDevice: 4, mediumDevice: 4 }
        },
        {
            name: 'status',
            label: 'Status',
            type: 'checkBox',
            hideColumn: initialData._id ? false : true,
            grid: { largeDevice: 4, mediumDevice: 4 }
        },
        {
            name: 'image',
            type: 'file',
            label: 'Upload Image',
            required: true,
            fileProps: { accept: 'image/*' },
            grid: { largeDevice: 4, mediumDevice: 4 }
        },
    ];


    return (
        <Box sx={{ margin: '8px 4px' }}>
            <GeneralForm
                handleSubmit={handleSubmit}
                initialValues={initialData}
                validationSchema={Schema}
                formValues={formValues}
                ref={formRef}
            />
            <FormButtonField sx={{ display: 'none' }} >Save</FormButtonField>
        </Box>
    )

}