import React from 'react';
import * as Yup from 'yup';
import { Box, Grid } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';

import { GeneralForm, TypeFormValues, FormButtonField } from 'Components/FormElements'

export const CategoryForm = ({ initialData, handleSubmit }: { initialData: any, handleSubmit: (data: any) => void }) => {

    const formRef: React.MutableRefObject<any> = React.useRef(null);
    const Schema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        image: Yup.mixed().required('Image is required').test(
            'fileSize',
            'File too large',
            (value: any) => value && value.size <= 1 * 1024 * 1024
        ),
    });

    const formValues: TypeFormValues[] = [
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            required: true,
            grid: { largeDevice: 3, mediumDevice: 3 }
        },
        {
            name: 'image',
            type: 'file',
            label: 'Upload Image',
            required: true,
            fileProps: { accept: 'image/*' },
            grid: { largeDevice: 3, mediumDevice: 3 }
        },
        {
            name: 'status',
            label: 'Status',
            type: 'checkBox',
            hideColumn: initialData._id ? false : true,
            grid: { largeDevice: 3, mediumDevice: 3 }
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
                actionGrid={{ largeDevice: 3, mediumDevice: 3 }}
                formActionComponents={
                    <Grid item md={3} lg={3}>
                        <FormButtonField onClick={() => formRef.current.handleSubmit()} label='Save'><SaveIcon /></FormButtonField>
                    </Grid>
                }
            />
        </Box>
    )

}