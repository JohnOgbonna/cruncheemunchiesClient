export const messengerFields = {
    name: {
        id: 'name',
        name: 'Name',
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
        mandatory: false,
        tag: 'text',
    },
    message: {
        id: 'message',
        name: 'Message',
        type: 'textarea',
        inputType: 'editor',
        mandatory: true,
        tag: 'textArea',
    },
}