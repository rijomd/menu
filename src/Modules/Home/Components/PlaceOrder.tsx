import React from 'react';
import { Box, Typography, Grid } from "@mui/material";
import { styled, useTheme } from '@mui/material/styles';
import AdjustIcon from '@mui/icons-material/Adjust';
import DeleteIcon from '@mui/icons-material/Delete';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { FormButtonField } from 'Components/FormElements/FormButtonField';
import { formatNumber } from 'Utils/FormUtils';

type Props = {
    cartData: any[];
    removeItem: (data: any) => void;
    count: (data: any, name: string) => void;
    order: () => void;
}

export const PlaceOrder = ({ cartData, removeItem, count, order }: Props) => {
    const theme = useTheme();
    const sliderRef: React.MutableRefObject<any> = React.useRef(null);
    const [isSticky, setIsSticky] = React.useState(false);

    const PageWrapper = styled('div')(() => ({
        position: 'sticky',
        top: 0,
        width: ' 100%',
        background: '#fff',
        zIndex: 1,
        boxShadow: isSticky ? '0 15px 35px -10px #ccc' : 'none',
        padding: '1rem'
    }));

    const goToPrevSlide = () => {
        if (sliderRef.current && sliderRef.current.swiper) {
            sliderRef.current.swiper.slidePrev();
        }
    };

    const goToNextSlide = () => {
        if (sliderRef.current && sliderRef.current.swiper) {
            sliderRef.current.swiper.slideNext();
        }
    };

    const CustomArrow = ({ direction, onClick }: { direction: string, onClick: any }) => {
        return (
            <FormButtonField onClick={onClick} className={`swiper-custom-arrow`} fullWidth={false}>
                {direction === 'prev' ? '<' : '>'}
            </FormButtonField>
        );
    };

    const handleScroll = () => {
        const container: any = document.querySelector('.scroll-y');
        if (container) {
            const offset = container.scrollTop;
            if (offset > 100) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        }
    };

    React.useEffect(() => {
        const container: any = document.querySelector('.scroll-y');
        container.addEventListener('scroll', handleScroll);
        return () => {
            container.removeEventListener('scroll', handleScroll);
        }
    }, [handleScroll]);

    return (
        <PageWrapper>
            <Typography variant='h4' >Order Details</Typography>
            <Swiper
                slidesPerView={6}
                centeredSlides={false}
                ref={sliderRef}
                modules={[Pagination, Navigation]}
                className="mySwiper"
                navigation={{
                    prevEl: '.swiper-button-prev',
                    nextEl: '.swiper-button-next'
                }}
            >
                {cartData?.length > 0 && cartData.map((item: any, key: number) => {
                    return <SwiperSlide key={key} >
                        <Box className='place-order-box'>
                            <Box sx={{ display: 'flex', paddingBottom: '8px' }}>
                                <AdjustIcon color='secondary' sx={{ width: '15px' }} />
                                <Typography variant='subtitle1' className='place-order-text'>{item.name}</Typography>
                                <DeleteIcon color='error' onClick={() => removeItem(item)} sx={{ width: '15px' }} />
                            </Box>
                            <Grid container sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Grid className='place-order-add' item md={8} lg={8} sm={8} xs={8}>
                                    <Typography variant='subtitle1' color={theme.palette.secondary.dark} onClick={() => {
                                        item.count > 1 ? count(item, 'decrement') : ''
                                    }}> - </Typography>
                                    <Typography variant='subtitle1'>{item.count || 0}</Typography>
                                    <Typography variant='subtitle1' color={theme.palette.secondary.dark} onClick={() => count(item, 'increment')}> + </Typography>
                                </Grid>
                                <Grid item md={4} lg={4} sm={4} xs={4}>
                                    <Typography variant='subtitle1'>₹{item.totalPrize}</Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </SwiperSlide>
                })}
                <Box className="swiper-button-prev">
                    <CustomArrow direction="prev" onClick={goToPrevSlide} />
                </Box>
                <Box className="swiper-button-next">
                    <CustomArrow direction="next" onClick={goToNextSlide} />
                </Box>
            </Swiper>
            {cartData?.length > 0 && <table style={{ textAlign: 'justify', marginTop: '8px' }}>
                <thead>
                    <tr>
                        <td>Total Items</td>
                        <th style={{ color: theme.palette.secondary.dark }}> {cartData.reduce((acc, item) => {
                            return acc = acc + item.count || 0
                        }, 0)}</th>
                    </tr>
                    <tr>
                        <td>Total Amount</td>
                        <th style={{ color: theme.palette.secondary.dark }}> ₹{formatNumber(cartData.reduce((acc, item) => {
                            return acc = acc + item.totalPrize || 0
                        }, 0))}</th>
                    </tr>
                    <tr>
                        <td><FormButtonField onClick={order}>Order</FormButtonField></td>
                    </tr>
                </thead>
            </table>}

        </PageWrapper>
    )
}