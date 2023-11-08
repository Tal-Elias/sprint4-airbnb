import React from "react";
import Slider from "react-slick";

function NextArrow(props) {
    const { currentSlide, className, style, onClick } = props;
    if (currentSlide === 4) {
        return false;
    } else {
        return (
            <div className="new-button next" onClick={onClick}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '12px', width: '12px', stroke: 'currentcolor', strokeWidth: '4', overflow: 'visible' }}><path fill="none" d="m12 4 11.3 11.3a1 1 0 0 1 0 1.4L12 28"></path></svg>
            </div>
        )
    }
}

function PrevArrow(props) {
    const { currentSlide, className, style, onClick } = props;
    if (currentSlide === 0) {
        return false;
    } else {
        return (
            <div className="new-button prev" onClick={onClick}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '12px', width: '12px', stroke: 'currentcolor', strokeWidth: '4', overflow: 'visible' }}><path fill="none" d="M20 28 8.7 16.7a1 1 0 0 1 0-1.4L20 4"></path></svg>
            </div>
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

                    <img key={idx} className="stay-img" src={item} alt={item} />

                ))}
            </Slider>
        </div>
    );
}