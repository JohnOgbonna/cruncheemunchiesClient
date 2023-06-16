import standardPackaging from "../../public/exports/image_exports";
import { useState } from "react";
import "./orders.scss"


function StandardOrder(props) {
    return (
        <div className='StandardOrder'>
            <section className='StandardOrderHeader'>
                <h3 className='StandardOrderHeader__header'>Standard Order</h3>
            </section>
            <section className="StandardOrder__cardContainer">
                {
                    standardPackaging.map(packaging => {
                        return (
                            <div className='StandardOrder__card'>
                                <img className='StandardOrder__card-image' src={packaging.image} alt={packaging.name} />
                                <div className='StandardOrder__card-text'>
                                    <p className='StandardOrder__card-text--description'>{packaging.description}</p>
                                    <h3 className='StandardOrder__card-text--cost'>{`$${packaging.cost}.00`}</h3>
                                </div>
                                <form className='StandardOrder__card-quantity'>
                                    <label className='StandardOrder__card-quantity--label'>Quantity</label>
                                    <input className='StandardOrder__card-quantity--input'
                                        type='number'
                                        max='200'
                                        min='0'
                                        defaultValue='0'
                                    />
                                    <button
                                        className='StandardOrder__card-quantity--button'
                                        type='submit'>
                                        Add to order
                                    </button>
                                </form>
                            </div>
                        )
                    })
                }
                <h4 className='StandardOrder__message'>{'*Call (403-616-2325) for smaller and larger bulk orders'}</h4>

            </section>
        </div>
    )
}
export default StandardOrder