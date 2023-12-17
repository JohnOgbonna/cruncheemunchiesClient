import { logos } from "../../public/exports/icons"
import { useNavigate } from "react-router-dom"
import './footer.scss'
export default function Footer() {
    const navigate = useNavigate()
    return (
        <div className="footer">
            <section className='footer__header'>
                <h2 className='footer__header-title'
                    onClick={() => navigate('/')}>Crunchee Munchies</h2>
            </section>
            <section className='footer__contact'>
                <p className='footer__contact-message'
                    onClick={() => {
                        navigate('/contact-us#messenger')
                    }}
                >Click here to send us a Message </p>
                <div className='footer__contact-icons'>
                    {
                        Object.keys(logos).map(logo => {
                            return (
                                <a className='footer__contact-link'
                                    href={logos[logo].link} target='blank'
                                >
                                    <img className='footer__contact-icon'
                                        src={logos[logo].image}
                                        alt={logo}
                                    />
                                </a>
                            )
                        })
                    }
                </div>
            </section>
        </div>
    )
}