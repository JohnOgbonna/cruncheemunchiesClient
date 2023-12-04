import './orders.scss';
import { useState, React } from 'react';
import CustomOrderDetails from './customOrder_subsections/customOrder_details';
import CustomOrderSelection from './customOrder_subsections/customOrderSelection';
import { useParams, useNavigate } from 'react-router-dom'
import { isEqualString } from '../../public/exports/functions';

function CustomOrder() {
    const params = useParams()
    const navigate = useNavigate()
    const [section, changeSection] = useState(
        params.subsection && (params.subsection === 'details' || params.subsection === 'order') ? params.subsection
            :
            localStorage.getItem('customOrderSection') ?
                JSON.parse(localStorage.getItem('customOrderSection')) :
                'details'
    )

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
    const conditions = [
        '* Custom label designs subject to an extra cost',
        '** We design and print labels profesionally with images provided by customers. Contact us (403-616-2325) for more information'
    ]
    return (
        <div className='CustomOrder'>
            <section className='CustomOrderHeader'>
                <div className='CustomOrderHeader__text'>
                    <h3 className='CustomOrderHeader__header'>Custom Event/Party Order</h3>
                    <p className='CustomOrderHeader__description'>Request a custom order for any event, party or gathering! We offer smaller, convenient individual packaging of either 60 or 150 grams with the option for custom label designs*</p>
                </div>
                <div className='CustomOrderHeader__selector'>
                    {
                        sections.map(sectionObj => {
                            return (
                                <div className={isEqualString(sectionObj.section, section) ? 'CustomOrderHeader__selector-itemSelected':
                                'CustomOrderHeader__selector-item'
                                }
                                    onClick={() => {
                                        changeSection(sectionObj.section)
                                        localStorage.setItem('customOrderSection', JSON.stringify(sectionObj.section))
                                        navigate(`/order/event/${sectionObj.section}`)
                                    }}
                                >
                                    <h4 className='CustomOrderHeader__selector-item--header'>{sectionObj.name}</h4>
                                    <p className='CustomOrderHeader__selector-item--info'>{sectionObj.info}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </section>
            {
                section !== 'order' ?
                    <CustomOrderDetails />
                    :
                    <CustomOrderSelection />
            }
            <section className='CustomOrderFooter'>
                <h3 className='CustomOrderFooter__header'>Crunchee Munchies</h3>
                <div className='CustomOrderFooter__conditions'>
                    <h4 className='CustomOrderFooter__conditions-header'>Conditions</h4>
                    {
                        conditions.map(condition => {
                            return (
                                <div className='CustomOrderFooter__conditions-list'>
                                    <h4 className='CustomOrderFooter__conditions-list--item'>{condition}</h4>
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