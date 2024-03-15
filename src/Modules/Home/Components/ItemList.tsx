import { Box, Typography, Grid } from "@mui/material";
import { useTheme } from '@mui/material/styles';

import { api_Image } from 'Services/Config/ApiConstants';
import { gridSpacing } from 'Services/Store/GridConstant';
import { FormButtonField } from 'Components/FormElements/FormButtonField';

type Props = {
    items: any[];
}

export const ItemList = ({ items }: Props) => {
    const theme = useTheme();

    return (
        <>
            <Typography variant='h3' sx={{ fontFamily: 'Basis_Grotesque_Pro', margin: '1rem 0rem' }}>Food delivery items</Typography>

            <Grid container spacing={gridSpacing}>
                {items?.length > 0 ? items.map((item: any, key: number) => {
                    return <Grid item md={3} lg={3} sm={12} xs={12} key={key}>
                        <Box className='item-box'>
                            <img src={api_Image + item.image} className='truncated-image' />
                            <Box sx={{ padding: '4px' }}>
                                <Typography variant='subtitle1' className='truncated-link'>{item.name}</Typography>
                                <Box sx={{ display: 'flex' }}>
                                    <Typography variant='h4' >₹{Math.round(item.sellingPrice - ((item.sellingPrice * item.offer) / 100))}</Typography>
                                    <Typography variant='body1' sx={{ textDecoration: 'line-through', margin: '0px 8px' }}>₹{item.sellingPrice}</Typography>
                                    <Typography variant='body1' color='#5e35b1'>{item.offer}% off</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', }}>
                                    <FormButtonField sx={{
                                        background: theme.palette.background.default,
                                        color: "black",
                                        marginRight: '4px',
                                        textTransform: 'capitalize',
                                        '&:hover': {
                                            background: theme.palette.background.default,
                                            color: 'black',
                                        }
                                    }} variant="text">Cancel</FormButtonField>
                                    <FormButtonField sx={{
                                        textTransform: 'capitalize',
                                        background: theme.palette.secondary.light,
                                        color: theme.palette.secondary.dark,
                                        marginLeft: '4px',
                                        '&:hover': {
                                            color: theme.palette.background.default,
                                            background: theme.palette.secondary.dark,
                                        }
                                    }} variant="text">Buy</FormButtonField>
                                </Box>
                            </Box >
                        </Box>
                    </Grid>
                }) : <></>}
            </Grid>

        </>
    )
}