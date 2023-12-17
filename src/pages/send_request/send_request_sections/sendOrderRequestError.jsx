import { contactFields, addressFields } from '../../../public/exports/contactFields'
import { messengerFields } from '../../../public/exports/messengerFields'

function SendOrderRequestError(props) {

    const isContactMessage = props.type === 'contactUs' ? true : false;

    function errorField(field) {
        if (props.type !== 'contactUs') {
            if (contactFields[field] && contactFields[field].name)
                return contactFields[field].name
            else if (addressFields[field] && addressFields[field].name)
                return addressFields[field].name
            else return ''
        }
        else if (messengerFields[field] && messengerFields[field].name) {
            return messengerFields[field].name
        }

    }

    if (!isContactMessage) {
        return (
            <div className='SendOrderRequestError'>
                <div className='SendOrderRequestErrorWrapper'>
                    {
                        props.list.map(err => {
                            return (
                                <p className='SendOrderRequestError__notice'>{`*${errorField(err)} is required!`}</p>
                            )
                        })
                    }
                </div>
            </div >
        )
    }
    else {
        return (
            <div className='ContactUsError'>
                <div className='ContactUsErrorWrapper'>
                    {
                        props.list.map(err => {
                            return (
                                <p className='ContactUsError__notice'>{`*${errorField(err)} is required!`}</p>
                            )
                        })
                    }
                </div>
            </div >
        )
    }
}

export default SendOrderRequestError