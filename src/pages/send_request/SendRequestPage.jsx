import { useState, useContext } from 'react'
import { Order } from '../../App'
import './sendRequest.scss'
import SendStandardOrderRequest from './send_request_sections/sendStandardOrderRequest'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { contactFields, addressFields } from '../../public/exports/contactFields'
import axios from 'axios'
import { constants } from '../../public/exports/constants'
import SendOrderRequestError from './send_request_sections/sendOrderRequestError'

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
    const [errors, setErrors] = useState([])

    useEffect(() => {
        if (params.section === 'event') setSelection(sections.customOrder)
        else setSelection(sections.standardOrder)
    }, [params])

    let sectionsList = Object.keys(sections)

    function validateFields(body, addresses) {
        let errorList = []
        Object.keys(contactFields).forEach(field => {
            if (contactFields[field].mandatory && (!body[field] || body[field] === '')) {
                errorList.push(field)
            }
        })
        Object.keys(addressFields).forEach(field => {
            if (body.needsDelivery && (addressFields[field].mandatory && (addresses[field] === '' || !addresses[field]))) {
                errorList.push(field)
            }
        })
        setErrors(errorList)
        if (errorList.length > 0) return false
        else return true
    }

    function submitOrder(type, order, firstName, lastName, email, phone, message, needsDelivery, country, region, postalCode, totalCost) {
        const addressess = {
            country: country,
            region: region,
            postalCode: postalCode
        }
        const body = {
            type: type,
            order: order,
            firstName: firstName,
            lastName: lastName,
            fullName: `${firstName} ${lastName}`,
            email: email,
            phone: phone,
            message: message,
            needsDelivery: needsDelivery,
            addressFields: addressess,
            totalCost: totalCost
        }
        if (validateFields(body, addressess)) {
            axios.post(`${constants.serverLink}`, body)
                .then(res => {
                    alert('form submitted')
                })
                .catch(err => {
                    alert(err)
                })
        }
    }


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

                <SendStandardOrderRequest
                    section={selection}
                    submitOrder={submitOrder}
                    errors={errors}
                />

            </section>
        </div>
        )

}
export default SendRequestPage