import '../sendRequest.scss'
import { useState, useContext, React } from 'react'
import { contactFields, addressFields } from '../../../public/exports/contactFields'
import { useEffect } from 'react'
import { Order } from '../../../App'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import SendOrderRequestError from './sendOrderRequestError'


function OrderRequestContact(props) {
    const [order] = useContext(Order)
    const fields = Object.keys(contactFields)
    const addresses = Object.keys(addressFields)
    const [inputs, setInputs] = useState(
        localStorage.getItem('contactInformation') ?
            JSON.parse(localStorage.getItem('contactInformation')) :
            {}
    )
    const [location, setLocation] = useState({
        country: 'Canada',
        region: '',
    })
    const [orderSent, setOrderSent] = useState(false)

    function updateField(field, value, address) {
        if (!address) {
            setInputs({
                ...inputs,
                [field]: value,
            })
        }
        else {
            setInputs({
                ...inputs,
                addressFields: {
                    ...inputs.addressFields,
                    [field]: value
                }
            })
        }
    }
    useEffect(() => {
        localStorage.setItem('contactInformation', JSON.stringify(inputs))

    }, [inputs])

    useEffect(()=>{
        if(props.errors.length > 0){
            setOrderSent(false)
        }
    },[props.errors])


    const onSubmitClick = (e) => {
        e.preventDefault()
        props.submitOrder(
            props.section.name,
            order[props.section.name],
            e.target.firstName.value,
            e.target.lastName.value,
            e.target.email.value,
            e.target.phone.value,
            e.target.message.value,
            e.target.needsDelivery.checked,
            e.target.needsDelivery.checked ? location.country : '',
            e.target.needsDelivery.checked ? location.region : '',
            e.target.needsDelivery.checked ? e.target.postalCode.value : '',
            e.target.needsDelivery.checked ? e.target.city.value : '',
            e.target.needsDelivery.checked ? e.target.address.value : ''
        )

    }

    return (
        <form className='contactForm'
            onSubmit={(e) => {
                if(!orderSent) onSubmitClick(e)
            }}
        >
            <h3 className='OrderRequestContact__header'>Contact Information</h3>
            {
                props.errors.length > 0 ?
                    <SendOrderRequestError
                        list={props.errors}
                    />
                    : null
            }
            <div className='OrderRequestContact__fields'>
                {
                    fields.map(field => {
                        const fieldObj = contactFields[field];
                        if (fieldObj.type === 'input') {

                            return (
                                <div className='OrderRequestContact__fields-wrapper'>
                                    <div className={`OrderRequestContact__fields-input${fieldObj.inputType === 'checkbox' ? 'Check' : ''}`}>
                                        <input
                                            className={`OrderRequestContact__fields-${fieldObj.tag}${props.errors.includes(field) ? 'Error' : ''}`
                                            }
                                            id={fieldObj.id}
                                            type={fieldObj.inputType}
                                            onChange={e => {
                                                updateField(field, (e.target.type !== 'checkbox' ? e.target.value : e.target.checked))
                                            }
                                            }
                                        />
                                        <label
                                            htmlFor={fieldObj.id}
                                            className={`OrderRequestContact__fields-label${field === 'needsDelivery' ? 'Wide' : ''}`}
                                        >
                                            {`${fieldObj.mandatory ? '*' : ''}${fieldObj.name}`}
                                        </label>
                                    </div>
                                </div>
                            )

                        }
                        else if (fieldObj.type === 'textarea') {
                            return (
                                <div className='OrderRequestContact__fields-wrapper'>
                                    <div className={`OrderRequestContact__fields-input`}>
                                        <textarea
                                            className={`OrderRequestContact__fields-${fieldObj.tag}`}
                                            id={fieldObj.id}
                                            type={fieldObj.inputType}
                                            onChange={e => {
                                                updateField(field, (e.target.type !== 'checkbox' ? e.target.value : e.target.checked))
                                            }
                                            }
                                        />
                                        <label
                                            htmlFor={fieldObj.id}
                                            className={`OrderRequestContact__fields-label`}
                                        >
                                            {fieldObj.name}
                                        </label>
                                    </div>
                                </div>
                            )
                        }
                        else return null
                    })

                }
                {
                    inputs.needsDelivery ?

                        <div className='OrderRequestContact__fields-address'>
                            <div className='OrderRequestContact__fields-address--wrapper'>
                                <label className='OrderRequestContact__fields-label'>Country</label>
                                <CountryDropdown
                                    value={location.country}
                                    onChange={(val) => {
                                        setLocation({
                                            ...location,
                                            country: val
                                        })
                                    }}
                                    priorityOptions={['CA', 'US']}
                                />

                            </div>
                            <div className='OrderRequestContact__fields-address--wrapper'>
                                <label className='OrderRequestContact__fields-label'>Region</label>
                                <RegionDropdown
                                    country={location.country}
                                    value={location.region}
                                    onChange={(val) => {
                                        setLocation({
                                            ...location,
                                            region: val
                                        })
                                    }} />

                            </div>
                            {
                                addresses.map(field => {
                                    const fieldObj = addressFields[field]
                                    return (
                                        <div className={`OrderRequestContact__fields-input${fieldObj.inputType === 'checkbox' ? 'Check' : ''}`}>
                                            <input
                                                className={`OrderRequestContact__fields-${fieldObj.tag}${props.errors.includes(field) ? 'Error' : ''}`}
                                                id={fieldObj.id}
                                                type={fieldObj.inputType}
                                                onChange={e => {
                                                    updateField(field, (e.target.type !== 'checkbox' ? e.target.value : e.target.checked), true)

                                                }
                                                }
                                                defaultValue={inputs[field] ? inputs[field] : ''}
                                                defaultChecked={inputs[field] ? inputs[field] : false}
                                            />
                                            <label
                                                htmlFor={fieldObj.id}
                                                className={`OrderRequestContact__fields-label`}
                                            >
                                                {fieldObj.name}
                                            </label>
                                        </div>
                                    )
                                })
                            }

                        </div> : null
                }
            </div>
            <button type='submit' className={`submitButton${orderSent ? 'Sent' : ''}`}
            >Send Order Request</button>
        </form>
    )
}

export default OrderRequestContact