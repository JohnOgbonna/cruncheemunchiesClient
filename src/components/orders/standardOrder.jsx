import standardPackaging from "../../public/exports/standardPackaging";
import { useState, useContext, useEffect, React } from "react";
import "./orders.scss"
import { Order } from '../../App';
import { formatCash } from "../../public/exports/functions";


function StandardOrder() {
    const [order, setOrder] = useContext(Order);
    const [added, setAdded] = useState({})
    function updateOrder(name, quantity, description, cost) {
        if (order.standardOrder && (+quantity > 0 || order.standardOrder[name])) {
            if (quantity > 0) {
                setOrder({
                    ...order,
                    standardOrder: {
                        ...order.standardOrder,
                        [name]: {
                            ...order.standardOrder.name,
                            'amount': + quantity,
                            'description': description,
                            'cost': cost,
                            'totalCost': cost * quantity
                        }
                    }

                })
            }
            else {
                let orderPlaceHolder = order.standardOrder
                delete (orderPlaceHolder[name])
                setOrder({
                    ...order,
                    standardOrder: orderPlaceHolder
                })
            }
        }
    }
    useEffect(()=>{
        let addedPlaceholder = {}
        Object.keys(order.standardOrder).forEach(order=>{
            addedPlaceholder[order] = true
        })
        setAdded(addedPlaceholder)
    }, [])

    function setSizeAdded(name, value) {
        setAdded({
            ...added,
            [name]: value ? true : false
        })
    }

    return (
        <div className='StandardOrder'>
            <section className='StandardOrderHeader'>
                <h3 className='StandardOrderHeader__header'>Standard Order</h3>
            </section>
            <section className="StandardOrder__cardContainer">
                {
                    standardPackaging.map(packaging => {
                        return (
                            <div className='StandardOrder__card'>
                                <img className='StandardOrder__card-image' src={packaging.image} alt={packaging.name} loading='lazy' />
                                <div className='StandardOrder__card-text'>
                                    <p className='StandardOrder__card-text--description'>{packaging.description}</p>
                                    <h3 className='StandardOrder__card-text--cost'>{formatCash(packaging.cost)}</h3>
                                </div>
                                <form className='StandardOrder__card-quantity'
                                    onSubmit={e => {
                                        e.preventDefault();
                                        if ((order.standardOrder && order.standardOrder[packaging.name]) || + e.target.standardOrderQuantity.value > 0) {
                                            updateOrder(packaging.name, e.target.standardOrderQuantity.value, packaging.description, packaging.cost)
                                            setSizeAdded(packaging.name, true)
                                        }
                                    }}
                                    onChange={e => { setAdded(false) }}
                                >
                                    <label className='StandardOrder__card-quantity--label'>Quantity</label>
                                    <input className='StandardOrder__card-quantity--input'
                                        type='number'
                                        max='200'
                                        min='0'
                                        step='1'
                                        defaultValue={order.standardOrder && order.standardOrder[packaging.name] ? String(order.standardOrder[packaging.name].amount) : '0'}
                                        id='standardOrderQuantity'
                                    />
                                    <button
                                        className='StandardOrder__card-quantity--button'
                                        type='submit'
                                    >
                                        {(added[packaging.name] && order.standardOrder && order.standardOrder[packaging.name]) ? 'Added!' : 'Add to order request!'}
                                    </button>
                                </form>
                            </div>
                        )
                    })
                }
                <h4 className='StandardOrder__message'>{'*Call (403-616-2325) for smaller and larger bulk orders'}</h4>

            </section>
        </div>
    )
}
export default StandardOrder