

export const existingCartItem = ({
    prevCartItems,
    nextCartItem
})=>{
    return prevCartItems.find(
        cartItem => cartItem.documentId === nextCartItem.documentId
    )
}

export const handleAddToCart=({
    prevCartItems,
    nextCartItem
})=>{
const quantityIncrement = 1;
const cartItemExists = existingCartItem({prevCartItems,nextCartItem});

if(cartItemExists){
 return prevCartItems.map(cartItem =>
    cartItem.documentId === nextCartItem.documentId
    ?{
        ...cartItem,
        quantity:cartItem.quantity + quantityIncrement
    }: cartItem
 )
}

return [
    ...prevCartItems,
    {
        ...nextCartItem,
        quantity:quantityIncrement
    }
];

}