import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useCountdown from '../../public/exports/useCountdown'
import './pageNotFound.scss'

export default function PageNotFound() {
    const navigate = useNavigate()
    const { secondsLeft, start } = useCountdown();
    useEffect(() => {
        let countdownInitiated = false
       
        if(secondsLeft) countdownInitiated = true
        else start(5)
        if (secondsLeft <= 1 && countdownInitiated){
            console.log('yes!')
            navigate('/')
        }
    },[secondsLeft, navigate, start],[])

    return (
        <div className='PageNotFound'>
            <h1 className='PageNotFound__header'>Crunchee Munchies</h1>
            <div className='PageNotFound__text'>
                <h2 className='PageNotFound__text-notice'>Page not found</h2>
                {secondsLeft > 0 ?
                    <p className='PageNotFound__text-redirect'>{`Redirecting in ${secondsLeft-1}...`}</p>
                    : null
                }
            </div>
        </div>
    )
}