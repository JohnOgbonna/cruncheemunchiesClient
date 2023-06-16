import { useState, useEffect } from 'react';
import axios from 'axios';
import './forms.scss';

function OrderRequestForm() {
    const sizes = [
        {
            name: 'Large',
            cost: 20,
            state: 'L'
        },
        {
            name: 'Medium',
            cost: 15,
            state: 'M'
        },
        {
            name: 'Small',
            cost: 5,
            state: 'S'
        },
        {
            name: 'Extra Large',
            cost: 30,
            state: 'XL'
        },
        {
            name: 'Mega Pack',
            cost: 50,
            state: 'MEGA'
        },
    ]
    let [sizeOrders, setSizeOrders] = useState({
        L: 0,
        M: 0,
        S: 0,
        XL: 0,
        MEGA: 0,
    })
    let [totalCost, setTotalCost] = useState(0);
    useEffect(() => {
        setTotalCost(sizeOrders.L * 20 + sizeOrders.S * 5 + sizeOrders.M * 15 + sizeOrders.XL * 30 + sizeOrders.MEGA * 50)
    }, [sizeOrders])

    let submitOrder = (e) => {
        e.preventDefault()
        let body = {
            name: e.target.fullName.value,
            senderEmail: e.target.email.value,
            phoneNumber: e.target.number.value,
            order: {
                mega: sizeOrders.MEGA,
                large: sizeOrders.L,
                medium: sizeOrders.M,
                extraLarge: sizeOrders.XL,
                small: sizeOrders.S,
                message: e.target.message.value,
                totalCost: totalCost
            }
        }
        console.log(body)
        //validation
        if (!body.name || !body.senderEmail) {
            return alert(`Please Enter ${!body.name ? 'your name' : 'a valid email address'}${!body.name && !body.senderEmail ? ' and a valid email address' : ''}`)
        }
        if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(body.senderEmail))) {
            return alert('Please enter a valid email address');
        }
        if (totalCost <= 0) return alert('Please select what you would like to order')
        axios.post('http://localhost:5001/orderRequest/', body)
            .then(res => {
                alert(res.data)
                setSizeOrders({
                    L: 0,
                    M: 0,
                    S: 0,
                    XL: 0,
                    Mega: 0,
                })
            })
            .catch(err => {
                console.log(err)
                alert(err)
            })
    }
    return (
        <div className='orderRequest'>
            <div className='orderRequestWrapper'>
                <h1 className='orderRequest__header'>Request an Order</h1>
                <form className='orderRequest__form' onSubmit={(e) => submitOrder(e)}>
                    <div className='requestOrder__card' id='contact'>
                        <h2 className='orderRequest__order-header'>Your Contact Information</h2>
                        <div className='orderRequest_wrapper'>
                            <label className='orderRequest__label' htmlFor='fullName'>Name</label>
                            <input type='text' className='orderRequest_input' id='fullName' placeholder='Enter your full name' />
                        </div>
                        <div className='orderRequest_wrapper'>
                            <label className='orderRequest__label' htmlFor='email'>Email Address</label>
                            <input type='email' className='orderRequest_input' id='email' placeholder='Enter your email adress' />
                        </div>
                        <div className='orderRequest_wrapper'>
                            <label className='orderRequest__label' htmlFor='number'>Phone Number</label>
                            <input type='tel' className='orderRequest_input' id='number' placeholder='Enter your phone number' />
                        </div>
                    </div>
                    <div className='requestOrder__card' id='order'>
                        <h2 className='orderRequest__order-header'>Order</h2>
                        {
                            sizes.map(size => {
                                return (
                                    <div className='orderRequest__order'>
                                        <label className='orderRequest__order-label'>{`${size.name} Bag`}</label>
                                        <input type='number'
                                            value={sizeOrders[size.state]}
                                            className='orderRequest__order-number'
                                            min='0'
                                            max='25'
                                            onChange={(e) => {
                                                setSizeOrders({
                                                    ...sizeOrders,
                                                    [size.state]: e.target.value
                                                })
                                            }}
                                        />
                                        <label className='orderRequest__order-label'>{`Total = $${sizeOrders[size.state] * size.cost || 0}`}</label>
                                    </div>
                                )
                            })
                        }
                        <p className='orderRequest__total'>{`Order Total: $${totalCost}`}</p>
                        <div className='orderRequest_wrapper-message'>
                            <div className='orderRequest_wrapper'>
                                <label className='orderRequest__label' htmlFor='message'>Order Message</label>
                                <textarea className='orderRequest__message' id='message' placeholder='Leave a message to Crunchee Munchies regarding your order' />
                            </div>
                            <button className='orderRequest__submit' type='submit'>Submit Order</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default OrderRequestForm;