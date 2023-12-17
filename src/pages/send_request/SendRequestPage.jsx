import { React, useState, } from 'react'
import './sendRequest.scss'
import SendStandardOrderRequest from './send_request_sections/sendStandardOrderRequest'
import { useNavigate, useParams} from 'react-router-dom'
import { useEffect } from 'react'
import { contactFields, addressFields } from '../../public/exports/contactFields'
import axios from 'axios'
import LoadingScreen from '../../components/loading-screen/loadingScreen'
import OrderRequestModal from '../../components/orderRequestModal/orderRequestModal'
import { isEqualString } from '../../public/exports/functions'
import { isEmpty } from '../../public/exports/functions'

const sections = {
    standardOrder: {
        name: 'standardOrder',
        description: 'Standard Packaged Order',
        info: 'Complete order request for Crunchee Munchies standard packaged order',
        title: 'Standard Order',
        link: '/order/standard',
        navigate: '/send-order-request/standard'
    },
    customOrder: {
        name: 'customOrder',
        description: 'Event / Custom Packaged Order',
        info: 'Complete order request for Crunchee Munchies event packaged order',
        title: 'Event / Party Order',
        link: '/order/event/order',
        navigate: '/send-order-request/event'
    }
}

function SendRequestPage() {
    const navigate = useNavigate()
    const params = useParams()
    const [selection, setSelection] = useState(
        params && params.section !== 'standard' ?
            sections.customOrder :
            sections.standardOrder
    )
    const [errors, setErrors] = useState([])
    const [loading, isloading] = useState(false)
    const [message, setMessage] = useState("")

    useEffect(() => {
        if (params.section === 'event') setSelection(sections.customOrder)
        else setSelection(sections.standardOrder)
    }, [params])

    let sectionsList = Object.keys(sections)
    function setModalMessage(message) {
        setMessage(message)
    }
    function removeModal() {
        setMessage('')
    }

    function validateFields(body, addresses) {
        let errorList = []
        Object.keys(contactFields).forEach(field => {
            if (contactFields[field].mandatory && (!body[field] || body[field].replace(/\s+/g, '') === '')) {
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

    function submitOrder(type, order, firstName, lastName, email, phone, message, needsDelivery, country, region, postalCode, city, address) {
        const addressess = {
            country: country,
            region: region,
            postalCode: postalCode,
            city: city,
            address: address
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

        }
        if(isEmpty(body.order)){
            setModalMessage('Your Order is Empty!')
            return
        }

        isloading(true)
        if (validateFields(body, addressess)) {
            axios.post(process.env.REACT_APP_ORDER_SERVER_LINK, body)
                .then(res => {
                    setModalMessage(`Order request sent! Confirmation sent to ${email}`)
                    isloading(false)
                })
                .catch(err => {
                    setModalMessage(`Error! message not sent`)
                    isloading(false)
                })
        }
        else isloading(false)
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
                            <div className={isEqualString(selection.name, sectionObj.name) ? `SendRequestSelector__textSelected` : `SendRequestSelector__text`}
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
            <LoadingScreen loading={loading} />
            <OrderRequestModal message={message}
                removeModal={removeModal}
            />
        </div>
    )
}
export default SendRequestPage