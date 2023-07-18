import { useState } from 'react'
import { contactFields, addressFields } from '../../../public/exports/contactFields'

export default function SendOrderRequestError(props) {

    <div className='SendOrderRequestError'>
        <div className='SendOrderRequestErrorWrapper'>
            {
                props.errorList.map(err => {
                    return (
                        <div className='SendOrderRequestError__container'>
                            <p className='SendOrderRequestError__notice'>{`*${contactFields[err].name ? contactFields[err].name : addressFields[err].name} is required!`}</p>
                        </div>
                    )
                })
            }
        </div>
    </div >

}