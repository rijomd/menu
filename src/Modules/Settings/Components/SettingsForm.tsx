import React from 'react';
import * as Yup from 'yup';
import { Box, Grid } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';

import { GeneralForm, TypeFormValues, FormButtonField } from 'Components/FormElements'

export const SettingsForm = ({ handleSubmit, initialData, }: { handleSubmit: (data: any) => void, initialData: any, }) => {

    const formRef: React.MutableRefObject<any> = React.useRef(null);

    const Schema = Yup.object().shape({
        location: Yup.string()
            .required('Required'),
        amountLimit: Yup.number()
            .required('Required')
            .max(5000, 'Amount limit at most Rs:-5000 possible'),
        countLimit: Yup.number()
            .required('Required')
            .max(20, 'Order item counts at most 20 possible'),
        orderLimit: Yup.number()
            .required('Required')
            .max(10, 'Order per day at most 10 is possible'),
    });

    const formValues: TypeFormValues[] = [
        {
            name: 'amountLimit',
            label: 'Amount Limit',
            type: 'number',
            required: true,
            grid: { largeDevice: 6, mediumDevice: 6 }
        },
        {
            name: 'countLimit',
            label: 'Count Limit',
            type: 'number',
            required: true,
            grid: { largeDevice: 6, mediumDevice: 6 }
        },
        {
            name: 'orderLimit',
            label: 'Order Limit per day',
            type: 'number',
            required: true,
            grid: { largeDevice: 6, mediumDevice: 6 }
        },
        {
            name: 'multipleCategorySelection',
            label: 'Is Multiple Category for Order',
            type: 'checkBox',
            grid: { largeDevice: 6, mediumDevice: 6 }
        }
    ];


    return (
        <Box sx={{ margin: '8px 6px' }}>
            <Grid container >
                <Grid item md={6} lg={6}>
                    <GeneralForm
                        handleSubmit={handleSubmit}
                        initialValues={initialData}
                        validationSchema={Schema}
                        formValues={formValues}
                        ref={formRef}
                        formActionComponents={
                            <FormButtonField onClick={() => formRef.current.handleSubmit()} label='Save' fullWidth={false}><SaveIcon /></FormButtonField>
                        }
                    />
                </Grid>
            </Grid>


        </Box>
    )

}