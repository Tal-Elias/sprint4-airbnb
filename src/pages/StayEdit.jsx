import React from 'react';
import ReactDOM from 'react-dom';
// import { Formik, Field, Form } from 'formik';

export function StayEdit() {

    return (
        <form action="">
            <h3>Name</h3>
            <input type="text" placeholder='Name'/>
            <h3>Adress</h3>
            <input type="text" placeholder='City'/>
            <input type="text" placeholder='Country'/>
            <input type="text" placeholder='Street'/>
            <h3>Upload photos</h3>
            {/* <input type="image" /> */}
        </form>
    )

    // const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

    //     return (
    //         <div>
    //             <h1>Sign Up</h1>
    //             <Formik
    //                 initialValues={{
    //                     name: '',
    //                     city: '',
    //                     country: '',
    //                     street: '',
    //                     capacity: '',
    //                     bedrooms: '',
    //                     bathrooms: '',
    //                     price:''
    //                 }}
    //                 onSubmit={async (values) => {
    //                     await sleep(500);
    //                     alert(JSON.stringify(values, null, 2));
    //                 }}
    //             >
    //                 {({ isSubmitting }) => (
    //                     <Form>
    //                         <label htmlFor="name">Name</label>
    //                         <Field name="name" placeholder="Name" />

    //                         <label htmlFor="adress">Adress</label>
    //                         <Field name="adress" placeholder="City" />
    //                         <Field name="adress" placeholder="Country" />
    //                         <Field name="adress" placeholder="Street" />

    //                         <Field name="imgs" type="image" />

    //                         <button type="submit" disabled={isSubmitting}>
    //                             Submit
    //                         </button>
    //                     </Form>
    //                 )}
    //             </Formik>
    //         </div>
    //     )
    
}