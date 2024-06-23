import { useEffect, useMemo, useRef, useState } from "react";
import { styled, Box } from "@mui/system";
import { Grid, Typography } from "@mui/material";
import MapsUgcIcon from '@mui/icons-material/MapsUgc';

import dayjs from "dayjs";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { getOrderHomeListAction, getHomeAction, closeOrderAction } from "../Reducer/HomeAction";
import { useAppDispatch, useAppSelector } from "Services/Hook/Hook";
import { getAuthUser } from "Services/Methods/AuthMethods";
import { setBillData } from "../Reducer/HomeSlice";

import image from 'Assets/Images/nobill.jpg';
import "../Style/style.css"
import { FormButtonField } from "Components/FormElements";

const Wrapper = styled('div')(({ }) => ({
    height: '20vh',
    display: 'flex',
    alignItems: 'center',
    background: '#f4f4f48c',
    border: "3px dotted #ccc",
    justifyContent: 'center',
    width: '30%',
    position: 'relative',
    cursor: 'pointer'
}));

export const GenerateBill = () => {
    const dispatch = useAppDispatch();
    const reportTemplateRef = useRef(null);

    const homeState = useAppSelector(getHomeAction);
    const user = getAuthUser();
    const [bill, setBill] = useState(false);

    const getList = async () => {
        const query = { date: "true" };
        const resp = await getOrderHomeListAction(query);
        dispatch(setBillData(resp))
    }

    useEffect(() => {
        if (homeState?.orderStatus === "billSuccess") {
            setBill(true);
        }
        return () => { setBill(false); }
    }, [homeState?.orderStatus])

    const generateBill = async (isClose: boolean) => {
        const unit = 'pt';
        const size = 'a5';
        const marginLeft = 40;
        const currentDate = dayjs().format('DD-MM-YYYY');

        if (reportTemplateRef.current) {
            html2canvas(reportTemplateRef.current).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('l', unit, size);
                const imgProps = pdf.getImageProperties(imgData);
                const pdfWidth = pdf.internal.pageSize.getWidth() - 2 * marginLeft;
                const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

                pdf.addImage(imgData, 'PNG', marginLeft, 10, pdfWidth, pdfHeight);
                const image = pdf.output('blob');
                pdf.save(`menu_kart-bill-${currentDate}`);

                if (isClose) {
                    dispatch(closeOrderAction({ orderList: homeState?.orderListId, orderDocument: image }));
                }
            });
        }
    }

    const closeBill = async () => {
        await generateBill(true);
    }

    const billList = useMemo(() => {
        return homeState?.billOrderList?.length > 0 ?
            <table ref={reportTemplateRef} style={{ width: '100%' }} >
                <thead>
                    <tr>
                        <th colSpan={3} style={{ background: '#ede7f6', height: '40px', fontSize: '15px', textAlign: 'center' }}>MENU KART</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td colSpan={3} style={{ padding: '0px 6px', textAlign: 'left' }}>{user?.locationName}</td></tr>
                    <tr><td colSpan={3} style={{ padding: '0px 6px', textAlign: 'left' }}>{dayjs().format('DD/MM/YYYY')}</td></tr>
                    {homeState?.billOrderList?.map((listItem: any, listKey: number) => {
                        return <tr key={listKey}>
                            <td colSpan={3} style={{ padding: '0px 6px' }}>
                                <table style={{ width: '100%', paddingTop: '6px' }}>
                                    <thead>
                                        <tr><th colSpan={3} style={{ textAlign: 'left' }}>{listKey + 1}. {listItem?.userName}</th></tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td colSpan={3}>
                                                <table style={{ width: '100%' }}>
                                                    <thead>
                                                        <tr>
                                                            <td style={{ borderBottom: '1px solid #ccc', padding: '5px', textAlign: 'left', width: '40%' }}>Name</td>
                                                            <td style={{ borderBottom: '1px solid #ccc', padding: '5px', textAlign: 'center', width: '30%' }}>Quantity</td>
                                                            <td style={{ borderBottom: '1px solid #ccc', padding: '5px', textAlign: 'right', width: '30%' }}>Amount</td>
                                                        </tr>
                                                    </thead>
                                                    {listItem?.orders?.map((orderItem: any, orderKey: number) => {
                                                        return <tbody key={orderKey}>
                                                            {orderItem?.itemList?.map((item: any, itemKey: number) => {
                                                                return <tr key={itemKey} >
                                                                    <td style={{ textAlign: 'left' }}>{item?.name}</td>
                                                                    <td style={{ paddingLeft: '8px', textAlign: 'center' }}>  {item?.count} x {item?.originalPrize}</td>
                                                                    <td style={{ paddingLeft: '8px', textAlign: 'right' }}>  ₹{item?.totalPrize}</td>
                                                                </tr>
                                                            })}
                                                        </tbody>
                                                    })}
                                                    <tr>
                                                        <th align="right" colSpan={3}>
                                                            ₹{listItem?.orders?.reduce((acc: any, item: any) => { return acc = acc + item.totalAmount || 0 }, 0)}
                                                        </th>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    })}
                    <tr style={{ height: '50px' }}>
                        <th colSpan={2} align="right" style={{ color: '#5e35b1' }}>Total Amount</th>
                        <th align="right" style={{ color: '#5e35b1' }}> ₹{homeState.orderTotalAmount}</th>
                    </tr>
                </tbody>
            </table>
            : <Box className="container">
                <img src={image} alt="Background" className="background-img" />
                <Typography variant="h6" className="zigzag-text">Sorry !...No items are approved !</Typography>
                <button className="expand-button" onClick={() => {
                    setBill(false);
                }}>Refresh</button>
            </Box>
    }, [bill]);

    return (
        <>
            {!bill && <Box sx={{ display: 'flex', justifyContent: 'center', height: '50vh', alignItems: 'center' }}>
                <Wrapper onClick={getList}>
                    <MapsUgcIcon color="secondary"
                        sx={{ position: 'absolute', top: '-25%', right: '-9%', width: '50px', height: '50px' }} />
                    <Typography sx={{ textAlign: 'center', }} variant="h6">Generate your bill</Typography>
                </Wrapper>
            </Box>}
            {bill && <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
                <Grid item md={8} lg={8} sm={12} xs={12}>
                    {billList}
                    {homeState?.billOrderList?.length > 0 && <Box sx={{ display: 'flex', alignItems: 'center', }}>
                        <Box sx={{ marginRight: '8px' }}>
                            <FormButtonField fullWidth={false} onClick={() => generateBill(false)}>
                                <Typography variant="body1">Generate Your Bill </Typography>
                            </FormButtonField>
                        </Box>
                        <FormButtonField fullWidth={false} onClick={closeBill}>
                            <Typography variant="body1">Close your Bills</Typography>
                        </FormButtonField>
                    </Box>}
                </Grid>
            </Grid>}
        </>
    )
}



