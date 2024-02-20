import React from 'react';
import { useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material/styles';

import LogoutIcon from '@mui/icons-material/Logout';
import { Box, SwipeableDrawer, Typography, Grid } from '@mui/material';

import { AnimateButton } from 'Components/Extend/AnimateButton';
import { FormButtonField } from 'Components/FormElements';
import { gridSpacing } from 'Services/Store/GridConstant';

export const Logout = () => {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event && event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
            return;
        }
        setOpen(open);
    };

    const onLogOut = () => {
        localStorage.clear();
        navigate('/login');
    }

    return (
        <>
            <FormButtonField label='Log Out' variant='text' onClick={toggleDrawer(true)} fullWidth={false}
                sx={{ color: theme.palette.secondary.light,  }}>
                <LogoutIcon />
            </FormButtonField>

            <SwipeableDrawer
                anchor='top'
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                <Grid container
                    sx={{ width: 'auto', alignItems: 'center', m: 1.3 }}
                    role="presentation"
                    onKeyDown={toggleDrawer(false)}
                    spacing={gridSpacing}
                >
                    <Grid item lg={8} md={8} xs={12} sm={12}>
                        <Typography variant="h4" sx={{ fontWeight: 500, textAlign: 'center' }}>
                            Are you sure, Do you want to logout ?
                        </Typography>
                    </Grid>
                    <Grid item lg={4} md={4} xs={12} sm={12}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <AnimateButton type="slide" direction='right'>
                                <FormButtonField variant='text' color='secondary' onClick={onLogOut} fullWidth={false}>
                                    Yes
                                </FormButtonField>
                            </AnimateButton>

                            <AnimateButton type="slide" direction='right'>
                                <FormButtonField variant='text' color='info' onClick={toggleDrawer(false)} fullWidth={false}>
                                    No
                                </FormButtonField>
                            </AnimateButton>
                        </Box>
                    </Grid>
                </Grid>
            </SwipeableDrawer >

        </>
    )
}