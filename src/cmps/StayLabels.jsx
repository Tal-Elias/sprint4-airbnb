import 'swiper/css';
import 'swiper/css/navigation';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useEffect, useRef, useState } from "react"
import { stayService } from "../services/stay.service"
// import { stayService } from "../services/stay.service.local"
import useOnScreen from "../customHooks/useOnScreen"

export function StayLabels({ handleChange }) {
    const labelRef = useRef()
    const [activeLable, setActiveLabel] = useState(null)
    const [spaceBetween, setSpaceBetween] = useState(32)
    const topLabelsVisible = useOnScreen(labelRef, '-160px')

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth < 744) {
                setSpaceBetween(16)
            } else {
                setSpaceBetween(32)
            }
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const labels = stayService.getLabels()
    const scrollClass = topLabelsVisible ? '' : 'scrolling'

    function onLabelSelect(label) {
        setActiveLabel(label)
        handleChange({ field: 'label', value: label })
    }

    return (
        <div className={`stay-labels ${scrollClass}`} ref={labelRef}>
            <div className="bg next ">
                <div className="swiper-button image-swiper-button-next">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" ><path fill="none" d="m12 4 11.3 11.3a1 1 0 0 1 0 1.4L12 28"></path></svg>
                </div>
            </div>
            <div className="bg prev">
                <div className="swiper-button image-swiper-button-prev">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" ><path fill="none" d="M20 28 8.7 16.7a1 1 0 0 1 0-1.4L20 4"></path></svg>
                </div>
            </div>
            <Swiper
                slidesPerView={'auto'}
                slidesPerGroupAuto={true}
                // slidesPerGroup={1}
                // slidesPerGroupSkip={17}
                spaceBetween={spaceBetween}
                navigation={{
                    nextEl: ".image-swiper-button-next",
                    prevEl: ".image-swiper-button-prev",
                    disabledClass: "swiper-button-disabled"
                }}
                // navigation={true}
                modules={[Navigation]}
            // className="mySwiper"
            >
                {labels && labels.map(label =>
                    <SwiperSlide className={activeLable === label.title ? 'active' : ''} key={label.title} onClick={() => onLabelSelect(label.title)}>
                        <img className="label-img w24 " src={`./src/assets/img/labels/${label.url}.jpeg`} />
                        <span className="label-title">{label.title}</span>
                    </SwiperSlide>
                )}
            </Swiper >
            <div className={`labels-border ${scrollClass}`}></div>
        </div>
    )
}
