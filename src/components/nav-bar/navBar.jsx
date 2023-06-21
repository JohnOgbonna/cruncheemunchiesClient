import "./navBar.scss"
import {Link} from 'react-router-dom';
import {Order} from '../../App';
import { useContext } from "react";

function NavBar(props) {
    const [order, setOrder] = useContext(Order)
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
            <h1 className="NavBar__Header">{'Crunchee Munchies'.toLocaleUpperCase()}</h1>
            <ul className='NavBar__Container'>
                {
                    sections.map(section=>{
                        return(
                                <li className="section__topic">
                                    <h3 className="section__topic-name"><Link to = {section.route ? section.route : '#'}>{section.name}</Link></h3>
                                </li>
                        )
                    })
                }
            </ul>

        </div>

    )

}
export default NavBar