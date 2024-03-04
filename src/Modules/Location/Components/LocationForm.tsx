import * as Yup from 'yup';
import { Box } from "@mui/material";

import { GeneralForm, TypeFormValues, FormButtonField } from 'Components/FormElements'

export const LocationForm = ({ formRef, handleSubmit, initialData }: { formRef?: any, handleSubmit: (data: any) => void, initialData: any }) => {

    const Schema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        code: Yup.string()
            .min(2, 'Too Short!')
            .max(5, 'Too Long!')
            .required('Required'),
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
            name: 'code',
            label: 'Code',
            type: 'text',
            required: true,
            grid: { largeDevice: 4, mediumDevice: 4 }
        },
        {
            name: 'status',
            label: 'Status',
            type: 'checkBox',
            hideColumn: initialData._id ? false : true,
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