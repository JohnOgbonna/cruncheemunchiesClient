import './orders.scss';
import {useState} from 'react';

function CustomOrder() {
    const [section, changeSetion] = useState('info')

    const sections = [
        {
            name: 'Details',
            section: 'details',
            info: 'About Custom Event Orders'
        },
        {
            name: 'Order',
            section: 'order',
            info: 'Request Event Orders'
        },
    ]
    return (
        <div className='CustomOrder'>
            <section className='CustomOrderHeader'>
                <div className='CustomOrderHeader__text'>
                    <h3 className='CustomOrderHeader__header'>Custom Event/Party Order</h3>
                    <p className='CustomOrderHeader__description'>Request a custom order for any event, party or gathering! We offer smaller, convenient individual packaging either 55 grams or 120 gram packaging with the option for custom label designs*</p>
                </div>
                <div className='CustomOrderHeader__selector'>
                    {
                        sections.map(section=>{
                            return(
                                <div className='CustomOrderHeader__selector-item'>
                                    <h4 className='CustomOrderHeader__selector-item--header'>{section.name}</h4>
                                    <p className='CustomOrderHeader__selector-item--info'>{section.info}</p>
                                    </div>
                            )
                        })
                    }
                </div>
            </section>
        </div>
    )
}
export default CustomOrder