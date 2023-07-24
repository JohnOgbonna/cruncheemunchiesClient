import { useState } from 'react'
import { contactFields, addressFields } from '../../../public/exports/contactFields'

function SendOrderRequestError(props) {

    function errorField(field){
        if(contactFields[field] && contactFields[field].name)
        return contactFields[field].name
        else if(addressFields[field] && addressFields[field].name)
        return addressFields[field].name
        else return ''
    }


    return (
        <div className='SendOrderRequestError'>
            <div className='SendOrderRequestErrorWrapper'>
                {
                    props.list.map(err => {
                        return (
                            <p className='SendOrderRequestError__notice'>{`*${errorField(err)} is required!`}</p>
                        )
                    })
                }
            </div>
        </div >
    )
}

export default SendOrderRequestError