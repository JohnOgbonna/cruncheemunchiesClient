import { useState, useContext } from 'react'
import { Order } from '../../App'
import './sendRequest.scss'
import SendStandardOrderRequest from './send_request_sections/sendStandardOrderRequest'
import React from 'react'



function SendRequestPage() {
    const [order, setOrder] = useContext(Order)


    const [selection, setSelection] = useState(
        localStorage.getItem('sendRequestType') ?
            JSON.parse(localStorage.getItem('sendRequestType')) :
            'standardOrder'
    )
    const sections = [
        {
            name: 'standardOrder',
            description: 'Standard Packaged Order',
            link: 'send-order-request/standard',
            info: 'Complete order request for Crunchee Munchies standard packaged order'
        },
        {
            name: 'customOrder',
            description: 'Event / Custom Packaged Order',
            link: 'send-order-request/event',
            info: 'Complete order request for Crunchee Munchies event packaged order'
        }
    ]


    return (
        <div className='SendRequest'>
            <section className='SendRequestHeader'>
                <h2 className='SendRequestHeader__header'>Send Order Request</h2>
            </section>
            <section className='SendRequestSelector'>
                {
                    sections.map(section => {
                        return (
                            <div className='SendRequestSelector__text'
                                onClick={() => setSelection(section.name)}
                            >
                                <h3 className='SendRequestSelector__name'>{section.description}</h3>
                                <p className='SendRequestSelector__info'>{section.info}</p>
                            </div>
                        )

                    })
                }
            </section>
            <section className='SendRequestForm'>
                {
                    selection !== 'customEvent' ? <SendStandardOrderRequest
                        section={{
                            name: 'customOrder',
                            title: 'Event / Party Order'

                        }}

                    /> : null
                }
            </section>
        </div>)

}
export default SendRequestPage