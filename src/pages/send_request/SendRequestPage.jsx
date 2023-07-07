import { useState, useContext } from 'react'
import { Order } from '../../App'
import './sendRequest.scss'
import SendStandardOrderRequest from './send_request_sections/sendStandardOrderRequest'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const sections = {
    standardOrder: {
        name: 'standardOrder',
        description: 'Standard Packaged Order',
        link: 'send-order-request/standard',
        info: 'Complete order request for Crunchee Munchies standard packaged order',
        title: 'Standard Order',
        link: '/order/standard',
        navigate: '/send-order-request/standard'
    },
    customOrder: {
        name: 'customOrder',
        description: 'Event / Custom Packaged Order',
        link: 'send-order-request/event',
        info: 'Complete order request for Crunchee Munchies event packaged order',
        title: 'Event / Party Order',
        link: '/order/event',
        navigate: '/send-order-request/event'
    }
}

function SendRequestPage() {
    const [order, setOrder] = useContext(Order)
    const navigate = useNavigate()
    const params = useParams()
    const [selection, setSelection] = useState(
        params && params.section !== 'standard' ?
            sections.customOrder :
            sections.standardOrder
        )

    let sectionsList = Object.keys(sections)
    
    return (
        <div className='SendRequest'>
            <section className='SendRequestHeader'>
                <h2 className='SendRequestHeader__header'>Send Order Request</h2>
            </section>
            <section className='SendRequestSelector'>
                {
                    sectionsList.map(section => {
                        let sectionObj = sections[section]
                        return (
                            <div className='SendRequestSelector__text'
                                onClick={() => {
                                    setSelection(sectionObj)
                                    navigate(sectionObj.navigate)
                                }
                                }
                            >
                                <h3 className='SendRequestSelector__name'>{sectionObj.description}</h3>
                                <p className='SendRequestSelector__info'>{sectionObj.info}</p>
                            </div>

                        )

                    })
                }
            </section>
            <section className='SendRequestForm'>

                <SendStandardOrderRequest section={selection} />

            </section>
        </div>)

}
export default SendRequestPage