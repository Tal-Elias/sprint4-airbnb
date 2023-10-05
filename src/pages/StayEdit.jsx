import React from 'react';
import ReactDOM from 'react-dom';
import { Formik, Field, Form } from 'formik';
import { addStay } from '../store/actions/stay.actions.js'
import { useEffect, useState } from "react"
import { stayService } from '../services/stay.service.local.js';

export function StayEdit() {

    const [newStay, setNewStay] = useState(stayService.getEmptyStay())

    function handleChange({ target }) {
        const {name, value} = target
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
            setNewStay(prevState => ({ ...prevState, [name]:value }))
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
            <input type="text" name= "address" placeholder='adress' onChange={handleChange} />
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
            <select name="labels" multiple={true} onChange={handleChange} >
                <option value="national-parks">National-parks</option>
                <option value="campers">Campers</option>
                <option value="surfing">Surfing</option>
                <option value="amazing-views">Amazing-views</option>
                <option value="beach">Beach</option>
                <option value="castles">Castles</option>
                <option value="islands">Islands</option>
                <option value="caves">Caves</option>
                <option value="omg">omg</option>
                <option value="lakefront">Lakefront</option>
                <option value="beachfront">Beachfront</option>
                <option value="design">Design</option>
                <option value="cabin">Cabin</option>
            </select>
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
            <select name="amenities" multiple={true} onChange={handleChange}>
                <option value="heating">Heating</option>
                <option value="bath-essentials">Bath essentials</option>
                <option value="kitchen">Kitchen</option>
                <option value="coocking-basics">Coocking basics</option>
                <option value="bed-linens">Bed linens</option>
                <option value="hot-water">Hot water</option>
                <option value="dishes">Dishes and silverware</option>
                <option value="tv">TV</option>
                <option value="wifi">Wifi</option>
                <option value="doorman">Doorman</option>
            </select>
            </div>
            <div>
            <h3>Description</h3>
            <textarea name="summary" placeholder="Description" onChange={handleChange} />
            </div>
            <button type="submit" >Submit</button>
        </form>
    )

    // return (
    //     <form action="">
    //         <h3>Name</h3>
    //         <input type="text" placeholder='Name'/>
    //         <h3>Adress</h3>
    //         <input type="text" placeholder='City'/>
    //         <input type="text" placeholder='Country'/>
    //         <input type="text" placeholder='Street'/>
    //         <h3>Upload photos</h3>
    //         <input type="file" />
    //     </form>
    // )

    // const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

    //     return (
    //         <div>
    //             <Formik
    //                 initialValues={{
    //                     name: '',
    //                     city: '',
    //                     country: '',
    //                     street: '',
    //                     // imgs: ["https://res.cloudinary.com/dmhaze3tc/image/upload/v1696403545/Spacious%20SeaView%20villa/2_mwreys.webp", "https://res.cloudinary.com/dmhaze3tc/image/upload/v1696403545/Spacious%20SeaView%20villa/1_gkubpt.webp", "https://res.cloudinary.com/dmhaze3tc/image/upload/v1696403545/Spacious%20SeaView%20villa/3_ro5oet.webp", "https://res.cloudinary.com/dmhaze3tc/image/upload/v1696403545/Spacious%20SeaView%20villa/4_rhxf0x.webp", "https://res.cloudinary.com/dmhaze3tc/image/upload/v1696403546/Spacious%20SeaView%20villa/5_ku4axy.webp"],
    //                     capacity: 0,
    //                     bedrooms: 0,
    //                     bathrooms: 0,
    //                     labels: [],
    //                     type: '',
    //                     price: 0,
    //                     amenities: [],
    //                     summary: ''
    //                 }}

    //                 // onSubmit={async (values) => {
    //                 //     await {
    //                 //         values.imgs= ["https://res.cloudinary.com/dmhaze3tc/image/upload/v1696403545/Spacious%20SeaView%20villa/2_mwreys.webp", "https://res.cloudinary.com/dmhaze3tc/image/upload/v1696403545/Spacious%20SeaView%20villa/1_gkubpt.webp", "https://res.cloudinary.com/dmhaze3tc/image/upload/v1696403545/Spacious%20SeaView%20villa/3_ro5oet.webp", "https://res.cloudinary.com/dmhaze3tc/image/upload/v1696403545/Spacious%20SeaView%20villa/4_rhxf0x.webp", "https://res.cloudinary.com/dmhaze3tc/image/upload/v1696403546/Spacious%20SeaView%20villa/5_ku4axy.webp"]

    //                 //     }
    //                 // }}
    //             >
    //                 {({ isSubmitting }) => (
    //                     <Form>
    //                         <h3>Name</h3>
    //                         <Field name="name" placeholder="Name" />
    //                         <h3>Adress</h3>
    //                         <Field name="city" placeholder="City" />
    //                         <Field name="country" placeholder="Country" />
    //                         <Field name="street" placeholder="Street" />
    //                         {/* <h3>Upload photos</h3>
    //                         <Field name="imgs" type="file" /> */}
    //                         <h3>Capacity</h3>
    //                         <Field name="capacity" type="number" placeholder="Capacity" />
    //                         <h3>Bedrooms</h3>
    //                         <Field name="bedrooms" type="number" placeholder="Bedrooms" />
    //                         <h3>Bathrooms</h3>
    //                         <Field name="bathrooms" type="number" placeholder="Bathrooms" />
    //                         <h3>Labels</h3>
    //                         <Field as="select" name="labels" multiple={true} >
    //                             <option value="national-parks">National-parks</option>
    //                             <option value="campers">Campers</option>
    //                             <option value="surfing">Surfing</option>
    //                             <option value="amazing-views">Amazing-views</option>
    //                             <option value="beach">Beach</option>
    //                             <option value="castles">Castles</option>
    //                             <option value="islands">Islands</option>
    //                             <option value="caves">Caves</option>
    //                             <option value="omg">omg</option>
    //                             <option value="lakefront">Lakefront</option>
    //                             <option value="beachfront">Beachfront</option>
    //                             <option value="design">Design</option>
    //                             <option value="cabin">Cabin</option>
    //                         </Field>
    //                         <h3>Property type</h3>
    //                         <Field as="select" name="type">
    //                             <option value="private-room">Private room</option>
    //                             <option value="apt">Entire home/apt</option>
    //                         </Field>
    //                         <h3>Price</h3>
    //                         <Field name="price" type="number" placeholder="price" />
    //                         <h3>Amenities</h3>
    //                         <Field as="select" name="amenities" multiple={true} >
    //                             <option value="heating">Heating</option>
    //                             <option value="bath-essentials">Bath essentials</option>
    //                             <option value="kitchen">Kitchen</option>
    //                             <option value="coocking-basics">Coocking basics</option>
    //                             <option value="bed-linens">Bed linens</option>
    //                             <option value="hot-water">Hot water</option>
    //                             <option value="dishes">Dishes and silverware</option>
    //                             <option value="tv">TV</option>
    //                             <option value="wifi">Wifi</option>
    //                             <option value="doorman">Doorman</option>
    //                         </Field>
    //                         <h3>Description</h3>
    //                         <Field as="textarea" name="summary" placeholder="Description" />
    //                         {/* <button type="submit" disabled={isSubmitting}> */}
    //                         <button type="submit" onClick={onSubmit}>
    //                             Submit
    //                         </button>
    //                     </Form>
    //                 )}
    //             </Formik>
    //         </div>
    //     )

    // 
}