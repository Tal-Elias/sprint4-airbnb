import React from "react";
import Slider from "react-slick";
import { IoIosArrowForward } from 'react-icons/io'
import { IoIosArrowBack } from 'react-icons/io'

function NextArrow(props) {
    const { currentSlide, className, style, onClick } = props;
    // if (currentSlide === 4) {
    // return false;
    // } else {
    return (
        <div className="new-button next" onClick={onClick}><IoIosArrowForward /></div>
    )
    // }
}

function PrevArrow(props) {
    const { currentSlide, className, style, onClick } = props;
    if (currentSlide === 0) {
        return false;
    } else {
        return (
            <div className="new-button prev" onClick={onClick}><IoIosArrowBack /></div>
        )
    }
}

export function ImageCarousel({ imgs }) {
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };

    return (
        <div className="imgs-container">
            <Slider {...settings}>
                {imgs.map((item, idx) => (
                    <div key={idx}>
                        <img className="stay-img" src={item} alt={item} />
                    </div>
                ))}
            </Slider>
        </div>
    );
}