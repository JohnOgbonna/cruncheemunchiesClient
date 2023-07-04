export const contactFields = {
    firstName: {
        id: 'firstName',
        name: 'First Name',
        type: 'input',
        inputType: 'text',
        mandatory: true,
        tag: 'text',
    },
    lastName: {
        id: 'lastName',
        name: 'Last Name',
        type: 'input',
        inputType: 'text',
        mandatory: true,
        tag: 'text',
    },
    email: {
        id: 'email',
        name: 'Email Address',
        type: 'input',
        inputType: 'email',
        mandatory: true,
        tag: 'text',
    },
    phone: {
        id: 'phone',
        name: 'Phone Number',
        type: 'input',
        inputType: 'tel',
        mandatory: true,
        tag: 'text',
    },
    needsDelivery: {
        id: 'needsDelivery',
        name: 'Do you require delivery? (delivery charge will apply) Pickup in Northwest Calgary at no extra charge',
        type: 'input',
        inputType: 'checkbox',
        mandatory: true,
        tag: 'checkbox',
    },
    message: {
        id: 'message',
        name: 'Send a message to us, include any notes or questions/concerns',
        type: 'textArea',
        inputType: 'editor',
        mandatory: false,
        tag: 'textArea',
    },
}

export const addressFields= {
    address: {
        id: 'address',
        name: 'Street Address',
        type: 'input',
        inputType: 'text',
        mandatory: true,
        tag: 'text',
    },
    postalCode: {
        id: 'postalCode',
        name: 'Postal / Zip Code',
        type: 'input',
        inputType: 'text',
        mandatory: true,
        tag: 'text',
    },
    city: {
        id: 'city',
        name: 'City',
        type: 'input',
        inputType: 'text',
        mandatory: true,
        tag: 'text',
    }

}