import '../orders.scss'
import customOrder from '../../../public/exports/customOrder'
import React from 'react';

function CustomOrderDetails() {
    return (
        <div className='CustomOrderDetails'>
            <section className='CustomOrderDetails__sizes'>
                <h4 className='CustomOrderDetails__sizes-header'>Custom 60grams and 150grams packaging!</h4>
                <div className='CustomOrderDetails__sizes-container'>
                    {
                        customOrder.sizes.map(size => {
                            return (
                                <div className='CustomOrderDetails__sizes-wrapper'>
                                    <img
                                        id='customOrderImage'
                                        className='CustomOrderDetails__sizes-image'
                                        src={size.image}
                                    />
                                    <h4
                                        className='CustomOrderDetails__sizes-caption'>{size.caption}</h4>
                                </div>
                            )
                        })
                    }
                </div>

            </section>
            <section className='CustomOrderDetails__labeled'>
            <h4 className='CustomOrderDetails__labeled-header'>We design package labels!</h4>
            <div className='CustomOrderDetails__labeled-container'>
                    {
                        customOrder.labeledSizes.map(label => {
                            return (
                                <div className='CustomOrderDetails__labeled-wrapper'>
                                    <img
                                        id='customOrderImage'
                                        className={`CustomOrderDetails__labeled-image${label.displayWide ? '--wide':''}`}
                                        src={label.image}
                                        alt={label.name}
                                    />
                                    <h4
                                        className='CustomOrderDetails__labeled-caption'>{label.caption}</h4>
                                </div>
                            )
                        })
                    }
                </div>
            </section>
            <section className='CustomOrderDetails__labeled'>
            <h4 className='CustomOrderDetails__labeled-header'>Professional label design!</h4>
            <div className='CustomOrderDetails__labeled-container'>
                    {
                        customOrder.customLabels.map(label => {
                            return (
                                <div className='CustomOrderDetails__label-wrapper'>
                                    <img
                                        id='customOrderImage'
                                        className= 'CustomOrderDetails__label-image--label'
                                        src={label.image}
                                        alt={label.name}
                                    />
                                    <h4
                                        className='CustomOrderDetails__label-caption'>{label.caption}</h4>
                                </div>
                            )
                        })
                    }
                </div>
            </section>
        </div>
    )
}
export default CustomOrderDetails