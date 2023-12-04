export let formatCash = (number) => {
    return number.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    })
}
export function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}
export function isEqualString(strA, strB){
    return(strA === strB)
}