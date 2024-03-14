import React from 'react';
import { Box, Typography } from "@mui/material";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { FormButtonField } from 'Components/FormElements/FormButtonField';

import { useAppDispatch, useAppSelector } from "Services/Hook/Hook";
import { api_Image } from 'Services/Config/ApiConstants';

import { getHomeAction, getCategoryListAction } from "../Reducer/HomeAction";
import '../Style/style.css';

type Props = {}

export const CategoryList = React.memo((props: Props) => {
    const dispatch = useAppDispatch();
    const homeState = useAppSelector(getHomeAction);
    const swiperRef: React.MutableRefObject<any> = React.useRef(null);

    React.useEffect(() => {
        dispatch(getCategoryListAction({}));
        return () => { }
    }, [])

    const goToPrevSlide = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slidePrev();
        }
    };

    const goToNextSlide = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideNext();
        }
    };

    const CustomArrow = ({ direction, onClick }: { direction: string, onClick: any }) => {
        return (
            <FormButtonField onClick={onClick} className={`swiper-custom-arrow`} fullWidth={false}>
                {direction === 'prev' ? '<' : '>'}
            </FormButtonField>
        );
    };


    return (
        <>
            <Typography variant='h3' sx={{ fontFamily: 'Basis_Grotesque_Pro' }}>What's on your mind?</Typography>
            <Swiper
                slidesPerView={6}
                centeredSlides={false}
                ref={swiperRef}
                modules={[Pagination, Navigation]}
                className="mySwiper"
                navigation={{
                    prevEl: '.swiper-button-prev',
                    nextEl: '.swiper-button-next'
                }}
            >
                {homeState?.CategoryList?.length > 0 && homeState.CategoryList.map((item: any, key: number) => {
                    return <SwiperSlide key={key}>
                        <Box>
                            <img src={api_Image + item.image} className="slide-image"/>
                            <Typography variant='subtitle1'>{item.name}</Typography>
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
        </>
    )
});