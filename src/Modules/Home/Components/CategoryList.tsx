import React from 'react';
import { Box, Typography } from "@mui/material";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

import { FormButtonField } from 'Components/FormElements/FormButtonField';
import { api_Image } from 'Services/Config/ApiConstants';

type Props = {
    getItemByCategory: (id: string) => void;
    categoryList: any[];
}

export const CategoryList = React.memo(({ getItemByCategory, categoryList }: Props) => {
    const sliderRef: React.MutableRefObject<any> = React.useRef(null);

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


    return (
        <>
            <Typography variant='h3' sx={{ fontFamily: 'Basis_Grotesque_Pro' }}>What's on your mind?</Typography>
            <Box sx={{ height: '200px' }}>
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
                    {categoryList?.length > 0 && categoryList.map((item: any, key: number) => {
                        return <SwiperSlide key={key} onClick={() => getItemByCategory(item._id)}>
                            <Box>
                                <img src={api_Image + item.image} className="slide-image" />
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
            </Box>
        </>
    )
});