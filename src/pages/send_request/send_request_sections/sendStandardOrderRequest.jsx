import '../sendRequest.scss'
import React from 'react';

import { useState, useEffect, useContext } from 'react';
import { Order } from '../../../App';
import { formatCash } from '../../../public/exports/functions';
import { icons } from '../../../public/exports/icons';
import OrderRequestContact from './sendOrderRequestContact';
import { constants } from '../../../public/exports/constants';
import {useNavigate} from 'react-router-dom'

function SendStandardOrderRequest(props) {
    const [order, setOrder] = useContext(Order)
    const [editing, setEditing] = useState({})
    const [quantity, setQuantity] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        let quantityPlaceholder = {}
        Object.keys(order[props.section.name]).forEach(item => {
            quantityPlaceholder[item] = order[props.section.name][item].amount
        })
        setQuantity(quantityPlaceholder)
    }, [], [props.section])

    function orderTotal() {
        let totalItems = 0
        let totalCost = 0
        if (order[props.section.name] && Object.keys(order[props.section.name]).length > 0) {
            Object.keys(order[props.section.name]).forEach(item => {
                totalItems += order[props.section.name][item].amount
                totalCost += order[props.section.name][item].totalCost
            })
        }
        return ({
            totalCost: totalCost,
            totalItems: totalItems
        })
    }
    function editSection(section) {
        setEditing({
            ...editing,
            [section]: editing[section] ? false : true
        })
    }

    function calculateCost(section, amount, discount) {
        const labelCost = order[props.section.name][section].label ?
            constants.labelPrice : 0
        if (amount < 100) discount = false
        else discount = true
        if(!amount) return order[props.section.name][section].totalCost
        if (!discount) return (order[props.section.name][section].cost + labelCost) * amount
        else {
            return ((order[props.section.name][section].cost + labelCost - constants[`discount${section}`]) * amount)
        }
    }
    function submitEdit(section, amount) {
        const labelCost = order[props.section.name][section].label ?
            constants.labelPrice : 0
        //set discount if amount >= 100
        const discount = 100 > amount ? false : true
        console.log(labelCost)
        setOrder({
            ...order,
            [props.section.name]: {
                ...order[props.section.name],
                [section]: {
                    ...order[props.section.name][section],
                    'amount': amount,
                    //if discount, modify total price else price stays the same, include label price
                    'totalCost': discount ? (order[props.section.name][section].cost - constants[`discount${section}`] + labelCost) * amount :
                        amount * (order[props.section.name][section].cost + labelCost),

                    'discountAdded': discount,
                    //modify discounted price
                    'discountedPrice': discount ? order[props.section.name][section].cost - constants[`discount${section}`] : order[props.section.name][section].cost
                }
            }
        })
        editSection(section)
    }
    function removeItem(item) {
        let sectionOrderPlaceholder = order[props.section.name]
        delete sectionOrderPlaceholder[item]
        setOrder({
            ...order,
            [props.section.name]: sectionOrderPlaceholder
        })
    }

    return (
        <div className='requestOrderForm'>
            <h3 className='requestOrderForm__header'>{`Complete ${props.section.title} Request`}</h3>
            <div className='requestOrderForm__sectionWrapper'>
                <div className='requestOrderForm__orderDetails'>
                    <h3 className='requestOrderForm__orderDetails-header'>Order information</h3>
                    <h4 className='requestOrderForm__orderDetails-quantity'>{`${orderTotal().totalItems} Items Selected, Total = ${formatCash(orderTotal().totalCost)}`}</h4>
                    <button className='requestOrderForm__orderDetails-more'
                    type = 'button'
                    onClick={e=>{navigate(props.section.link)}}
                    >Order More!</button>
                    <div className='requestOrderForm__orderDetails-container'>
                        {
                            Object.keys(order[props.section.name]).map(item => {
                                let orderObj = order[props.section.name][item]

                                return (
                                    <div className='requestOrderForm__orderDetails-wrapper'>
                                        <h5 className='requestOrderForm__orderDetails-info'>{`${item} chin-chin pack @ ${formatCash(orderObj.discountedPrice ?
                                            orderObj.discountedPrice :
                                            orderObj.cost
                                        )} each, ${orderObj.label ? formatCash(constants.labelPrice) : ''} ${orderObj.label ? `label charge` : 'no label selected'}
                                         ${orderObj.discountAdded ? ', discount added' : ''}
                                         `
                                        }</h5>

                                        {
                                            !editing[item] ?
                                                <p className='requestOrderForm__orderDetails-order'>{orderObj.amount} : {formatCash(orderObj.totalCost)}
                                                </p>
                                                :
                                                <div className='requestOrderForm__orderDetails-edit'>
                                                    <input className='requestOrderForm__orderDetails-edit--amount'

                                                        id='editAmount'
                                                        type='number'
                                                        defaultValue={`${orderObj.amount}`}
                                                        min='1'
                                                        max='200'

                                                        onChange={e => {
                                                            setQuantity({
                                                                ...quantity,
                                                                [item]: +e.target.value
                                                            })
                                                        }}


                                                    />


                                                    <h5 className='requestOrderForm__orderDetails-edit--price'>{formatCash(calculateCost(item, (quantity[item] ), orderObj.discountAdded))}</h5>
                                                    <h5
                                                        className='requestOrderForm__orderDetails-edit--submit'
                                                        onClick={() => {
                                                            if(quantity[item] > 0 || (quantity[item] !== 0 &&orderObj.totalCost > 0)){
                                                            submitEdit(item, quantity[item])
                                                        }
                                                        }}

                                                    >
                                                        Done
                                                    </h5>
                                                </div>
                                        }

                                        {
                                            !editing[item] ?
                                                <h5 className='requestOrderForm__orderDetails-editRemove'
                                                    onClick={() => editSection(item)}
                                                >Edit
                                                </h5>
                                                : null
                                        }
                                        <img className='requestOrderForm__orderDetails-remove'
                                            src={icons.closeBrown}
                                            onClick={() => {
                                                removeItem(item)
                                            }}
                                        />

                                    </div>
                                )

                            })
                        }
                    </div>
                </div>
               
                <OrderRequestContact
                    section={props.section}
                />
            </div>
        </div>
    )

}
export default SendStandardOrderRequest