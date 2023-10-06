import React, { Component, useRef } from "react";
import Slider from "react-slick";
import {IoIosArrowForward} from 'react-icons/io'
import {IoIosArrowBack} from 'react-icons/io'

// function SampleNextArrow(props) {
//     const { className, style, onClick } = props;
//     console.log(className)
//     return (
//         <div
//             className={className}
//             style={{ ...style, display: "block"}}
//             onClick={onClick}
//         />
//     );
// }

// function SamplePrevArrow(props) {
//     const { className, style, onClick } = props;
//     return (
//         <div
//             className={className}
//             style={{ ...style, display: "inline", zIndex: 10,  }}
//             onClick={onClick}
//         />
//     );
// }

function NextArrow(props){
    const { className, style, onClick } = props;

    return(
        <div className="new-button next" onClick={onClick}><IoIosArrowForward/></div>
    )
}
function PrevArrow(props){
    const { className, style, onClick } = props;

    return(
        <div className="new-button prev" onClick={onClick}><IoIosArrowBack/></div>
    )
}
export function ImageCarousel({ imgs }) {
    const sliderRef = useRef(null);
    // render() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow/>,
        prevArrow: <PrevArrow/>

        // nextArrow: <SampleNextArrow />,
        // prevArrow: <SamplePrevArrow />,
        // appendDots: dots => (
        //     <div
        //         style={{
        //             // backgroundColor: "#ddd",
        //             borderRadius: "10px",
        //             padding: "10px",
        //         }}
        //     >
        //         <ul style={{ marginBlockEnd: "20px", color: "white" }}> {dots} </ul>
        //     </div>
        // )
    };

    const handleNextClick = () => {
        sliderRef.current.slickNext(); // Navigate to the next slide
      };
    
      const handlePrevClick = () => {
        sliderRef.current.slickPrev(); // Navigate to the previous slide
      };
    return (
        <div className="container">
            {/* <button onClick={handlePrevClick} className="new-button prev"><IoIosArrowForward/></button>
            <button onClick={handleNextClick} className="new-button next"></button> */}

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