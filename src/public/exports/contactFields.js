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
    message: {
        id: 'message',
        name: 'Notes (include any  questions/concerns)',
        type: 'textarea',
        inputType: 'editor',
        mandatory: false,
        tag: 'textArea',
    },
    needsDelivery: {
        id: 'needsDelivery',
        name: 'Do you require delivery? (delivery charge will apply at up to $35 within Calgary) Pickup in Northwest Calgary at no extra charge. For orders outisde Calgary, you will be resposible for courier shipping fees',
        type: 'input',
        inputType: 'checkbox',
        mandatory: false,
        tag: 'checkbox',
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