import React from 'react';
import ReactDOM from 'react-dom';
import { Formik, Field, Form } from 'formik';
import { addStay } from '../store/actions/stay.actions.js'
import { useEffect, useState } from "react"
import { stayService } from '../services/stay.service.local.js';
import { cloudinaryService } from '../services/cloudinary-service.js';
import Multiselect from 'multiselect-react-dropdown';


export function StayEdit() {

    const [newStay, setNewStay] = useState(stayService.getEmptyStay())
    const [images, setImages] = useState([])


    function handleChange({ target }) {
        const { name, value } = target
        if (name === 'country' || name === 'city' || name === 'address') {
            setNewStay(prevState => ({
                ...prevState,
                loc: {
                    ...prevState.loc,
                    [name]: value
                }
            }))
        }
        else {
            setNewStay(prevState => ({ ...prevState, [name]: value }))
        }
    }

    function onRemoveLabel(event) {
        setNewStay(prevState => ({ ...prevState, labels: event }))
    }

    function onSelectLabel(event) {
        setNewStay(prevState => ({ ...prevState, labels: event }))
    }

    function onRemoveAmenity(event) {
        setNewStay(prevState => ({ ...prevState, amenities: event }))
    }

    function onSelectAmenity(event) {
        setNewStay(prevState => ({ ...prevState, amenities: event }))
    }

    async function handleImgSelected(ev) {
        try {
            const url = await cloudinaryService.uploadImg(ev)
            setImages(prevState => [...prevState, url])
            setNewStay(prevState => ({ ...prevState, imgUrls: images }))
        }
        catch (err) {
            console.error(err)
        }
    }

    async function handleSubmit(ev) {
        ev.preventDefault()
        console.log('newStay', newStay)
        await addStay(newStay)
    }

    return (
        <form className='add-stay' onSubmit={handleSubmit}>
            <div>
                <h3>Name</h3>
                <input type="text" name="name" placeholder='Name' onChange={handleChange} />
            </div>
            <div>
                <h3>Adress</h3>
                <input type="text" name="city" placeholder='City' onChange={handleChange} />
                <input type="text" name="country" placeholder='Country' onChange={handleChange} />
                <input type="text" name="address" placeholder='adress' onChange={handleChange} />
            </div>
            <div className='flex column'>
                <h3>Upload photos</h3>
                <input type="file" onChange={handleImgSelected} />
                <div className='imgs-container'>
                    {/* {images.length && */}
                       { images.map((url, idx) => <img key={idx} src={url} />)}
                    {/* } */}
                </div>
            </div>
            <div>
                <h3>Capacity</h3>
                <input name="capacity" type="number" placeholder="Capacity" onChange={handleChange} />
            </div>
            {/* <h3>Bedrooms</h3> */}
            {/* <input name="bedrooms" type="number" placeholder="Bedrooms" /> */}
            {/* <h3>Bathrooms</h3> */}
            {/* <input name="bathrooms" type="number" placeholder="Bathrooms" /> */}
            <div>
                <h3>Labels</h3>
                <Multiselect
                    id='labels'
                    isObject={false}
                    onRemove={onRemoveLabel}
                    onSelect={onSelectLabel}
                    options={['National-parks', 'Campers', 'Surfing', 'Amazing-views']}
                />
            </div>
            <div>
                <h3>Property type</h3>
                <select name="type" onChange={handleChange}>
                    <option value="private-room">Private room</option>
                    <option value="apt">Entire home/apt</option>
                </select>
            </div>
            <div>
                <h3>Price</h3>
                <input name="price" type="number" placeholder="price" onChange={handleChange} />
            </div>
            <div>
                <h3>Amenities</h3>
                <Multiselect
                    id='amenities'
                    isObject={false}
                    onRemove={onRemoveAmenity}
                    onSelect={onSelectAmenity}
                    options={['Heating', 'Bath-essentials', 'Kitchen', 'Cooking basics']}
                />
            </div>
            <div>
                <h3>Description</h3>
                <textarea name="summary" placeholder="Description" onChange={handleChange} />
            </div>
            <button type="submit" >Submit</button>
        </form>
    )
}