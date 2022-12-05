function NavBar(props) {

    const sections = [
        {
            name: 'About Us',
            links: [
                {
                    name: 'Calgarys best chin-chin',

                },
                {
                    name: 'Hand-Crafted to Perfection',

                },
                {
                    name: 'Making waves',

                },
            ]
        },
        {
            name: 'Where to buy',
            links: [
                {
                    name: 'Store 1',

                },
                {
                    name: 'Store 2',

                },
            ]
        },
        {
            name: 'Request Order/ Contact',
            links: [
                {
                    name: 'Request Order',

                },
                {
                    name: 'Contact',

                },
            ]
        },
        {
            name: 'Follow Us',
            links: [
                {
                    name: 'Instagram',

                },
                {
                    name: 'TikTok',

                },
            ]
        },
    ]

    return (
        <div className='NavBarMobile'>
            <div className='NavBar__MobileContainer'>

            </div>

        </div>

    )

}
export default NavBar