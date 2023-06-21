import { useState } from 'react';
import '../orders.scss'
import customOrder from '../../../public/exports/customOrder';

function CustomOrderSelection() {
    return (
        <div className='CustomOrderSelection'>
            <section className='CustomOrderSelection__header'>
                <h2 className='CustomOrderSelection__header-title'>Request Event Order!</h2>
            </section>
            <section className='CustomOrderSelection__order'>
                {
                    customOrder.sizes.map(order => {
                        return (
                            <div className='CustomOrder__card'>
                                <img className='CustomOrder__card-image' src={order.image} alt={order.name} />
                                <div className='CustomOrder__card-text'>
                                    <p className='CustomOrder__card-text--description'>{order.caption}</p>
                                    <h3 className='CustomOrder__card-text--cost'>{`$${order.cost}.00`}</h3>
                                </div>
                                <form className='CustomOrder__card-quantity--form'>
                                    <div className='CustomOrder__card-quantity--labelCheck'>
                                        <label className='CustomOrder__card-quantity--labelCheck---header'>Include custom label</label>
                                        <input
                                            className='CustomOrder__card-quantity--input'
                                            type='checkbox'
                                            id ='labelSelection'
                                        />
                                   </div>
                                    <div className='CustomOrder__card-quantity'>
                                        <label className='CustomOrder__card-quantity--label'>Quantity</label>
                                        <input className='CustomOrder__card-quantity--input'
                                            type='number'
                                            max={order.maxValue}
                                            min='0'
                                            defaultValue={order.defaultValue}
                                            id ={`${order.name}`}
                                        />
                                        <button
                                            className='CustomOrder__card-quantity--button'
                                            type='submit'>
                                            Add to order request
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