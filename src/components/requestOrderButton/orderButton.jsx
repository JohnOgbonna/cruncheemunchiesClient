import './orderbuttonStyle.scss'
import { React, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import { Order } from '../../App'
import { useEffect } from 'react';
import { isEmpty } from '../../public/exports/functions';


function OrderButton(props) {
    const [order] = useContext(Order)
    const [visible, toggleVisible] = useState(false)
    const navigate = useNavigate()
    const [desitination, setDestination] = useState('')
    const location = useLocation()

    useEffect(() => {
        const nonEmptyOrders = Object.keys(order).filter(item => !isEmpty(order[item]))
        if (!location.pathname.includes('send-order-request')) {
            if (nonEmptyOrders && nonEmptyOrders.length > 0) toggleVisible(true)
            else toggleVisible(false)

            if (!isEmpty(order.customOrder)) {
                setDestination('send-order-request/event')
            }
            else setDestination('send-order-request/standard')
        }
        else toggleVisible(false)
    }, [order, location], [])

    if (visible) {
        return (
            <button className='OrderButton'
                onClick={() => {
                    navigate(`/${desitination}`)
                }}
            >Request Order!</button>
        )
    }
}
export default OrderButton