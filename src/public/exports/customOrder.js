import custom_label1 from '../../public/images/chin-chin/custom_label1.jpg'
import custom_label2 from '../../public/images/chin-chin/custom_label2.jpg'
import custom60g_label from '../../public/images/chin-chin/custom60g_label.png'
import custom150g_label from '../../public/images/chin-chin/custom150g_label.png'
import custom60g from '../../public/images/chin-chin/custom60g.png'
import custom150g from '../../public/images/chin-chin/custom150g.png'


const customOrder = {
    sizes: [
        {
            name: '60g',
            caption: 'Custom 60g Packaging with option for label on the front or back **',
            cost: 4,
            image: custom60g
        },
        {
            name: '150g',
            caption: 'Custom 150g Packaging with option for label on the front or back **',
            cost: 6,
            image: custom150g
        },
    ],
    labeledSizes: [
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
            image: custom60g_label
        },
    ]
}
export default customOrder