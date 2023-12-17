import './navBar.scss'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Order } from '../../App';
import { useContext, useState, useEffect } from 'react';
import { formatCash } from '../../public/exports/functions';
import { icons } from '../../public/exports/icons';
import React from 'react';

function NavBar() {
    const [order, setOrder] = useContext(Order)
    const [selections, setSelections] = useState([])
    const [totalUnits, setTotalUnits] = useState({})
    const navigate = useNavigate()
    const location = useLocation()
    useEffect(() => {
        let standardOrderselections = []
        let customOrderselections = []
        let totalUnitsCustom = 0
        let totalUnitsStandard = 0
        if (order.standardOrder && !(order.standardOrder === {})) {
            Object.keys(order.standardOrder).forEach(name => {
                standardOrderselections.push(
                    {
                        name: name,
                        ...order.standardOrder[name],
                    }
                )
                totalUnitsStandard += order.standardOrder[name].amount

            });
        }
        if (order.customOrder && !(order.customOrder === {})) {
            Object.keys(order.customOrder).forEach(name => {
                customOrderselections.push(
                    {
                        name: name,
                        ...order.customOrder[name],

                    }
                )
                totalUnitsCustom += order.customOrder[name].amount
            })
        }

        setSelections([
            {
                description: 'Standard Order',
                orders: standardOrderselections,
                code: 'standard',
                link: '/order/standard',
                requestLink: '/send-order-request/standard'
            },
            {
                description: 'Custom Event Order',
                orders: customOrderselections,
                code: 'custom',
                link: '/order/event/order',
                requestLink: '/send-order-request/event'
            },
        ])
        setTotalUnits({
            standard: totalUnitsStandard,
            custom: totalUnitsCustom
        }
        )
    }, [order], [])

    function removeOrder(section) {
        setOrder({
            ...order,
            [`${section}Order`]: {}
        })
    }

    function getOrderTotals(orderSelections) {
        let totalCost = 0;
        orderSelections.forEach(order => {
            totalCost += order.totalCost
        })
        return totalCost
    }
    function emptyOrder() {
        return Object.keys(order.standardOrder).length > 0 || Object.keys(order.customOrder).length > 0 ? false : true
    }

    const sections = [
        {
            name: 'About Us',
            route: '/',
            links: [
                {
                    name: 'Calgarys best chin-chin',

                },
                {
                    name: 'Hand-Crafted to Perfection',

                },
                {
                    name: 'Making waves',

                },
            ]
        },
        {
            name: 'Where to buy',
            route: 'locations',
            links: [
                {
                    name: 'Store 1',

                },
                {
                    name: 'Store 2',

                },
            ]
        },
        {
            name: 'Request Order',
            route: 'order',
            links: [
                {
                    name: 'Request Order',

                },
                {
                    name: 'Contact',

                },
            ]
        },
        {
            name: 'Follow Us/Contact us',
            route: 'contact-us',
            links: [
                {
                    name: 'Instagram',

                },
                {
                    name: 'TikTok',

                },
            ]
        },
    ]
    return (

        <div className='NavBar'
        >
            <div className='NavBar__line1'>
                <h1 className="NavBar__Header"
                onClick={()=>{
                    navigate('/')
                }}
                >{'Crunchee Munchies'}</h1>
                <ul className='NavBar__Container'>
                    {
                        sections.map(section => {
                            return (
                                <li className="section__topic">
                                    <h3 className="section__topic-name"><Link to={section.route ? section.route : '#'}>{section.name}</Link></h3>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>

            <div className={`NavBar__order${!emptyOrder() && location.pathname !== '/send-order-request' ? '' : 'hidden'}`}> {selections.length > 1 ?
                selections.map(selection => {
                    return (

                        <div className={`NavBar__order-section${selection.orders.length < 1 ? 'Hidden' : ''}`}>
                            <h4 className='NavBar__order-section--header'
                                onClick={() => navigate(selection.link)}
                            >{selection.description}</h4>
                            <div className='NavBar__order-section--checkout'>
                                <h4 className='NavBar__order-section--price'
                                    onClick={() => navigate(selection.link)}
                                >{`${totalUnits[selection.code]} Total items = ${formatCash(getOrderTotals(selection.orders))}`}</h4>
                                <button className='NavBar__order-section--button' type='button'
                                    onClick={() => { navigate(selection.requestLink) }}
                                >Order</button>
                                <img className='NavBar__order-section--remove'
                                    src={icons.close}
                                    onClick={() => removeOrder(selection.code)}
                                />
                            </div>
                        </div>
                    )
                })
                : null
            }
            </div>
        </div >

    )
}
export default NavBar