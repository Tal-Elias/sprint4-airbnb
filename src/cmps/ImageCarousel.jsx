import React, { Component } from "react";
import Slider from "react-slick";

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", marginInlineEnd: '30px' }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "inline", zIndex: 10,  marginInlineStart: '30px' }}
            onClick={onClick}
        />
    );
}

export function ImageCarousel({ imgs }) {
    // render() {
    const settings = {
        dots: true,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        appendDots: dots => (
            <div
                style={{
                    // backgroundColor: "#ddd",
                    borderRadius: "10px",
                    padding: "10px",
                }}
            >
                <ul style={{ marginBlockEnd: "20px", color: "white" }}> {dots} </ul>
            </div>
        )
    };
    return (
        <div className="container">
            <Slider {...settings}>
                {imgs.map((item, idx) => (
                    <div key={idx}>
                        <img className="stay-img" src={item} alt={item} />
                    </div>
                ))}
            </Slider>
        </div>
    );
    // }
}