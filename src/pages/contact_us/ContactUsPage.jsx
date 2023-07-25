import { useState, useContext } from 'react'
import './ContactUsPage.scss';
import { messengerFields } from '../../public/exports/messengerFields';
import axios from 'axios';


export default function ContactUsPage() {

    return (
        <div className='ContactUsPage'>
            <section className='ContactUsPageHeader'>
                <h1 className='ContactUsPageHeader__header'>Follow / Contact Us</h1>
            </section>
            {/* <script src="https://static.elfsight.com/platform/platform.js" data-use-service-core defer></script>
<div class="elfsight-app-6b92a307-55c0-43db-8e38-cc8a068e52c1"></div> */}
            <section className='ContactUsPageInstagram'>
                <div className='ContactusPageInstagram__header'>
                    <h2 className='ContactusPageInstagram__header-header'>Instagram</h2>
                    <p className='ContactusPageInstagram__header-text'>Follow us on Instagram</p>
                </div>
                <iframe className='ContactUsPageiframe' src='https://widget-6b92a30755c043db8e38cc8a068e52c1.elfsig.ht' />
            </section>
            <section className='ContactusPageMessenger'>
                <div className='ContactusPageMessenger__header'>
                    <h2 className='ContactusPageMessenger__header-header'>Send us a message</h2>
                    <p className='ContactusPageMessenger__header-text'>Send us a message! Ask any question or let us know how we can help you or improve your experience</p>
                </div>
                <form className='ContactUsPageMessenger__messenger'>
                    <div className='ContactUsPageMessenger__messenger-fields'>
                        {
                            Object.keys(messengerFields).map(field => {
                                const fieldObj = messengerFields[field]
                                if (fieldObj.type === 'input') {
                                    return (
                                        <div className='ContactUsPageMessenger__messenger-fields--wrapper'>
                                            <input className='ContactUsPageMessenger__messenger-fields--input' id={fieldObj.id}
                                            />
                                            <label htmlFor={fieldObj.id}>{`${fieldObj.mandatory ? '*' : ''}${fieldObj.name}`}</label>
                                        </div>
                                    )
                                }
                                if (fieldObj.type === 'textarea') {
                                    return (
                                        <div className='ContactUsPageMessenger__messenger-fields--wrapper'>
                                            <textarea className='ContactUsPageMessenger__messenger-fields--textarea' id={fieldObj.id}
                                            />
                                            <label htmlFor={fieldObj.id}>{`${fieldObj.mandatory ? '*' : ''}${fieldObj.name}`}</label>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                    <button className='ContactUsPageMessenger__button' type='submit'>Send!</button>
                </form>
            </section>
        </div>
    )
}