import standardPackaging from "../../public/exports/standardPackaging";
import { useState } from "react";
import "./orders.scss"
import {Order} from '../../App';
import { useContext } from "react";


function StandardOrder(props) {
    const [order, setOrder] = useContext(Order);
    function updateOrder (name, quantity, description, cost){
        setOrder({
            ...order,
            standardOrder: {
                ...order.standardOrder,
                [name]: {
                    ...order.standardOrder.name,
                    'amount': + quantity,
                    'description' :  description,
                    'cost' : cost,
                }
            }
        })
        console.log(order)
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
                                <img className='StandardOrder__card-image' src={packaging.image} alt={packaging.name} />
                                <div className='StandardOrder__card-text'>
                                    <p className='StandardOrder__card-text--description'>{packaging.description}</p>
                                    <h3 className='StandardOrder__card-text--cost'>{`$${packaging.cost}.00`}</h3>
                                </div>
                                <form className='StandardOrder__card-quantity'
                                 onSubmit={e=>{
                                    e.preventDefault();
                                    updateOrder(packaging.name, e.target.standardOrderQuantity.value, packaging.description, packaging.cost)
                                }}
                                >
                                    <label className='StandardOrder__card-quantity--label'>Quantity</label>
                                    <input className='StandardOrder__card-quantity--input'
                                        type='number'
                                        max='200'
                                        min='0'
                                        defaultValue={order.standardOrder[packaging.name] ? String(order.standardOrder[packaging.name].amount) : '0'}
                                        id= 'standardOrderQuantity'
                                    />
                                    <button
                                        className='StandardOrder__card-quantity--button'
                                        type='submit'
                                        >
                                        Add to order request
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