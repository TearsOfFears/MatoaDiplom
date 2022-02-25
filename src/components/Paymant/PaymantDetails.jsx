import React from 'react'
import './style.scss'

import {FormInput} from "../index"
function PaymantDetails() {
    const handleFormSubmit= async (evt) =>{
        evt.preventDefault();

    }
  return (
    <div className='paymantDetails'>
        <form onSubmit={handleFormSubmit}>
        <h2>shipping address</h2>
                <div className='group'>
                    <FormInput type="text" placeholder = "Name"/>
                    <FormInput type="text" placeholder = "Line 1"/>
                    <FormInput type="text" placeholder = "Line 2"/>
                    <FormInput type="text" placeholder = "City"/>
                    <FormInput type="text" placeholder = "State"/>
                    <FormInput type="text" placeholder = "PostalCode"/>
                </div>
                <div className='group'>
                    <h2>Billing</h2>
                    <FormInput type="text" placeholder = "Name on card"/>
                    <FormInput type="text" placeholder = "Line 1"/>
                    <FormInput type="text" placeholder = "Line 2"/>
                    <FormInput type="text" placeholder = "City"/>
                    <FormInput type="text" placeholder = "State"/>
                    <FormInput type="text" placeholder = "PostalCode"/>
                </div>
                <div className='group'>
                    <h2>Cart Details</h2>
                </div>
        </form>
        </div>
  )
}

export default PaymantDetails