import nationalParks from "../assets/img/nationalParks.jpeg"
import beachfront from "../assets/img/beachfront.jpeg"
import cabins from "../assets/img/cabins.jpeg"
import design from "../assets/img/design.jpeg"
import farms from "../assets/img/farms.jpeg"
import mansions from "../assets/img/mansions.jpeg"
import amazingViews from "../assets/img/amazingViews.jpeg"
import React, { Component } from "react";
import Slider from "react-slick";

export function StayLabels() {
    const labels = [
        {
            title: 'National parks',
            url: beachfront
        },
        {
            title: 'Beachfront',
            url: nationalParks
        },
        {
            title: 'Cabins',
            url: cabins
        },
        {
            title: 'Design',
            url: design
        },
        {
            title: 'Farms',
            url: farms
        },
        {
            title: 'Mansions',
            url: mansions
        },
        {
            title: 'Amazing views',
            url: amazingViews
        }
    ]
    const settings = {
        className: "slider variable-width",
        dots: false,
        infinite: false,
        centerMode: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true
      };

    return (
        <div className="labels">
        {/* <Slider {...settings}> */}
        {labels.map(label => 
                <div key={label.title} className="label-container">
                    <img className="label-img w24" src={label.url} />
                    <span className="label-title">{label.title}</span>
                </div>
            )}
        {/* </Slider> */}
      </div>
    )
}