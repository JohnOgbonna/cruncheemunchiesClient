import custom_label1 from '../../public/images/chin-chin/custom_label1.jpg'
import custom_label2 from '../../public/images/chin-chin/custom_label2.jpg'
import custom_label3 from '../../public/images/chin-chin/custom_label3.jpg'
import custom60g_label from '../../public/images/chin-chin/custom60g_label.png'
import custom150g_label from '../../public/images/chin-chin/custom150g_label.png'
import custom60g from '../../public/images/chin-chin/custom60g.png'
import custom150g from '../../public/images/chin-chin/custom150g.png'


const customOrder = {
    sizes: [
        {
            name: '60g',
            caption: 'Custom 60g Packaging with option for custom label **',
            cost: 4,
            image: custom60g,
            defaultValue: '0',
            maxValue: '800',
            discount100:{
                amount: 0.5,
                threshhold: 100
            }
        },
        {
            name: '150g',
            caption: 'Custom 150g Packaging with option for custom label**',
            cost: 6,
            image: custom150g,
            defaultValue: '0',
            maxValue: '560',
            discount100: {
                amount: 1,
                threshhold: 100
            }
        },
    ],
    labeledSizes: [
        {
            name: 'custom_label3',
            caption: 'Customized packaging',
            image: custom_label3,
            displayWide: true
        },
        {
            name: '60g_labeled',
            caption: 'Custom labeled packaging (60g)',
            cost: 4,
            image: custom60g_label
        },
        {
            name: '150g_labeled',
            caption: 'Custom labeled packaging (150g)',
            cost: 6,
            image: custom150g_label
        },
    ],
    customLabels:[
        {
            name: 'custom_label1',
            caption: 'Example of a custom designed label',
            image: custom_label1
        },
        {
            name: 'custom_label2',
            caption: 'Example of a custom designed label',
            image: custom_label2
        },
        
    ]
    
}
export default customOrder