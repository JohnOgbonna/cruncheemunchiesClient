import { useState } from 'react';
import '../orders.scss'
import customOrder from '../../../public/exports/customOrder';
import { Order } from '../../../App';
import { useContext } from "react";
import { useEffect } from 'react';

function CustomOrderSelection() {

    const [order, setOrder] = useContext(Order);
    const [added, setAdded] = useState({})
    const [quantity, setQuantity] = useState({})

    function updateOrder(name, quantity, caption, cost, label, discount) {
        if (quantity > 0) {
            setOrder({
                ...order,
                customOrder: {
                    ...order.customOrder,
                    [name]: {
                        ...order.customOrder.name,
                        'amount': + quantity,
                        'description': caption,
                        'cost': cost,
                        'label': label,
                        'totalCost': quantity >= discount.threshhold ? (quantity * (cost - discount.amount)) : cost,
                        'discountAdded': quantity >= discount.threshhold ? true : false,
                        'discountPrice': quantity >= discount.threshhold ? cost - discount.amount : null
                    }
                }
            })
        }
        else {
            let orderPlaceHolder = order.customOrder
            delete (orderPlaceHolder[name])
            setOrder({
                ...order,
                customOrder: orderPlaceHolder
            })
        }
    }
    function setSizeAdded(name, value) {
        setAdded({
            ...added,
            [name]: value ? true : false
        })
    }
    function calculatePrice(quantity, price, discount) {
        if (quantity >= discount.threshhold) {

            return (price - discount.amount).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
            })
        }
        else return price.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
        })
    }
    return (
        <div className='CustomOrderSelection'>
            <section className='CustomOrderSelection__header'>
                <h2 className='CustomOrderSelection__header-title'>Request Event Order!</h2>
            </section>
            <section className='CustomOrderSelection__order'>
                {
                    customOrder.sizes.map(customOrder => {
                        return (
                            <div className='CustomOrder__card'>
                                <img className='CustomOrder__card-image' src={customOrder.image} alt={customOrder.name} />
                                <div className='CustomOrder__card-text'>
                                    <p className='CustomOrder__card-text--description'>{customOrder.caption}</p>
                                    <h3 className='CustomOrder__card-text--cost'>{`${quantity[customOrder.name] ? calculatePrice(quantity[customOrder.name], customOrder.cost, customOrder.discount100)
                                        : customOrder.cost}`}</h3>
                                </div>
                                <p className='CustomOrder__card-discount'>Get a discount of %</p>
                                <form className='CustomOrder__card-quantity--form'
                                    onChange={(e) => {
                                        setSizeAdded(customOrder.name, false)
                                    }}
                                    onSubmit={e => {
                                        e.preventDefault()
                                        if ((order.customOrder && order.customOrder[customOrder.name]) || + e.target.customOrderQuantity.value > 0) {
                                            updateOrder(customOrder.name, e.target.customOrderQuantity.value, customOrder.caption, customOrder.cost, e.target.labelSelection.checked, customOrder.discount100);
                                            setSizeAdded(customOrder.name, true)
                                        }

                                    }}
                                >
                                    <div className='CustomOrder__card-quantity--labelCheck'>
                                        <label className='CustomOrder__card-quantity--labelCheck---header'>Include custom label</label>
                                        <input
                                            className='CustomOrder__card-quantity--input'
                                            type='checkbox'
                                            id='labelSelection'
                                            defaultChecked={order.customOrder && order.customOrder[customOrder.name] ?
                                                order.customOrder[customOrder.name].label : true
                                            }
                                        />
                                    </div>
                                    <div className='CustomOrder__card-quantity'>
                                        <label className='CustomOrder__card-quantity--label'>Quantity</label>
                                        <input className='CustomOrder__card-quantity--input'
                                            type='number'
                                            max={customOrder.maxValue}
                                            min='0'
                                            step='1'
                                            defaultValue={
                                                order.customOrder &&
                                                    order.customOrder[customOrder.name] ?
                                                    String(order.customOrder[customOrder.name].amount) :
                                                    customOrder.defaultValue
                                            }
                                            id='customOrderQuantity'
                                            onChange={e => {
                                                if (e.target.value > 0) {
                                                    setQuantity(
                                                        {
                                                            ...quantity,
                                                            [customOrder.name]: +e.target.value
                                                        }
                                                    )
                                                }
                                                else {
                                                    let quantityPlaceholder = quantity
                                                    delete (quantityPlaceholder[customOrder.name])
                                                    setQuantity(quantityPlaceholder)
                                                }
                                            }}
                                        />
                                        <button
                                            className='CustomOrder__card-quantity--button'
                                            type='submit'>
                                            {added[customOrder.name] ? 'Added!' : 'Add to Order Request'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )
                    })
                }
            </section>
        </div>
    )
}
export default CustomOrderSelection