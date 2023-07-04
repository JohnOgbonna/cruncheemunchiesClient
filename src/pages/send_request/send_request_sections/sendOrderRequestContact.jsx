import '../sendRequest.scss'
import { useState, useContext, React } from 'react'
import { contactFields, addressFields } from '../../../public/exports/contactFields'
import { useEffect } from 'react'
import { Order } from '../../../App'
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';


function OrderRequestContact(props) {
    const order = useContext(Order)
    const fields = Object.keys(contactFields)
    const addresses = Object.keys(addressFields)
    const [inputs, setInputs] = useState(
        localStorage.getItem('contactInformation') ?
            JSON.parse(localStorage.getItem('contactInformation')) :
            {}
    )
    const [location, setLocation] = useState({
        country: 'Canada',
        'Province/State': '',
    })


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

    return (
        <form
        onSubmit={e => {
            e.preventDefault()
            console.log(e)
        }}
        >
            <h3 className='OrderRequestContact__header'>Contact Information</h3>
            <div className='OrderRequestContact__fields'>
                {
                    fields.map(field => {
                        const fieldObj = contactFields[field];
                        if (fieldObj.type === 'input') {

                            return (
                                <div className='OrderRequestContact__fields-wrapper'>
                                    <div className={`OrderRequestContact__fields-input${fieldObj.inputType === 'checkbox' ? 'Check' : ''}`}>
                                        <input
                                            className={`OrderRequestContact__fields-${fieldObj.tag}`}
                                            id={fieldObj.id}
                                            type={fieldObj.inputType}
                                            onChange={e => {
                                                updateField(field, (e.target.type !== 'checkbox' ? e.target.value : e.target.checked))
                                                console.log(inputs)

                                            }
                                            }
                                            // defaultValue={inputs[field] ? inputs[field] : ''}
                                            // defaultChecked={inputs[field] ? inputs[field] : false}
                                        />
                                        <label
                                            htmlFor={fieldObj.id}
                                            className={`OrderRequestContact__fields-label${field === 'needsDelivery' ? 'Wide' : ''}`}
                                        >
                                            {fieldObj.name}
                                        </label>
                                    </div>
                                </div>
                            )

                        }
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
                                    value={location['Province/State']}
                                    onChange={(val) => {
                                        setLocation({
                                            ...location,
                                            ['Province/State']: val
                                        })
                                    }} />

                            </div>
                            {
                                addresses.map(field => {
                                    const fieldObj = addressFields[field]
                                    return (
                                        <div className={`OrderRequestContact__fields-input${fieldObj.inputType === 'checkbox' ? 'Check' : ''}`}>
                                            <input
                                                className={`OrderRequestContact__fields-${fieldObj.tag}`}
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
            <button type='submit'>Send order request</button>
        </form>
    )
}

export default OrderRequestContact