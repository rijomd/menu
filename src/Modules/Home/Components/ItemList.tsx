import { useState, useEffect } from 'react';
import { Box, Typography, Grid } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";

import { api_Image } from 'Services/Config/ApiConstants';
import { gridSpacing } from 'Services/Store/GridConstant';
import { useNotify } from 'Services/Hook/useNotify';

import { FormButtonField } from 'Components/FormElements/FormButtonField';
import image from 'Assets/Images/noproductfound.png';

import { ItemSkeleton } from '../Components/ItemSkeleton';
import { PlaceOrder } from '../Components/PlaceOrder';

import { useInsertOrderMutation } from '../Reducer/RTK';
import { encryptUser } from 'Services/Methods/AuthMethods';

type Props = {
    items: any[];
    getAllItem: () => void;
    isLoading: boolean;
    settingsList: any[]
}

export const ItemList = ({ items, getAllItem, isLoading, settingsList }: Props) => {
    const theme = useTheme();
    const [cartData, setCartData] = useState<any>([]);
    const [orderDisabled, setOrderDisabled] = useState(false);

    const [postData, { data }] = useInsertOrderMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (data) {
            setOrderDisabled(false);
            useNotify("Ordered successfully", 'success');
            navigate('/myOrders');
        }
        return () => { }
    }, [data])


    const placeOrder = (item: any) => {
        const exist = cartData.find((x: any) => x._id === item._id);
        if (exist) {
            useNotify('Item already exist', 'info');
        }
        else if (item.status === "InActive") {
            useNotify('Item not available', 'info');
        }
        else if (item.quantity === 0) {
            useNotify('Item not available', 'info');
        }
        else {
            const data = [...cartData];
            const newItem = {
                ...item,
                totalPrize: Math.round(item.sellingPrice - ((item.sellingPrice * item.offer) / 100)),
                originalPrize: Math.round(item.sellingPrice - ((item.sellingPrice * item.offer) / 100)),
                count: 1
            }
            data.push(newItem);
            setCartData(data);
        }
    }

    const removeItem = (data: any) => {
        const newArray = cartData.filter((item: any) => item._id !== data._id);
        setCartData(newArray);
    }

    const count = (data: any, name: string) => {
        if (name === "decrement") {
            const newArray = cartData.map((item: any) => item._id === data._id ?
                { ...item, count: item.count - 1, totalPrize: data.originalPrize * (data.count - 1) } : item);
            setCartData(newArray);
        }
        else {
            const newArray = cartData.map((item: any) => item._id === data._id ?
                { ...item, count: item.count + 1, totalPrize: data.originalPrize * (data.count + 1) } : item);
            setCartData(newArray);
        }
    }

    const order = async () => {
        try {
            const totalAmount = cartData.reduce((acc: any, item: any) => {
                return acc = acc + item.totalPrize || 0
            }, 0);
            const totalCount = cartData.reduce((acc: any, item: any) => {
                return acc = acc + item.count || 0
            }, 0);
            const categoryCount = new Set(cartData.map((item: any) => item?.count)).size;

            const orderData = {
                totalAmount: totalAmount,
                totalItems: totalCount,
                itemList: cartData
            }
            const encryptedCredentials = encryptUser(orderData);

            if (settingsList?.length > 0) {
                if (settingsList[0]?.amountLimit < totalAmount) {
                    useNotify(`Exceeded amount limit ${settingsList[0].amountLimit}`, 'info');
                }
                else if (settingsList[0]?.countLimit < totalCount) {
                    useNotify(`Exceeded count limit ${settingsList[0].countLimit}`, 'info');
                }
                else if (!settingsList[0]?.multipleCategorySelection && categoryCount > 1) {
                    useNotify(`Exceeded category limit , only select items from one category`, 'info');
                }
                else {
                    setOrderDisabled(true)
                    await postData({ encryptedCredentials }).unwrap();
                }
            }
            else {
                setOrderDisabled(true)
                await postData({ encryptedCredentials }).unwrap();
            }
        } catch (error: any) {
            useNotify(error?.data?.message, 'error');
            setOrderDisabled(false);
        }
    }

    return (
        <>
            {cartData?.length > 0 && <PlaceOrder
                cartData={cartData}
                removeItem={removeItem}
                count={count}
                order={order}
                orderDisabled={orderDisabled}
            />}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: '1rem 0rem' }}>
                <Typography variant='h3' sx={{ fontFamily: 'Basis_Grotesque_Pro', margin: 0 }}>Food delivery items</Typography>
                <FormButtonField fullWidth={false} sx={{
                    textTransform: 'capitalize',
                    background: theme.palette.secondary.light,
                    color: theme.palette.secondary.dark,
                    marginLeft: '4px',
                    '&:hover': {
                        color: theme.palette.background.default,
                        background: theme.palette.secondary.dark,
                    }
                }} variant="text" onClick={getAllItem}>View All</FormButtonField>
            </Box>

            {isLoading ? <ItemSkeleton /> : <Grid container spacing={gridSpacing}>
                {items?.length > 0 ? items.map((item: any, key: number) => {
                    return <Grid item md={3} lg={3} sm={12} xs={12} key={key}>
                        <Box className='item-box'>
                            <img src={api_Image + item.image} className='truncated-image' />
                            <Box sx={{ padding: '4px' }}>
                                <Typography variant='subtitle1' className='truncated-link'>{item.name}</Typography>
                                <Typography variant='body1' >Items  {item.quantity}</Typography>
                                <Box sx={{ display: 'flex' }}>
                                    <Typography variant='h4' >₹{Math.round(item.sellingPrice - ((item.sellingPrice * item.offer) / 100))}</Typography>
                                    <Typography variant='body1' sx={{ textDecoration: 'line-through', margin: '0px 8px' }}>₹{item.sellingPrice}</Typography>
                                    <Typography variant='body1' color='#5e35b1'>{item.offer}% off</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                                    <FormButtonField sx={{
                                        textTransform: 'capitalize',
                                        background: theme.palette.secondary.light,
                                        color: theme.palette.secondary.dark,
                                        marginLeft: '4px',
                                        '&:hover': {
                                            color: theme.palette.background.default,
                                            background: theme.palette.secondary.dark,
                                        }
                                    }} fullWidth={false} variant="text" onClick={() => placeOrder(item)}>Buy</FormButtonField>
                                </Box>
                            </Box >
                        </Box>
                    </Grid>
                }) :
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <img style={{ height: '150px' }} src={image} alt="Oops Something Wrong" />
                    </Box>}
            </Grid>}

        </>
    )
}


