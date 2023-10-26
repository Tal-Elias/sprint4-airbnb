import nationalParks from "../assets/img/nationalParks.jpeg"
import beachfront from "../assets/img/beachfront.jpeg"
import cabins from "../assets/img/cabins.jpeg"
import design from "../assets/img/design.jpeg"
import farms from "../assets/img/farms.jpeg"
import mansions from "../assets/img/mansions.jpeg"
import amazingViews from "../assets/img/amazingViews.jpeg"
import tropical from "../assets/img/tropical.jpeg"
import vineyards from "../assets/img/vineyards.jpeg"
import lake from "../assets/img/lake.jpeg"
import treehouses from "../assets/img/treehouses.jpeg"
import omg from "../assets/img/omg.jpeg"
import countryside from "../assets/img/countryside.jpeg"
import amazingPools from "../assets/img/amazingPools.jpeg"
import castles from "../assets/img/castles.jpeg"
import rooms from "../assets/img/rooms.jpeg"
import islands from "../assets/img/islands.jpeg"
import aFrames from "../assets/img/aFrames.jpeg"
import iconicCities from "../assets/img/iconicCities.jpeg"
import lakeFront from "../assets/img/lakeFront.jpeg"
import offTheGrid from "../assets/img/offTheGrid.jpeg"
import play from "../assets/img/play.jpeg"
import skiing from "../assets/img/skiing.jpeg"

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
// import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';

export function StayLabels() {
    const labels = [
        {
            title: 'National parks',
            url: nationalParks
        },
        {
            title: 'Beachfront',
            url: beachfront
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
        },
        {
            title: 'Tropical',
            url: tropical
        },
        {
            title: 'Vineyards',
            url: vineyards
        },
        {
            title: 'Lake',
            url: lake
        },
        {
            title: 'Treehouses',
            url: treehouses
        },
        {
            title: 'OMG!',
            url: omg
        },
        {
            title: 'Countryside',
            url: countryside
        },
        {
            title: 'Amazing pools',
            url: amazingPools
        },
        {
            title: 'Castles',
            url: castles
        },
        {
            title: 'Rooms',
            url: rooms
        },
        {
            title: 'Islands',
            url: islands
        },
        {
            title: 'A-frames',
            url: aFrames
        },
        {
            title: 'Iconic cities',
            url: iconicCities
        },
        {
            title: 'LakeFront',
            url: lakeFront
        },
        {
            title: 'Off-the-grid',
            url: offTheGrid
        },
        {
            title: 'Play',
            url: play
        },
        {
            title: 'Skiing',
            url: skiing
        }
    ]



    return (
        <div className="stay-labels">
            {/* <div className="button-container next"> */}
            <div className="swiper-button image-swiper-button-next">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" ><path fill="none" d="m12 4 11.3 11.3a1 1 0 0 1 0 1.4L12 28"></path></svg>
            </div>
            {/* </div> */}
            {/* <div className="button-container prev"> */}
            <div className="swiper-button image-swiper-button-prev">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" ><path fill="none" d="M20 28 8.7 16.7a1 1 0 0 1 0-1.4L20 4"></path></svg>
            </div>
            {/* </div> */}

            <Swiper slidesPerView={'auto'}
                spaceBetween={32}
                navigation={{
                    nextEl: ".image-swiper-button-next",
                    prevEl: ".image-swiper-button-prev",
                    disabledClass: "swiper-button-disabled"
                }}
                // navigation={true}
                modules={[Navigation]}
                className="mySwiper">

                {labels.map(label =>
                    <SwiperSlide key={label.title}>
                        <img className="label-img w24" src={label.url} />
                        <span className="label-title">{label.title}</span>
                    </SwiperSlide>
                )}
            </Swiper >
        </div>
    )
}
