import React from 'react';
import { Box, Tooltip } from '@mui/material';

import { getStatusColor } from 'Utils/TableUtils';

export const Status = React.memo(({ value, }: { value: string, isChangeStatus?: boolean }) => {
    return (
        <>
            <Tooltip title={value}>
                <Box
                    component="span"
                    sx={() => ({
                        backgroundColor: getStatusColor(value),
                        borderRadius: '0.25rem',
                        color: '#fff',
                        p: '3px 10px',
                        display: 'flex',
                        cursor: 'pointer',
                        minWidth: '50px',
                        justifyContent: 'center',
                        alignItems: 'center'
                    })}
                >
                    {value}
                </Box>
            </Tooltip>
        </>
    )
});