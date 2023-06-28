import './orderpage.scss'
import { useState, useEffect } from 'react'
import StandardOrder from '../../components/orders/standardOrder'
import CustomOrder from '../../components/orders/customOrder'
import { useParams, useNavigate } from 'react-router-dom'

function OrderPage() {

    const params = useParams()
    const navigate = useNavigate()
    const [packageType, setPackageType] = useState(
        params.section && (params.section === 'standard' || params.section === 'event') ? params.section : localStorage.getItem('packageType') ?
            JSON.parse(localStorage.getItem('packageType')) : 'standard'

    )

    const packageTypes = [
        {
            name: 'standard',
            desciption: 'Standard Packaging',
            info: 'Choose from our standard chin-chin sizes and packaging'
        },
        {
            name: 'event',
            desciption: 'Custom Event Packaging',
            info: 'Request Large packaged orders with an option for custom labels. Ideal for parties and gatherings'
        }
    ]
    return (
        <div className='Orderpage'>
            <section className='OrderpageHeader'>
                <h1 className='OrderpageHeader__headline'>Request an Order</h1>
            </section>
            <section className='OrderpageSelector'>
                <ul className='OrderpageSelector__options'>
                    {
                        packageTypes.map(type => {
                            return (
                                <li className='OrderpageSelector__options-option' onClick={() => {
                                    setPackageType(type.name)
                                    localStorage.setItem('packageType', JSON.stringify(type.name))
                                    navigate(`/order/${type.name}`)
                                }}>
                                    <h3 className='OrderpageSelector__name'>{type.desciption}</h3>
                                    <p className='OrderpageSelector__info'>{type.info}</p>
                                </li>
                            )
                        })
                    }
                </ul>

            </section>
            <section className='OrderpageOrder'>
                {
                    packageType !== 'event' ?
                        <StandardOrder />
                        : <CustomOrder />
                }
            </section>
        </div>
    )
}

export default OrderPage