export let formatCash = (number) => {
    return number.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    })
}