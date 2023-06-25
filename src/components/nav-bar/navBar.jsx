import './navBar.scss'
import { Link } from 'react-router-dom';
import { Order } from '../../App';
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

function NavBar(props) {
    const [order] = useContext(Order)
    const [selections, setSelections] = useState([])
    useEffect(() => {
        let standardOrderselections = []
        let customOrderselections = []
        if (order.standardOrder && !(order.standardOrder === {})) {
            Object.keys(order.standardOrder).forEach(name => {
                standardOrderselections.push(
                    {
                        name: name,
                        ...order.standardOrder[name],
                    }
                )
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
            })
        }
        setSelections([
            {
                description: 'Standard Order',
                orders: standardOrderselections,
            },
            {
                description: 'Custom Event Order',
                orders: customOrderselections,
            },
        ])
    }, [order], [])

    function calculateOrderTotal(orders, description) {
        let total = 0
        if (description !== 'Custom Event Order') {
            order.forEach(order=>{
                total += order.amount * order.cost
            })
            return `$${total}`
        }
        else{
            order.forEach(order=>{
                total += order.amount * order.cost
            })
            return `$${total}`
        }
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
        <div className='NavBar'>
            <div className='NavBar__line1'>
                <h1 className="NavBar__Header">{'Crunchee Munchies'.toLocaleUpperCase()}</h1>
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
            <div className='NavBar__order'> {selections.length !== [] ?
                selections.map(selection => {
                    console.log(selection.orders)
                    return (
                        <div className={`NavBar__order-section${selection.orders.length < 1 ? 'Hidden' : ''}`}>
                            <h4 className='NavBar__order-section--header'>{selection.description}</h4>
                        </div>
                    )
                })
                : null
            }
            </div>
        </div>

    )

}
export default NavBar