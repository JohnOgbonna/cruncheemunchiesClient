import './orderbuttonStyle.scss'
import { React, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { Order } from '../../App'
import { useEffect } from 'react';
import { isEmpty } from '../../public/exports/functions';


function OrderButton(props) {
    const [order] = useContext(Order)
    const [visible, toggleVisible] = useState(false)

    useEffect(() => {
        const nonEmptyOrders = Object.keys(order).filter(item => !isEmpty(order[item]))
        if (nonEmptyOrders && nonEmptyOrders.length > 0) toggleVisible(true)
        else toggleVisible(false)

    }, [order], [])

    
    if(visible){
    return (
        <div className='OrderButton__wrapper'>
            <button className='OrderButton'>Request Order!</button>
        </div>
    )}
}
export default OrderButton