import chinChin1 from '../images/chin-chin/homepage/chin-chin1.png'
import chinChin2 from '../images/chin-chin/homepage/chin-chin2.png'
import chinChin750 from '../images/chin-chin/homepage/chin-chin750g.png'
import buns1 from '../images/chin-chin/homepage/buns1.png'
import buns2 from '../images/chin-chin/homepage/buns2.png'


export const hompageSections = {
    overview: {
        id: 'overview',
        name: 'African Snacks and Pastries',
        description: "The Best Chin-Chin, Puff-Puff and Fried Buns You've Ever Had",
        images: {
            1: {
                name: 'chin-chin750g',
                image: chinChin750,
                description: 'Specially packaged Chin-Chin for your events or your personal enjoyment'
            },
            2: {
                name: 'buns1',
                description: 'Specialty Buns, only from Crunchee-Munchies',
                image: buns1
            }
        },
        noOrderButton: true,
        

    },
    chinChin:
    {
        id: 'chin-chin',
        name: 'Chin-Chin',
        link: '/order/request-order',
        description: "The best Chin-Chin in the world! Right here, in Calgary! You've had Chin-Chin, but have you had Crunchee munchies? Rave reviews from virtually all customers! Order today!",
        images: {
            1: {
                name: 'chin-chin750g',
                description: 'Specially packaged Chin-Chin for your events or your personal enjoyment',
                image: chinChin750
            },
            2: {
                name: 'chin-chin1',
                description: 'Different sizes available!',
                image: chinChin1
            },
            3: {
                name: 'chin-chin2',
                description: 'Find our product at select African Stores in Calgary',
                image: chinChin2
            },
        }
    },
    buns: {
        id: 'buns',
        name: 'Buns',
        description: "African Buns! Order individually or for catering. Online ordering coming soon!",
        images: {
            2: {
                name: 'buns1',
                description: 'Specialty African Buns',
                image: buns1
            },
            3: {
                name: 'buns2',
                description: 'Prepared specially to order!',
                image: buns2
            },
        }
    },
    puffPuff: {
        id: 'puff-puff',
        name: 'Puff-Puff',
        description: "Traditonal African Fried treat! Order individually or for catering. Online ordering coming soon!"
    }

}
export const imageLoop = [1,2,3,4,5]