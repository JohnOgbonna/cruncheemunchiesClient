import { useState, useEffect, useRef, useContext } from 'react';
import '../orders.scss'
import customOrder from '../../../public/exports/customOrder';
import { Order } from '../../../App';
import { formatCash } from '../../../public/exports/functions';
import { constants } from '../../../public/exports/constants';

function CustomOrderSelection() {
    const [order, setOrder] = useContext(Order);
    const [added, setAdded] = useState({})
    const [quantity, setQuantity] = useState({})
    const [labelSelected, setLabelSelected] = useState({})

    // setLabeledStatus
    useEffect(() => {
        let labelled = {}
        customOrder.sizes.forEach(size => {
            if (order.customOrder[size.name] && order.customOrder[size.name].label) {
                labelled[size.name] = order.customOrder[size.name].label
            }
        })
        setLabelSelected(labelled)
    }, [])

    function updateOrder(name, quantity, caption, cost, label, discount) {
        if (quantity > 0) {
            const labelCost = label ? constants.labelPrice * quantity : 0
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
                        'totalCost': quantity >= discount.threshhold ? (quantity * (cost - discount.amount)) + labelCost : quantity * cost + labelCost,
                        'discountAdded': quantity >= discount.threshhold ? true : false,
                        'discountedPrice': quantity >= discount.threshhold ? cost - discount.amount : cost,
                        labelCost: labelCost
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
    function calculatePrice(name, quantity, price, discount, label) {
        //calculate label cost
        const labelPrice = label ? .25 : 0

        if (quantity) {
            if (quantity >= discount.threshhold) return formatCash(price - discount.amount + labelPrice)
            else return formatCash(price + labelPrice)
        }
        else if (order.customOrder[name]) {
            if (order.customOrder[name].discountAdded) {
                return (formatCash(order.customOrder[name].discountedPrice + labelPrice))
            }
            else return (formatCash(order.customOrder[name].cost + labelPrice))
        }
        else return formatCash(price)
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
                                    <h3 className='CustomOrder__card-text--cost'>{
                                        `${quantity && (quantity[customOrder.name] ||( order.customOrder && order.customOrder[customOrder.name])) 
                                            ? calculatePrice(customOrder.name, quantity[customOrder.name], customOrder.cost, customOrder.discount100, labelSelected[customOrder.name])
                                            : formatCash(customOrder.cost + (labelSelected[customOrder.name] ? constants.labelPrice : 0))}`
                                    }
                                    </h3>
                                </div>
                                <p className='CustomOrder__card-discount'>{(quantity[customOrder.name] && (quantity[customOrder.name] >= customOrder.discount100.threshhold)) || (
                                    order.customOrder[customOrder.name] &&
                                    (order.customOrder[customOrder.name].amount
                                        >= customOrder.discount100.threshhold))

                                    ? `Selected ${customOrder.discount100.threshhold} or more units, ${formatCash(customOrder.discount100.amount)} discount added!` : `Get a discount of ${formatCash(customOrder.discount100.amount)} when you order ${customOrder.discount100.threshhold} or more units!`}
                                </p>
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
                                                order.customOrder[customOrder.name].label : false
                                            }
                                            onChange={e => {
                                                setLabelSelected({
                                                    ...labelSelected,
                                                    [customOrder.name]: e.target.checked
                                                })
                                            }}

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
                                            }}
                                        />
                                        <button
                                            className='CustomOrder__card-quantity--button'
                                            type='submit'>
                                            {added[customOrder.name] && order.customOrder && order.customOrder[customOrder.name]? 'Added!' : 'Add to Order Request'}
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