import { useState, React } from "react";
import sageMeadows from '../../public/images/stores/sage-meadows.jpeg'
import africanChoice from '../../public/images/stores/african choice.jpeg';
import gimsap from '../../public/images/stores/gimsap.png';
import mamaK from '../../public/images/stores/mama k.png';
import './whereToBuy.scss'
import { icons } from "../../public/exports/icons";


function WhereTobuy(props) {
    let [displayStore, changeDisplayStore] = useState({})
    const stores = [
        {
            name: 'Sage Meadows Market African Store',
            description: '2971 136 Ave NW Unit # 290, Calgary, AB T3P 1N7',
            website: 'http://www.sagemeadowsmarketafricanstore.com/',
            image: sageMeadows,
            embededMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2501.387874373555!2d-114.1331673!3d51.1750736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x537167e3cf4c1e09%3A0xb9441f4294334ce4!2sSage%20Meadows%20Market%20African%20Store!5e0!3m2!1sen!2sca!4v1680123635733!5m2!1sen!2sca"
        },
        {
            name: "Mama K's Afro Caribbean Market",
            description: '4133 4 St NW, Calgary, AB T2K 1A3',
            website: "",
            image: mamaK,
            embededMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2508.9140397415445!2d-113.95873468373541!3d51.03620835286472!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x53716611f5160ca3%3A0x3ab8223f392cde99!2sGimsap%20African%20Asian%20Market!5e0!3m2!1sen!2sca!4v1680124804371!5m2!1sen!2sca"
        },
        {
            name: 'Gimsap African Asian Market',
            description: '1829 54 St SE Unit 107, Calgary, AB T2B 1N5',
            website: "",
            image: gimsap,
            embededMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d230.47303874124825!2d-114.12902881522521!3d51.17695090883617!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x53716611f5160ca3%3A0x3ab8223f392cde99!2sGimsap%20African%20Asian%20Market!5e0!3m2!1sen!2sca!4v1680124996364!5m2!1sen!2sca"
        },
        {
            name: 'African Choice Market',
            description: '3604 52 Ave NW #112, Calgary, AB T2L 1V9',
            website: "https://africanchoicemarket.com/",
            image: africanChoice,
            embededMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2505.372523511929!2d-114.14038364805467!3d51.101586679470174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x53716f47434008f3%3A0x8912f0f1c78be8!2sAfrican%20Choice%20Market!5e0!3m2!1sen!2sca!4v1680125155622!5m2!1sen!2sca"
        },

    ]

    return (
        <div className="whereToBuy">
            <h2 className="whereToBuyHeader">Where to Buy</h2>
            <p className="whereToBuyDescriptor">Ask for Crunchee Munchies at these Calgary Locations!</p>
            <p className="whereToBuyDescriptor">Select to show on map!</p>
            <div className="mapCardContainer">
                {
                    stores.map((store) => {
                        return (
                            <div className="mapCard" onClick={() => {
                                changeDisplayStore(store)
                            }}>
                                <img className="mapCard__image" src={store.image} />
                                <div className="mapCard__text">
                                    <h3 className="mapCard__text-header">{store.name}</h3>
                                    <p className="mapCard__text-description">{`Address: ${store.description}`}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {displayStore.embededMap ?
                <div className="mapFrameWrapper"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) changeDisplayStore({})
                    }
                    }>
                    <img className="mapFrameIcon" src={icons.close}
                        onClick={(e) => {
                            changeDisplayStore({})
                        }} />
                    <iframe className="mapFrame" src={displayStore.embededMap || ""} width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
                : null}
        </div>
    )
}

export default WhereTobuy