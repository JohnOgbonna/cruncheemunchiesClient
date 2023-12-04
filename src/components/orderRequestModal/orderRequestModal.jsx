import { icons } from "../../public/exports/icons"
import './orderRequestModal.scss'
import { useEffect } from "react"
export default function OrderRequestModal(props) {
    const modalTimeout = () => setTimeout(props.removeModal, 10000);
    
    useEffect(() => {
       if(props.message && props.message != '') {
        clearTimeout(modalTimeout)
        modalTimeout()
    }
       else clearTimeout(modalTimeout)

        return (() => {
            clearTimeout(modalTimeout)
        })
    }, [props.message])
    return (
        <div className={`OrderRequestModal${props.message && props.message != '' ? '' : 'Hidden'}`}>
            <div className='OrderRequestModal__line1'>
                <img className='OrderRequestModal__line1-icon' src={icons.closeBrown}
                    onClick={() => {
                        props.removeModal()
                    }
                    } />
            </div>
            <p className='OrderRequestModal__message'>{props.message}</p>
        </div>
    )
}