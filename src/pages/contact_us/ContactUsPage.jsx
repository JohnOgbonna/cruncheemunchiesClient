import { useState, useContext } from 'react'
import './ContactUsPage.scss';
import { messengerFields } from '../../public/exports/messengerFields';
import axios from 'axios';
import SendOrderRequestError from '../send_request/send_request_sections/sendOrderRequestError';
import { constants } from '../../public/exports/constants';


export default function ContactUsPage() {
    const [sentMessage, toggleSentMessage] = useState(false)
    const [errors, setErrors] = useState([])
    function sendMessage(e) {
        e.preventDefault()
        if (sentMessage) return
        toggleSentMessage(true)
        let errorList = []
        let body = {
            name: e.target.name.value,
            email: e.target.email.value,
            phone: e.target.phone.value,
            message: e.target.message.value
        }
        Object.keys(messengerFields).forEach(field => {
            let fieldObj = messengerFields[field]
            if (fieldObj.mandatory && (!body[field] || body[field].replace(/\s+/g, '') === '')) errorList.push(field)
        })
        if (errorList.length > 0) {
            setErrors(errorList)
            return
        }
        axios.post(process.env.REACT_APP_MESSAGE_SERVER_LINK, body)
            .then(res => {
                alert(res.data)
            })
            .catch(err => {
                alert('Error, message not sent')
                toggleSentMessage(false)
            })
    }

    return (
        <div className='ContactUsPage'>
            <section className='ContactUsPageHeader'>
                <h1 className='ContactUsPageHeader__header'>Follow / Contact Us</h1>
            </section>
            <section className='ContactUsPageInstagram'>
                <div className='ContactusPageInstagram__header'>
                    <h2 className='ContactusPageInstagram__header-header'>Instagram</h2>
                    <p className='ContactusPageInstagram__header-text'>Follow us on Instagram</p>
                </div>
                <iframe className='ContactUsPageiframe' src='https://widget-6b92a30755c043db8e38cc8a068e52c1.elfsig.ht' />
            </section>
            <section className='ContactusPageMessenger' id = 'messenger'>
                <div className='ContactusPageMessenger__header'>
                    <h2 className='ContactusPageMessenger__header-header'>Send us a message</h2>
                    <p className='ContactusPageMessenger__header-text'>Send us a message! Ask any question or let us know how we can help you or improve your experience</p>
                </div>
                <SendOrderRequestError
                    list={errors}
                    type={'contactUs'}
                />
                <form className='ContactUsPageMessenger__messenger'
                    onSubmit={e => { sendMessage(e) }}
                    onChange={e => { toggleSentMessage(false) }}
                >
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
                                            <label classname='label' htmlFor={fieldObj.id}>{`${fieldObj.mandatory ? '*' : ''}${fieldObj.name}`}</label>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                    <button className={`ContactUsPageMessenger__button${sentMessage ? 'Sent' : ''}`} type='submit'>{sentMessage ? 'Message Sent!' : 'Send!'}</button>
                </form>
            </section>
        </div>
    )
}